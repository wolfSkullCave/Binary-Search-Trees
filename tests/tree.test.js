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
});
