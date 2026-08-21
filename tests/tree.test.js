import { Tree } from "../src/Tree.js";

describe("Tree", () => {
  test("builds a balanced BST from an unsorted array", () => {
    const testTree = new Tree([1, 2, 4, 3, 5]);

    expect(testTree.root).toBeDefined();
    expect(testTree.root.data).toBe(3);
    expect(testTree.root.left.data).toBe(2);
    expect(testTree.root.left.left.data).toBe(1);
    expect(testTree.root.right.data).toBe(5);
    expect(testTree.root.right.left.data).toBe(4);
  });

  test("removes duplicates from the array", () => {
    const testTree = new Tree([1, 2, 4, 3, 5, 3, 3, 1]);

    expect(testTree.root.data).toBe(3);
    expect(testTree.root.left.data).toBe(2);
    expect(testTree.root.left.left.data).toBe(1);
    expect(testTree.root.right.data).toBe(5);
    expect(testTree.root.right.left.data).toBe(4);
  });

  test("returns null for empty array", () => {
    const testTree = new Tree([]);
    expect(testTree.root).toBeNull();
  });

  test("builds single node tree", () => {
    const testTree = new Tree([5]);
    expect(testTree.root.data).toBe(5);
    expect(testTree.root.left).toBeNull();
    expect(testTree.root.right).toBeNull();
  });
});

describe("includes", () => {
  test("returns true for root node", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    expect(testTree.includes(3)).toBe(true);
  });

  test("returns true for leaf node", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    expect(testTree.includes(1)).toBe(true);
    expect(testTree.includes(5)).toBe(true);
  });

  test("returns true for internal node", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    expect(testTree.includes(2)).toBe(true);
    expect(testTree.includes(4)).toBe(true);
  });

  test("returns false for nonexistent value", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    expect(testTree.includes(6)).toBe(false);
    expect(testTree.includes(0)).toBe(false);
  });

  test("returns false on empty tree", () => {
    const testTree = new Tree([]);
    expect(testTree.includes(1)).toBe(false);
  });
});

describe("insert", () => {
  test("inserts value to the right", () => {
    const testTree = new Tree([1, 2, 3]);
    testTree.insert(4);
    expect(testTree.root.right.right.data).toBe(4);
  });

  test("inserts value to the left", () => {
    const testTree = new Tree([3, 4, 5]);
    testTree.insert(2);
    expect(testTree.root.left.left.data).toBe(2);
  });

  test("inserts into empty tree", () => {
    const testTree = new Tree([]);
    testTree.insert(5);
    expect(testTree.root.data).toBe(5);
  });

  test("inserts into single node tree", () => {
    const testTree = new Tree([5]);
    testTree.insert(3);
    expect(testTree.root.left.data).toBe(3);
  });

  test("does not insert duplicate value", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    const before = JSON.stringify(testTree.root);
    testTree.insert(3);
    expect(JSON.stringify(testTree.root)).toBe(before);
    expect(testTree.includes(3)).toBe(true);
    expect(testTree.includes(1)).toBe(true);
    expect(testTree.includes(5)).toBe(true);
  });

  test("inserts multiple values sequentially", () => {
    const testTree = new Tree([5]);
    testTree.insert(3);
    testTree.insert(7);
    testTree.insert(1);
    testTree.insert(4);
    expect(testTree.root.data).toBe(5);
    expect(testTree.root.left.data).toBe(3);
    expect(testTree.root.right.data).toBe(7);
    expect(testTree.root.left.left.data).toBe(1);
    expect(testTree.root.left.right.data).toBe(4);
  });
});

describe("deleteItem", () => {
  test("deletes a leaf node", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    testTree.deleteItem(1);
    expect(testTree.includes(1)).toBe(false);
    expect(testTree.includes(2)).toBe(true);
    expect(testTree.includes(3)).toBe(true);
    expect(testTree.includes(4)).toBe(true);
    expect(testTree.includes(5)).toBe(true);
    expect(testTree.root.left.left).toBeNull();
  });

  test("deletes node with only a left child", () => {
    const testTree = new Tree([5]);
    testTree.insert(3);
    testTree.insert(1);
    testTree.deleteItem(3);
    expect(testTree.includes(3)).toBe(false);
    expect(testTree.includes(1)).toBe(true);
    expect(testTree.root.left.data).toBe(1);
  });

  test("deletes node with only a right child", () => {
    const testTree = new Tree([5]);
    testTree.insert(8);
    testTree.insert(10);
    testTree.deleteItem(8);
    expect(testTree.includes(8)).toBe(false);
    expect(testTree.includes(10)).toBe(true);
    expect(testTree.root.right.data).toBe(10);
  });

  test("deletes node with two children", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    testTree.deleteItem(2);
    expect(testTree.includes(2)).toBe(false);
    expect(testTree.includes(1)).toBe(true);
    expect(testTree.root.left.data).toBe(1);
  });

  test("deletes root with two children using successor", () => {
    // tree: 3(2(1,-), 5(4,-))
    const testTree = new Tree([1, 2, 3, 4, 5]);
    testTree.deleteItem(3);
    expect(testTree.includes(3)).toBe(false);
    for (const value of [1, 2, 4, 5]) {
      expect(testTree.includes(value)).toBe(true);
    }
    expect(testTree.root.data).toBe(4);
    expect(testTree.root.right.data).toBe(5);
    expect(testTree.root.right.left).toBeNull();
  });

  test("two children where successor is the right child itself", () => {
    // tree: 4(3(2,-), 5(-,8))
    const testTree = new Tree([2, 3, 4, 5, 8]);
    testTree.deleteItem(4);
    expect(testTree.includes(4)).toBe(false);
    for (const value of [2, 3, 5, 8]) {
      expect(testTree.includes(value)).toBe(true);
    }
    expect(testTree.root.data).toBe(5);
    expect(testTree.root.right.data).toBe(8);
    expect(testTree.root.right.left).toBeNull();
  });

  test("deletes root of single node tree", () => {
    const testTree = new Tree([5]);
    testTree.deleteItem(5);
    expect(testTree.root).toBeNull();
    expect(testTree.includes(5)).toBe(false);
  });

  test("deletes root with one child", () => {
    const testTree = new Tree([3, 5]); // root 5, left 3
    testTree.deleteItem(5);
    expect(testTree.root.data).toBe(3);
    expect(testTree.includes(5)).toBe(false);
    expect(testTree.includes(3)).toBe(true);
  });

  test("does nothing for nonexistent value", () => {
    const testTree = new Tree([1, 2, 3, 4, 5]);
    const before = JSON.stringify(testTree.root);
    testTree.deleteItem(99);
    testTree.deleteItem(-1);
    expect(JSON.stringify(testTree.root)).toBe(before);
    expect(testTree.includes(99)).toBe(false);
  });

  test("does nothing on empty tree", () => {
    const testTree = new Tree([]);
    expect(() => testTree.deleteItem(1)).not.toThrow();
    expect(testTree.root).toBeNull();
  });
});
