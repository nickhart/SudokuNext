import { Tree, TreeNode } from "./TreeNode";
import { GameState } from "./GameState";

// need some kind of interface for the GameState?

class GameTreeNode extends TreeNode<GameState> {
  enumerateChoices() {
    // this is where we need game-specific knowledge
    return [];
  }

  expand() {
    for (let choice in this.enumerateChoices()) {
      let child = new GameTreeNode(this.value);
      // transform the child with the choice
      this.addChild(child);
    }
  }
}

class GameTree extends Tree<GameState> {}
