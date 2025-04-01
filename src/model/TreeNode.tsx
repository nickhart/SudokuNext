import assert from 'assert';

export class TreeNode<T> {
  value: T;
  children: TreeNode<T | undefined>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  addChild(child: TreeNode<T>) {
    this.children.push(child);
  }

  pruneChildAtIndex(index: number) {
    assert(index >= 0 && index < this.children.length);
    if (index >= 0 && index < this.children.length) {
      assert(this.children[index] !== undefined);
      this.children[index] = undefined;
      return true;
    }
    return false;
  }
}

export class Tree<T> {
  root: TreeNode<T> | undefined = undefined;

  constructor(rootValue?: T) {
    if (rootValue !== undefined) {
      this.root = new TreeNode(rootValue);
    }
  }

  // do we need this?
  addRoot(value: T) {
    assert(this.root === undefined);
    if (this.root === undefined) {
      this.root = new TreeNode(value);
      return true;
    }
    return false;
  }
}
