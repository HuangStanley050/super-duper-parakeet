---
title: React testing
date: '2020-11-05'
---

![testing](./testing.jpg)

Testing is without a doubt one of the most important things that we can do to ensure our app behaves the way that is intended. When it comes to React, we have many options, what I used to do before the super popular React Testing Library is using Enzyme. This blog post will focus mainly on React Testing Library.

**Straight from the react website**

The two ways to go about testing the app

> Rendering component trees in a simplified test environment and asserting on their output.

> Running a complete app in a realistic browser environment (also known as “end-to-end” tests).

## Simple Test with ReactDOM

Testing the components in react is a trade off between writing a test that's reasonable vs how the software is actually used.

**principle**

1. Interaction from user like clicking the buttons.

2. The developers using the code.

**Steps**

- Create a DOM node

- Add it to the body

- Render the component to that DOM node.

- Clean up the DOM for the next test

Example Code:

```javascript
import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const myDivComponent = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(myDivComponent);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, myDivComponent);
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrement, increment] = myDivComponent.querySelectorAll('button');
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = myDivComponent.firstChild.querySelector('div');
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe(`Current count: 0`);
  // 🐨 click the increment button (💰 increment.click())
  increment.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe(`Current count: 1`);
  // 🐨 click the decrement button (💰 decrement.click())
  decrement.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe(`Current count: 0`);
  myDivComponent.remove();
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
});
```

## Simple Test with React Testing Library

Things like creating DOM nodes and appending to the body of the div works but it can be accomplished by using the React Testing Library as it already provides an abstraction for that.

Example:

```javascript
import { render, fireEvent, screen } from '@testing-library/react';

test('it works', () => {
  const { container } = render(<Example />);
  // container is the div that your component has been mounted onto.

  const input = container.querySelector('input');
  fireEvent.mouseEnter(input); // fires a mouseEnter event on the input

  screen.debug(); // logs the current state of the DOM (with syntax highlighting!)
});
```

## Avoid Implementation details

What this means is that doesn't matter how the code is implemented, the test should always remain consistent and the end result should be what's expected.

Example of code using different implementation details:

```javascript
multiply(4, 5); // 20
```

> The `multiply` function can be implemented in basically infinite ways. Here are two examples:

```javascript
const multiply = (a, b) => a * b;
```

vs

```javascript
function multiply(a, b) {
  let total = 0;
  for (let i = 0; i < b; i++) {
    total += a;
  }
  return total;
}
```

## Form testing

## Mock HTTP response

## Mock browser api and modules

## Context and custom render method

## Testing custom hooks
