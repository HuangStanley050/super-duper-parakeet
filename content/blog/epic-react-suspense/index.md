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

## Simple Data fetching

## Render as you fetch

## useTransition

## Cache Resources

## Suspense Image

## Suspense with a custom hook

## Coordinate Suspending components with SuspenseList
