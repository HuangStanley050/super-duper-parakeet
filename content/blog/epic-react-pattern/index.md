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

## Compound Components

## Flexibile Compound components

## Prop collections and getters

## State Reducers

## Control Props
