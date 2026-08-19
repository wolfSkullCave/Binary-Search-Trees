import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./Tree.js";

let testArr = [1, 0, 8, 3, 6, 1];

const testTree = new Tree(testArr);

// console.log(prettyPrint(testTree.root));
// console.log(testTree)

testTree.insert(9);
testTree.insert(2);
testTree.insert(1);

testTree.deleteItem(1);

console.log(prettyPrint(testTree.root));
