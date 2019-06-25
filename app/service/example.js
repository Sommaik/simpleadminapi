class Example {
  constructor() {}
  helloWorldCallback(greeting) {
    greeting('Hello', 'World');
  }
}

module.exports = new Example();
