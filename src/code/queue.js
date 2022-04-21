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

function testCaseOne() {}

const QueueTestString = `
push(5);
push(2);
push(3);
push(4);
let lst = [];
lst.push(pop());
lst.push(pop());
lst.push(pop());
lst.push(pop());
return lst;
`;

export const QueueTest = function (codeStr) {
  let testFunction = new Function(codeStr + QueueTestString);
  console.log(testFunction());
  return true;
};
