---
title: React Suspense
date: '2021-01-03'
---

![hunter](./hunterxhunter.jpeg)

## Concurrent Mode

Basic idea from Suspense through this code snippet:

```javascript
function Component() {
  if (data) {
    return <div>{data.message}</div>;
  }
  throw promise;
  // React will catch this, find the closest "Suspense" component
  // and "suspend" everything from there down from rendering until the
  // promise resolves.
  // 🚨 THIS "API" IS LIKELY TO CHANGE
}

ReactDOM.createRoot(rootEl).render(
  <React.Suspense fallback={<div>loading...</div>}>
    <Component />
  </React.Suspense>
);
```

> That's the idea. Where the `data` and `promise` values are coming from all
> depends on how you implement things.

> Imagine when your app loads, you need some data before you can show anything
> useful. Typically we want to put the data loading requirements right in the
> component that requires the data, via something like this:

```javascript
React.useEffect(() => {
  let current = true;
  setState({ status: 'pending' });
  doAsyncThing().then(
    (p) => {
      if (current) setState({ pokemon: p, status: 'success' });
    },
    (e) => {
      if (current) setState({ error: e, status: 'error' });
    }
  );
  return () => (current = false);
}, [pokemonName]);

// render stuff based on the state
```

However, for "bootstrap" type data, we can start that request before we even
render the app. The best approaches to using Suspense involve kicking off the
request for the data as soon as you have the information you need for the
request.

## Render as you fetch

> The idea here is: get the data **as soon as you have the information you need**
> for the data. This sounds obvious, but if you think about it, how often do you
> have a component that requests data once it's been mounted. There's a few
> milliseconds between the time you click "go" and the time that component is
> mounted... Unless that component's code is **lazy-loaded**. In which case,
> there's a lot more time involved (first load the code, then parse the code, then
> run the code, then render the component, and finally make the request) and your
> users are hanging around waiting while they could be making requests for the
> data they need.

> "Render as you fetch" is intended to fix this problem because you can make the
> request for the code and the data at the same time.

## useTransition

## Cache Resources

## Suspense Image

## Suspense with a custom hook

## Coordinate Suspending components with SuspenseList
