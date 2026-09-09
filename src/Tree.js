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
    this.root = this.#insert(value, this.root);
  }

  #insert(value, base) {
    if (this.includes(value)) return base;
    if (base === null) return new Node(value);
    if (value < base.data) base.left = this.#insert(value, base.left);
    else if (value > base.data) base.right = this.#insert(value, base.right);
    return base;
  }

  deleteItem(value) {
    this.root = this.#deleteItem(value, this.root);
  }

  #deleteItem(value, node) {
    if (node === null) return null;
    if (value < node.data) {
      node.left = this.#deleteItem(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = this.#deleteItem(value, node.right);
      return node;
    } else {
      // Found the node to delete

      // Case 1: No child
      if (!node.left && !node.right) return null;
      // Case 2: One child
      else if (!node.left) return node.right;
      else if (!node.right) return node.left;
      // Case 3: Two children
      else {
        let succ = this.#findMin(node.right);
        node.data = succ.data;
        node.right = this.#deleteItem(succ.data, node.right);
        return node;
      }
    }
  }

  #findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  #levelOrder(root = this.root) {
    if (root === null) return [];

    // Create an empty queue for level order traversal
    const q = [];
    const res = [];

    // Enqueue root
    q.push(root);
    let currLvl = 0;

    while (q.length > 0) {
      let len = q.length;
      res.push([]); // Creates a new array for each level of the tree

      for (let i = 0; i < len; i++) {
        // Add front of queue and remove it from queue
        let node = q.shift();
        res[currLvl].push(node.data); // The index of the tree level. currLvl is of number type

        // Enqueue left child
        if (node.left) q.push(node.left);

        // Enqueue right child
        if (node.right) q.push(node.right);
      }

      currLvl++;
    }

    return res;
  }

  levelOrderForEach(callback = null) {
    if (!callback) throw new Error("callback function is null");

    const res = this.#levelOrder();

    res.forEach((element) => {
      callback(element);
    });
  }

  #inOrder(node, res) {
    if (node === null) return;

    // Traverse the left subtree first
    this.#inOrder(node.left, res);

    // Visit the current node
    res.push(node.data);

    // Traverse the right subtree last
    this.#inOrder(node.right, res);
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided");

    const res = [];

    this.#inOrder(this.root, res);

    res.forEach(callback);
  }

  #preOrder(node, res) {
    if (!node) return;

    // visit the current node first
    res.push(node.data);

    // traverse the left subtree
    this.#preOrder(node.left, res);

    // traverse the right subtree
    this.#preOrder(node.right, res);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided");

    const res = [];

    this.#preOrder(this.root, res);

    res.forEach(callback);
  }

  #postOrder(node, res) {
    if (node === null) return;

    // first traverse left subtree
    this.#postOrder(node.left, res);

    // after visiting left, traverse right subtree
    this.#postOrder(node.right, res);

    // now we visit node
    res.push(node.data);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("No callback provided");

    const res = [];
    this.#postOrder(this.root, res);

    res.forEach(callback);
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
