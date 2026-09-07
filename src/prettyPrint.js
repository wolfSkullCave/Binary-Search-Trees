// Renders a binary search tree to the console using Unicode box-drawing characters.
//
// Usage:
//   import { prettyPrint } from "./prettyPrint.js";
//   prettyPrint(tree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

export { prettyPrint };
