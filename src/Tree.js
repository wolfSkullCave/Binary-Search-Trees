import { prettyPrint } from "./prettyPrint.js";

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }
}

function buildTree(array) {
  // validate array
  let arr = array;
  arr = sortArray(arr);
  arr = removeDupes(arr);

  let length = arr.length;
  if (length === 0) return null;

  let mid = Math.floor(length / 2);
  const node = new Node(arr[mid]);

  node.left = buildTree(arr.slice(0, mid));
  node.right = buildTree(arr.slice(mid + 1));

  return node;
}

function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

function removeDupes(arr) {
  return [...new Set(arr)];
}

export { Tree };
