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

  includes(value, base = this.root) {
    // search the tree for value and return true if the value is found
    if (base === null) return false;
    if (value === base.data) return true;
    if (value < base.data) return this.includes(value, base.left);
    return this.includes(value, base.right);
  }

  insert(value) {
    this.root = this._insert(value, this.root);
  }

  _insert(value, base) {
    if (base === null) return new Node(value);
    if (value < base.data) base.left = this._insert(value, base.left);
    else if (value > base.data) base.right = this._insert(value, base.right);
    return base;
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
