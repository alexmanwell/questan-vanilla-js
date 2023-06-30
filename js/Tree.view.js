import {questions} from "../resources/db.js";
import {Stack} from "../util/Stack.js";

export default class TreeView {
  #questions;

  constructor(questions) {
    this.#questions = questions;
  }

  toHTML() {
    let list = "";
    let stack = new Stack([{node: this.#questions, depth: 0}]);
    let prevStepDepth = 0;
    while (!stack.isEmpty()) {
      let {node: node, depth: depth} = stack.pop();

      let diffDepth = prevStepDepth - depth;
      for (let i = 0; i < diffDepth; i++) {
        list += "</ul></li>"
      }

      if (!node.children) {
        list += `<li>${node.title}</li>`;
      }

      if (node.children) {
        list += `<li>${node.title}<ul>`;
        for (let childNode of node.children) {
          stack.push({node: childNode, depth: depth + 1});
        }
      }

      prevStepDepth = depth;
    }

    return "<ul>" + list + "</ul>";
  }
};

const tree = new TreeView(questions);
document.getElementById('root').innerHTML = tree.toHTML();