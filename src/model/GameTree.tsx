import { Tree, TreeNode } from './TreeNode';
import { GameState } from './GameState';

// need some kind of interface for the GameState?

export class GameTreeNode extends TreeNode<GameState> {
  enumerateChoices() {
    // this is where we need game-specific knowledge
    return [];
  }

  expand() {
    const choices = this.enumerateChoices();
    for (const choice of choices) {
      const child = new GameTreeNode(this.value);
      // Apply the choice to transform the child's state
      child.value = [...this.value];  // Create a copy of the current state
      // TODO: Apply the choice to modify child.value
      this.addChild(child);
    }
  }
}

export class GameTree extends Tree<GameState> {}
