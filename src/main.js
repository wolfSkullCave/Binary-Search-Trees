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

// levelOrder testing
const res = testTree.levelOrder();

// for (const level of res) {
//   console.log(level.join(" "));
// }

// levelOrderForEach testing
testTree.levelOrderForEach((data) => {
  console.log(data);
});

let sum = 0;
testTree.levelOrderForEach((level) => {
  sum += level.reduce((acc, n) => acc + n, 0);
});
console.log("sum:", sum);
