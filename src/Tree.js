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
    if (this.includes(value)) return base;
    if (base === null) return new Node(value);
    if (value < base.data) base.left = this._insert(value, base.left);
    else if (value > base.data) base.right = this._insert(value, base.right);
    return base;
  }

  _getSuccessor(curr) {
    let node = curr.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(value) {
    this.root = this._deleteItem(value);
  }

  _deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (root.data > value) {
      root.left = this._deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this._deleteItem(value, root.right);
    } else {
      // Node with 0 or 1 child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Node with 2 children
      const succ = this._getSuccessor(root);
      root.data = succ.data;
      root.right = this._deleteItem(succ.data, root.right);
    }
    return root;
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
