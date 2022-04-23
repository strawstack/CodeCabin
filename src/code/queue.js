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

function listsEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

const runtimeTestcase = `
let lst = [];
let count = 0;
while (count < 1000000) {
    lst.push(Math.floor(Math.random() * 100000))
    count += 1;
}

count = 0;
while (count < 1000000) {
    push(lst[i]);
    count += 1;
}

count = 0;
let ansLst = [];
while (count < 1000000) {
    if (pop() !== lst[count]) {
      return false;
    }
    return true;
}`;

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
