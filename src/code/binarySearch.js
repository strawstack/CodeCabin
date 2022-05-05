export const BinarySearchTemplate = `/*
* implement binary search.
*/

/*
* define functions.
*/
function search(sortedLst, targetElement) {
  
}`;

const testCases = [];

testCases.push(`
  let index = search([1,2,3,4,5], 3);
  return index === 2;
`);

testCases.push(`
  let index = search([0,2,5,9,50,51,72,80,91,100], 51);
  return index === 5;
`);

const binarySearchOptimal = `
function search(sortedLst, targetElement) {
  let lo = 0;
  let hi = sortedLst.length - 1;
  let mi = Math.floor((lo + hi) / 2);

  while (lo <= hi) {
      mi = Math.floor((lo + hi) / 2);

      if (sortedLst[mi] === targetElement) {
          break;

      } else if (sortedLst[mi] < targetElement) {
          lo = mi + 1;

      } else { // targetElement < sortedLst[mi]
          hi = mi - 1;

      }
  }

  return mi;
}`;

const runtimeTestcase = `
let lst = [];
const HALF_MILLION = 500000;
let value = 0;
for (let i = 0; i < HALF_MILLION; i++) {
    value += (Math.random() < 0.5) ? 1 : 3;
    lst.push(value);
}

count = 0;
let startTime = new Date().getTime();

while (count < HALF_MILLION) {

    search(lst, lst[250001]);

    count += 1;
}

let endTime = new Date().getTime();
return endTime - startTime;`;

function calculateMean(lst) {
  lst = lst.filter((x) => x !== null);
  let total = 0;
  for (let item of lst) {
    total += item;
  }
  return total / lst.length;
}

export const BinarySearchTest = function (codeStr) {
  const testData = {
    testCases: [],
    runtime: {
      expected: null, // <- run the built in optimal solution against the 'runtime' testcase
      actual: null,
    },
  };
  let testFunction = null;
  let testCaseResult = null;
  for (let testCase of testCases) {
    testFunction = new Function(codeStr + testCase);
    testCaseResult = null;
    try {
      testCaseResult = testFunction();
    } catch (e) {} // if exception, 'testCaseResult' will be null
    testData.testCases.push(testCaseResult);
  }

  let optTestCaseResultLst = [];
  for (let i = 0; i < 10; i++) {
    testFunction = new Function(binarySearchOptimal + runtimeTestcase);
    testCaseResult = null;
    try {
      testCaseResult = testFunction();
    } catch (e) {}
    optTestCaseResultLst.push(testCaseResult);
  }

  testData.runtime.expected = calculateMean(optTestCaseResultLst);

  let userTestCaseResultLst = [];
  for (let i = 0; i < 10; i++) {
    testFunction = new Function(codeStr + runtimeTestcase);
    testCaseResult = null;
    try {
      testCaseResult = testFunction();
    } catch (e) {}
    userTestCaseResultLst.push(testCaseResult);
  }

  testData.runtime.actual = calculateMean(userTestCaseResultLst);

  return testData;
};
