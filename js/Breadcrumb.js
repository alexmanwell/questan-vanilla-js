import {Stack} from "../util/Stack.js";
import {questions} from "../resources/db.js";

export class Breadcrumb {
  #tree;
  #node;

  constructor(tree, node) {
    this.#tree = tree;
    this.#node = node;
  }

  buildPath() {
    let result = [];
    let stack = new Stack([{node: this.#tree, depth: 0}]);
    while (!stack.isEmpty()) {
      let {node: node, depth: depth} = stack.pop();
      result[depth] = node.title;

      if (node.title === this.#node.title) {
        break;
      }
      if (!node.children) {
        result.pop();
      }

      if (node.children) {
        for (let childNode of node.children) {
          stack.push({node: childNode, depth: depth + 1});
        }
      }
    }

    return result;
  }
}

const breadcrumb = new Breadcrumb(questions, {title: "Title 17"});
const div = document.createElement("div");
div.innerText = breadcrumb.buildPath().join(" > ");
document.getElementById('root').append(div);