export const QueueTemplate = `/*
* implement a queue.
*/

/*
* define global variables.
*/
let queue = undefined;

/*
* define functions.
*/
function push(item) {

}

function pop() {

}

function peek() {

}`;

const testCases = [];

testCases.push(`
  push(5);
  push(2);
  push(3);
  push(4);
  let lst = [];
  lst.push(pop());
  lst.push(pop());
  lst.push(pop());
  lst.push(pop());
  return lst[0] === 5 && lst[1] === 2 && lst[2] === 3 && lst[3] === 4;
`);

export const QueueTest = function (codeStr) {
  const testData = {
    testCases: [],
    runtimes: {
      worst: null,
      user: null,
      optimal: null,
    },
  };
  for (let testCase of testCases) {
    const testFunction = new Function(codeStr + testCase);
    let testCaseResult = null;
    try {
      testCaseResult = testFunction();
    } catch (e) {
      testCaseResult = `exception`;
    }
    testData.testCases.push(testCaseResult);
  }
  return testData;
};
