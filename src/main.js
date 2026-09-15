import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./Tree.js";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandArr() {
  const arr = [];

  for (let i = 0; i < 6; i++) {
    arr.push(getRandomInt(1, 100));
  }

  return arr;
}

function printTreeTraversal() {
  console.log("Level order:", testTree.levelOrder());
  console.log("In order:   ", testTree.inOrder());
  console.log("Pre order:  ", testTree.preOrder());
  console.log("Post order: ", testTree.postOrder());
}

// 1. Create a binary search tree from an array of random numbers with each element having a value less than 100. You can create a function that returns an array of random numbers every time you call it if you wish.
const testTree = new Tree(getRandArr());
console.log("Created a new binary search tree from random values:");
prettyPrint(testTree.root);

// 2. Confirm that the tree is balanced by calling isBalanced().
console.log("\nIs the tree balanced?", testTree.isBalanced());

// 3. Print out all elements in level, pre, post, and in order.
console.log("\n--- Tree traversals ---");
printTreeTraversal();

// 4. Unbalance the tree by adding several numbers whose value is more than 100.
const extraValues = Array.from({ length: 5 }, () => getRandomInt(100, 200));
console.log("\nAdding values > 100 to unbalance the tree:", extraValues.join(", "));
extraValues.forEach((value) => testTree.insert(value));

// 5. Confirm that the tree is unbalanced by calling isBalanced().
prettyPrint(testTree.root);
console.log("Is the tree balanced?", testTree.isBalanced());

// 6. Balance the tree by calling rebalance().
console.log("\nRebalancing tree...");
testTree.rebalanced();

// 7. Confirm that the tree is balanced by calling isBalanced().
console.log("Is the tree balanced?", testTree.isBalanced());

// 8. Print out all elements in level, pre, post, and in order.
console.log("\n--- Tree traversals after rebalancing ---");
printTreeTraversal();
