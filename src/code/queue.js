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

const queueOptimal = `
let frontPointer = null;
let backPointer = null;

function newNode(value, next=null) {
    return {
        value: value,
        next: next
    };
}

function push(item) {
    if (frontPointer === null) {
        frontPointer = newNode(item);
        backPointer = frontPointer;
    } else {
        backPointer.next = newNode(item);
        backPointer = backPointer.next;
    }
}

function pop() {
    if (frontPointer === null) {
        return null;
    }
    const node = frontPointer;
    frontPointer = frontPointer.next;
    if (frontPointer === null) { 
        backPointer = null;
    }
    return node.value;
}

function peek() {
    if (frontPointer !== null) {
        return frontPointer.value;
    }
    return null;
}`;

const runtimeTestcase = `
const LST_SIZE = 1000000;
let lst = [];
let count = 0;
while (count < LST_SIZE) {
    lst.push(Math.floor(Math.random() * 100000))
    count += 1;
}

count = 0;
let startTime = new Date().getTime();
while (count < LST_SIZE) {
    push(lst[count]);
    count += 1;
}

count = 0;
while (count < LST_SIZE) {
    if (pop() !== lst[count]) {
        return false;
    }
    count += 1;
}
let endTime = new Date().getTime();
return endTime - startTime;`;

export const QueueTest = function (codeStr) {
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

  testFunction = new Function(queueOptimal + runtimeTestcase);
  testCaseResult = null;
  try {
    testCaseResult = testFunction();
  } catch (e) {}
  testData.runtime.expected = testCaseResult;

  testFunction = new Function(codeStr + runtimeTestcase);
  testCaseResult = null;
  try {
    testCaseResult = testFunction();
  } catch (e) {}
  testData.runtime.actual = testCaseResult;

  return testData;
};
