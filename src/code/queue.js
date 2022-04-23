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

testCases.push(`
  push(5);
  push(2);
  push(3);
  push(4);
  if (peek() != 5) return false;
  pop();
  if (peek() != 2) return false;
  pop();
  if (peek() != 3) return false;
  pop();
  if (peek() != 4) return false;
  pop();
  return true;
`);

const QueueOptimal = `/*
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

export const QueueTest = function (codeStr) {
  const testData = {
    testCases: [],
    runtimes: {
      expected: null, // <- run the built in optimal solution against the 'runtime' testcase
      actual: null,
    },
  };
  for (let testCase of testCases) {
    const testFunction = new Function(codeStr + testCase);
    let testCaseResult = null;
    try {
      testCaseResult = testFunction();
    } catch (e) {} // if exception, 'testCaseResult' will be null
    testData.testCases.push(testCaseResult);
  }
  return testData;
};
