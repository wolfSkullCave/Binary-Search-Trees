import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./Tree.js";

let testArr = [1, 0, 8, 3, 6, 1];

const testTree = new Tree(testArr);

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

function leftMostNode(node, res) {
  if (!node) return;
  leftMostNode(node.left, res);
  leftMostNode(node.right, res);
  res.push(node.data);
}

const res = [];
leftMostNode(testTree.root, res);
console.log(res);

testTree.postOrderForEach(test);
