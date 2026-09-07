import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./Tree.js";

let testArr = [1, 0, 8, 3, 6, 1];

const testTree = new Tree(testArr);

testTree.insert(9);
testTree.insert(2);
testTree.insert(1);

// console.log(prettyPrint(testTree.root));

// console.log("After deletion:");
testTree.deleteItem(0);
testTree.deleteItem(1);
// console.log(prettyPrint(testTree.root));

// levelOrderForEach testing
// testTree.levelOrderForEach((data) => {
//   console.log(data);
// });

// let sum = 0;
// testTree.levelOrderForEach((level) => {
//   sum += level.reduce((acc, n) => acc + n, 0);
// });
// console.log("sum:", sum);

// test in order traversal
const res2 = [];
testTree.inOrderForEach((data) => res2.push(data));
console.log("inorder traversal:", res2.join(" "));
prettyPrint(testTree.root);

function printItem(item) {
  console.log(item);
}

function doubleNumber(num) {
  console.log(num * 2);
}

function showPos(item, index) {
  console.log(`${index}: ${item}`);
}

function checkNumber(number) {
  if (number % 2 === 0) console.log(`${number} is even`);
  else console.log(`${number} is odd`);
}

function test(item, index, array) {
  console.log("Item:", item);
  console.log("Index:", index);
  console.log("Array:", array);
}

console.log("--- print items ---");
testTree.inOrderForEach(printItem);
console.log("--- double items ---");
testTree.inOrderForEach(doubleNumber);
console.log("--- show items positions ---");
testTree.inOrderForEach(showPos);
console.log("--- check number ---");
testTree.inOrderForEach(checkNumber);
console.log("--- test ---");
testTree.inOrderForEach(test);
// testTree.inOrderForEach();

// preorder for each testing
console.log("pre order print:");
testTree.preOrderForEach(printItem);
