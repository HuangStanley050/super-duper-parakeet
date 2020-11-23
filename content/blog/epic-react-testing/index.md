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

Using this package called "MSW" for the mock server/interceptor

[MSW](https://mswjs.io/)

example:

```javascript
// __tests__/fetch.test.js
import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Fetch from '../fetch';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />);

  userEvent.click(screen.getByText('Load Greeting'));

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Fetch url="/greeting" />);

  userEvent.click(screen.getByText('Load Greeting'));

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
});
```

## Mock browser api and modules

The tests that are running are actually not being done in the real browser, instead the tests are run in something called the jsdom. [jsdom](https://github.com/jsdom/jsdom), It simulate the browser behaviour really well with the exception of window resizing and media query.

When it comes to testing, sometimes you don't want to test utility functions you write, where instead you could mock them like:

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// __tests__/some-test.js
import { add, subtract } from '../math';

jest.mock('../math');

// now all the function exports from the "math.js" module are jest mock functions
// so we can call .mockImplementation(...) on them
// and make assertions like .toHaveBeenCalledTimes(...)
```

Additionally, if you'd like to mock only _parts_ of a module, you can provide
your own "mock module getter" function:

```javascript
jest.mock('../math', () => {
  const actualMath = jest.requireActual('../math');
  return {
    ...actualMath,
    subtract: jest.fn(),
  };
});
```

example of a test mocking browser api:

```javascript
window.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: { latitude: 1, longitude: 2 },
  };

  const { promise, resolve, reject } = deferred();

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (callback) => {
      promise.then(() => callback(fakePosition));
    }
  );
  render(<Location />);

  expect(screen.getByLabelText('loading...')).toBeInTheDocument();

  await act(() => {
    resolve();
    return promise;
  });

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});
```

## Context and custom render method

## Testing custom hooks
