---
title: React Performance
date: '2020-12-05'
---

![performance](./peformance.jpg)

Performance you say? does it even matter considering that by nature React is quite fast? Regardless, there are still things we can do to optimize our react applications with the following principles.

### Code Splitting

It is a way to improve performance with the principle that by loading less code that our apps will speed up.

If we have an application that uses heavy D3 code and users complain about how slow the app loads at login, we could say load the chart generated by the D3 code on demand instead.

There already is a method available for us from javascript, which is called the **dynamic import**

```javascript
import('/some-module.js').then(
  (module) => {
    // do stuff with the module's exports
  },
  (error) => {
    // there was some error loading the module...
  }
);
```

In React, such feature is made possible by **<React.Suspense/>**

An example:

```javascript
// smiley-face.js
import * as React from 'react';

function SmileyFace() {
  return <div>😃</div>;
}

export default SmileyFace;

// app.js
import * as React from 'react';

const SmileyFace = React.lazy(() => import('./smiley-face'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>loading...</div>}>
        <SmileyFace />
      </React.Suspense>
    </div>
  );
}
```

### useMemo for Expensive Calculations

Since the introduction of react hooks, things have become quite easy especially with state management and logic all being all placed inside a functional component, which allows for awesome composability. This is equivalent to the render method in the react class component.

However with that, it comes with a cost.

In some sort of calculations function like below **render** will be performed every single time, regardless of whether the inputs for the calculations change.

Example:

```javascript
function Distance({ x, y }) {
  const distance = calculateDistance(x, y);
  return (
    <div>
      The distance between {x} and {y} is {distance}.
    </div>
  );
}
```

> If that component's parent re-renders, or if we add some unrelated state to the component and trigger a re-render, we'll be calling `calculateDistance` every render which could lead to a performance bottleneck.

**useMemo** can help with this particular use case:

```javascript
function Distance({ x, y }) {
  const distance = React.useMemo(() => calculateDistance(x, y), [x, y]);
  return (
    <div>
      The distance between {x} and {y} is {distance}.
    </div>
  );
}
```

> This allows us to put that calculation behind a function which is only called when the result actually needs to be re-evaluated (when the dependencies change). In the example above the array `[x, y]` are called "dependencies" and React knows that so long as those do not change, the result of our function will be the same as the last time the function was called.

### React.memo for Reducing re-renders

Summary of a react app life cycle:

```
→  render → reconciliation → commit
         ↖                   ↙
              state change
```

1. The "render" phase: create React elements React.createElement
2. The "reconciliation" phase: compare previous elements with the new ones
3. The "commit" phase: update the DOM (if needed).

**A React Component can re-render for any of the following reasons:**

1. Its props change
2. Its internal state changes
3. It is consuming context values which have changed
4. Its parent re-renders

> React is really fast, however, _sometimes_ it can be useful to give React little tips about certain parts of the React tree when there's a state update. You can opt-out of state updates for a part of the React tree by using one of React's built-in rendering bail-out utilities: `React.PureComponent`, `React.memo`, or `shouldComponentUpdate`.

Here is an example:

```javascript
function CountButton({ count, onClick }) {
  return <button onClick={onClick}>{count}</button>;
}

function NameInput({ name, onNameChange }) {
  return (
    <label>
      Name:{' '}
      <input value={name} onChange={(e) => onNameChange(e.target.value)} />
    </label>
  );
}

function Example() {
  const [name, setName] = React.useState('');
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <div>
        <CountButton count={count} onClick={increment} />
      </div>
      <div>
        <NameInput name={name} onNameChange={setName} />
      </div>
      {name ? <div>{`${name}'s favorite number is ${count}`}</div> : null}
    </div>
  );
}
```

> Based on how this is implemented, when you click on the counter button, the `<CountButton />` re-renders (so we can update the `count` value). But the `<NameInput />` is also re-rendered. If you have `Record why each component rendered while profiling.` enabled in React DevTools, then you'll see that under "Why did this render?" it says "The parent component rendered."

> React does this because it has no way of knowing whether the NameInput will need to return different React elements based on the state change of its parent. In our case there were no changes necessary, so React didn't bother updating the DOM. This is what's called an "unnecessary rerender" and if that render/reconciliation process is expensive, then it can be worthwhile to prevent it.

What we can provide React to stop the re render is one of two things from the API:

1. React.PureComponent: For class component

2. React.memo: For functional component

What they do is not they will prevent re render if its parent re-rendered thus improving performance if it's intended.

**Improving our example above**

```javascript
function CountButton({ count, onClick }) {
  return <button onClick={onClick}>{count}</button>;
}
CountButton = React.memo(CountButton);

function NameInput({ name, onNameChange }) {
  return (
    <label>
      Name:{' '}
      <input value={name} onChange={(e) => onNameChange(e.target.value)} />
    </label>
  );
}
NameInput = React.memo(NameInput);

// etc... no other changes necessary
```

> If you try that out, then you'll notice the `<NameInput />` no longer re-renders when you click on the counter button, saving React the work of having to call the `NameInput` function and compare the previous react elements with the new ones.

> Again, I want to mention that people can make the mistake of wrapping _everything_ in `React.memo` which can actually slow down your app in some cases and in all cases it makes your code more complex. So it's much better to use it more intentionally and further, there are other things you can do to reduce the amount of unnecessary re-renders throughout your application.

### Window Large Lists with react-virtual

We learn that React is really fast at updating the DOM but imagine what happens when you need to update tens of thousands elements, it could be a problem.

Some examples of when we run into problems of huge updates:

1. Data visualisation

2. Grids

3. Tables

4. List of LOTS of data

> But here's the trick. Often you don't need to actually display tens of thousands
> of list items, table cells, or data points to users. So if that content isn't
> displayed, then you can kinda cheat by doing some "lazy" just-in-time rendering.

> So let's say you had a grid of data that rendered 100 columns and had 5000 rows.
> Do you really need to render all 500000 cells for the user all at once? They
> certainly won't see or be able to interact with all of that information at once.
> You'll only display a "window" of 10 columns by 20 rows (so 200 cells for
> example), and the rest you can delay rendering until the user starts scrolling
> around the grid.

Problem like above can be solved with a concept "windowing", many libraries exist in the react ecosystem.

We are looking at using `react-virtual`. Here's an example of how you would adapt a list to use `react-virtual`'s `useVirtual` hook:

```javascript
// before
function MyListOfData({ items }) {
  return (
    <ul style={{ height: 300 }}>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

```javascript
// after
function MyListOfData({ items }) {
  const listRef = React.useRef();
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  return (
    <ul ref={listRef} style={{ display: 'relative', height: 300 }}>
      <li style={{ height: rowVirtualizer.totalSize }} />
      {rowVirtualizer.virtualItems.map(({ index, size, start }) => {
        const item = items[index];
        return (
          <li
            key={item.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: size,
              transform: `translateY(${start}px)`,
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}
```

> In summary, rather than iterating over all the items in your list, you simply
> tell `useVirtual` how many rows are in your list, give it a callback that it can
> use to determine what size they each should be, and then it will give you back
> `virtualItems` and a `totalSize` which you can then use to only render the
> items the user should be able to see within the window.

### Optimize Context Value

Context will re render if the provided values changed and that in term will triggers a re-render of all the consuming components **(which will re-render whether or not they're memoized)**.

So take this for example:

```jsx
const CountContext = React.createContext();

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
}
```

> Every time the `<CountProvider />` is re-rendered, the `value` is brand new, so
> even though the `count` value itself may stay the same, all component consumers
> will be re-rendered.

> The quick and easy solution to this problem is to memoize the value that you
> provide to the context provider:

```javascript
const CountContext = React.createContext();

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = React.useMemo(() => [count, setCount], [count]);
  return <CountContext.Provider value={value} {...props} />;
}
```

### Fix Perf Death by a Thousand Cuts

In a real world scenario typically with an app you would need some state management. It's very common that we will run into issues by so many components get updated when state changes and it causes performance bottleneck.

> Sometimes performance problems are because a single component is doing something
> it shouldn't (running too much code on an interaction). Those are typically
> easier to deal with because you can quickly identify the problem and determine a
> good solution.

> Perf death by a thousand cuts on the other hand doesn't give you an obvious
> place to fix the performance problem because none of the components are slow in
> isolation, the problem comes when lots of components need to run when there's a
> state update.

> So how do we fix this performance problem? Remember that every perf problem is
> solved by less code. In this case, the perf problem is coming from running too
> much code. Often you have components responding to a state change that don't
> need to. Often we memoize these with `React.memo`, and we could do that to all
> the components in our app, but there are two problems with this:

1. It increases the complexity of our app (because we have to start using
   `useCallback` and `useMemo` for literally everything to take advantage of
   that, meaning you have a bunch of dependency arrays to manage).
2. React's still doing a bunch of work to check whether these components should
   be re-rendered.

So how do we fix this? What if we just put less of our state in the global
store? This is called colocation and it's a really great way to both improve
performance and maintenance of our app at the same time.

Example:

**before**

```javascript
function sleep(time) {
  const done = Date.now() + time;
  while (done > Date.now()) {
    // sleep...
  }
}
// imagine that this slow component is actually slow because it's rendering a
// lot of data (for example).
function SlowComponent({ time, onChange }) {
  sleep(time);
  return (
    <div>
      Wow, that was{' '}
      <input
        value={time}
        type="number"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      ms slow
    </div>
  );
}
function DogName({ time, dog, onChange }) {
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={(e) => onChange(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : 'enter a dog name'}</p>
    </div>
  );
}
function App() {
  // this is "global state"
  const [dog, setDog] = React.useState('');
  const [time, setTime] = React.useState(200);
  return (
    <div>
      <DogName time={time} dog={dog} onChange={setDog} />
      <SlowComponent time={time} onChange={setTime} />
    </div>
  );
}
```

**after**

```javascript
function DogName({ time }) {
  const [dog, setDog] = React.useState('');
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={(e) => setDog(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : 'enter a dog name'}</p>
    </div>
  );
}
function App() {
  // this is "global state"
  const [time, setTime] = React.useState(200);
  return (
    <div>
      <DogName time={time} />
      <SlowComponent time={time} onChange={setTime} />
    </div>
  );
}
```

### Production Performance Monitoring

> We should always ship fast experiences to our users, but sometimes something
> slips through our PR review process and our users start having a slow
> experience. Unless they complain to us, we have no way of knowing that things
> are going so slow for them. User complaints is not a great policy for quality
> control.

> Because we can't make every user install the React DevTools and profile the app
> for us as they interact with it, it would be nice if we could somehow track some
> of the render times and get that information sent to our servers for us to
> monitor.

React team has created an API for this purpose. It's not quite react dev tools but it doesn capture useful information from users.

A basic example to show usage:

Here's a basic usage example:

```javascript
<React.Profiler />
```

```javascript
<App>
  <Profiler id="Navigation" onRender={onRenderCallback}>
    <Navigation {...props} />
  </Profiler>
  <Main {...props} />
</App>
```

```javascript
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

**It's important to note** that unless you build your app using
`react-dom/profiling` and `scheduler/tracing-profiling` this component won't do
anything.
