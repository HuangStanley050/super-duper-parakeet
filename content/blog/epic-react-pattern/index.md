---
title: Useful React patterns
date: '2020-10-22'
---

![elizabeth](./elizabeth.jpg)

Some useful patterns that we can employ to use in our applications

## Context Module Functions

The idea is to use a context provider and do the usual stuff with useReducer hook return a dispatch function along with the the state like:

```javascript
const CounterContext = React.createContext();

function CounterProvider({ step = 1, initialCount = 0, ...props }) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const change = action.step ?? step;
      switch (action.type) {
        case 'increment': {
          return { ...state, count: state.count + change };
        }
        case 'decrement': {
          return { ...state, count: state.count - change };
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
      }
    },
    { count: initialCount }
  );

  const value = [state, dispatch];

  return <CounterContext.Provider value={value} {...props} />;
}
```

And in the component that uses the context, we create a helper function that pass in the dispatch as an argument like:

```javascript
const increment = (dispatch) => dispatch({ type: 'increment' });
const decrement = (dispatch) => dispatch({ type: 'decrement' });

import { useCounter, increment, decrement } from 'context/counter';

function Counter() {
  const [state, dispatch] = useCounter();
  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatch)}>+</button>
    </div>
  );
}
```

## Compound Components

They are components which work together with another couples to form a complete UI like:

```javascript
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

Below is a typical "inflexible" way to implement:

```javascript
<CustomSelect
  options={[
    { value: '1', display: 'Option 1' },
    { value: '2', display: 'Option 2' },
  ]}
/>
```

The way to accomplish this is:

**React.cloneElement**:

```javascript
function Foo({ children }) {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      id: `i-am-child-${index}`,
    });
  });
}

function Bar() {
  return (
    <Foo>
      <div>I will have id "i-am-child-0"</div>
      <div>I will have id "i-am-child-1"</div>
      <div>I will have id "i-am-child-2"</div>
    </Foo>
  );
}
```

## Flexible Compound components

The previous method using React.cloneElement might not be a flexible option hence, we have another pattern which we can use.

> Right now our component can only clone and pass props to immediate children. So we need some way for our compound components to implicitly accept the states regardless of where they’re rendered within the Parent component.

> The way we do this is through context. React.createContext is the API we want.

An example:

```javascript
import React from 'react';
import { Switch } from '../switch';

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

// const ToggleProvider = ({children}) => {
//   return <ToggleContext.Provider>{children}</ToggleContext.Provider>
// }

function Toggle({ onToggle, children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const value = { on, toggle };
  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = useContext(ToggleContext)`
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
const useToggle = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

function ToggleOn({ children }) {
  const { on } = useToggle();
  return on ? children : null;
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({ children }) {
  const { on } = useToggle();
  return on ? null : children;
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  );
}
```

## Prop collections and getters

So when do you use this?

Whenever you want to handle the rendering responsibility to the user that's using your component.

It’s function that will return with props as parameters and the user will need to hook up those props and return the right JSX. You can also use this pattern when your components are being used in many places.

## State Reducers

## Control Props
