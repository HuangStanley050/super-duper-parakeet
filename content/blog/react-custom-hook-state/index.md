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

And if you were to make a custom hook:

```javascript
import { useState, useEffect } from 'react';

export const useCustomHook = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const requestData = () => {
    return new Promise(resolve => resolve('Data fetched'));
  };
  useEffect(async () => {
    setLoading(true);
    let result = await requestData();
    setLoading(false);
    setData(result);
  }, []);
  return {
    loading,
    data,
  };
};
```

And if the custom hooks are used in either of the components:

```javascript
import { useCustomHook } from './hooks';

const Example1 = () => {
  const { loading, data } = useCustomHook();
  return (
    <>
      <div>I am Example 1</div>
      <h1>Loading status: {loading}</h1>
    </>
  );
};

const Example2 = () => {
  const { loading, data } = useCustomHook();
  return (
    <>
      <div>I am Example 1</div>
      <h1>Loading status: {loading}</h1>
    </>
  );
};
```
