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

example:

```javascript
import React from 'react';
import { Switch } from '../switch';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const togglerProps = {
    'aria-pressed': on,
    onClick: toggle,
  };
  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  return { on, togglerProps };
}

function App() {
  const { on, togglerProps } = useToggle();
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;
```

## State Reducers

Some background, most of the reusable components would need to handle different context and with that it would need to be able to handle different cases. What we could do is that add that piece of logic in our components to handle the cases. But in reality that there could be a never ending list of logical customization that people could want out of our reusable components.

This **state reducer** pattern would help us to cope with the situation mentioned above

Example:

```javascript
import React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach((fn) => fn?.(...args));

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case 'toggle': {
      return { on: !state.on };
    }
    case 'reset': {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
  // provided as an option
  // ... and that's it! Don't forget to check the 💯 extra credit!
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: 'toggle' });
  const reset = () => dispatch({ type: 'reset', initialState });

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0);
  const clickedTooMuch = timesClicked >= 4;

  function toggleStateReducer(state, action) {
    switch (action.type) {
      case 'toggle': {
        if (clickedTooMuch) {
          return { on: state.on };
        }
        return { on: !state.on };
      }
      case 'reset': {
        return { on: false };
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`);
      }
    }
  }

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: toggleStateReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked((count) => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

## Control Props

The concept comes when people want to manage the internal state of our components from the outside.

> The state reducer allows them to manage what state changes are made when a state change happens, but sometimes people may want to make state changes themselves. We can allow them to do this with a feature called "Control Props."
