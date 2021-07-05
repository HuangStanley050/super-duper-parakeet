---
title: React custom hook states
date: '2021-07-04'
---

![third](./lupin3rd.jpg)

## React hooks with its own state from custom hooks

Just recenlty I learned something pretty cool about the states from custom react hooks. The react components aka hooks that uses those custom hooks keep its own state so they are not shared. It's best to use an example.

You have here two components for instance:

```javascript
const Example1 = () => {
  return <div>I am Example 1</div>;
};

const Example2 = () => {
  return <div>I am Example 1</div>;
};
```
