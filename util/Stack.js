export class Stack {
  #stack = [];

  constructor(stack) {
    this.#stack = stack;
  }

  push(element) {
    this.#stack.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }
    return this.#stack.pop();
  }

  isEmpty() {
    return !this.#stack.length;
  }
}