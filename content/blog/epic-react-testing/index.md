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
  const myDivComponent = document.createElement('div');
  document.body.append(myDivComponent);
  ReactDOM.render(<Counter />, myDivComponent);
  const [decrement, increment] = myDivComponent.querySelectorAll('button');

  const message = myDivComponent.firstChild.querySelector('div');
  expect(message.textContent).toBe(`Current count: 0`);
  increment.click();
  expect(message.textContent).toBe(`Current count: 1`);
  decrement.click();
  expect(message.textContent).toBe(`Current count: 0`);
  myDivComponent.remove();
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

**Here, using an example with React code:**

This what we want to test,

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

Here is one way to get the button:

```javascript
const { container } = render(<Counter />);
container.firstChild; // <-- that's the button
```

But it will fail if we wrap the button inside a <span/> like:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <span>
      <button onClick={increment}>{count}</button>
    </span>
  );
}
```

A better way be to use the "screen" along with "render" provided by React Testing Libary like:

```javascript
render(<Counter />);
screen.getByText('0'); // <-- that's the button
// or (even better) you can do this:
screen.getByRole('button', { name: '0' }); // <-- that's the button
```

## Form testing

It is very import to get this right as form is a part where users spend most of the time interacting with the application. Something like "login" or "checkout" are crucial to the success of our web applications, therefore we need to have good testing to give us confidence.

Things we need to make sure that we do well:

1. User can find inputs in the form

2. They can fill in the information

3. The fields get validated

4. When they submit, the form data is correct

example:

```javascript
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/login';

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData;
  const handleSubmit = (data) => {
    submittedData = data;
  };
  render(<Login onSubmit={handleSubmit} />);
  const username = 'Adam';
  const password = 'Sandler';
  const userName = screen.getByLabelText('Username');
  const passWord = screen.getByLabelText('Password');
  userEvent.type(userName, username);
  userEvent.type(passWord, password);
  userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(submittedData).toEqual({
    username,
    password,
  });
});
```

## Mock HTTP response

How our application interact with the backend determines how well users will get out of using our applications. And again we have to make sure we get maximum confidence with our tests for http request that interact with our react components.

The approach we are using is something called the interceptor,

> To handle these fetch requests, we're going to start up a "server" which is not actually a server, but simply a request interceptor. This makes it really easy to get things setup (because we don't have to worry about finding an available port for the server to listen to and making sure we're making requests to the right port) and it also allows us to mock requests made to other domains.

## Mock browser api and modules

## Context and custom render method

## Testing custom hooks
