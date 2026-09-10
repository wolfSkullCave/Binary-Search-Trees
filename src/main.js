import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./Tree.js";

let testArr = [1, 0, 8, 3, 6, 1];

const testTree = new Tree(testArr);

prettyPrint(testTree.root);
