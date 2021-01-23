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

Example:

```javascript
import * as React from 'react';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon';
import { createResource } from '../utils';

function PokemonInfo({ pokemonResource }) {
  const pokemon = pokemonResource.read();
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName));
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');
  const [pokemonResource, setPokemonResource] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null);
      return;
    }
    setPokemonResource(createPokemonResource(pokemonName));
  }, [pokemonName]);

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  );
}

export default App;
```

## useTransition

Before the moment when React render the fallback component from suspense there is a brief period that our app will appear to be unresponsive and to avoid that we could use the **useTransition** hook.

```javascript
const SUSPENSE_CONFIG = { timeoutMs: 4000 };

function Component() {
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG);
  // etc...

  function handleClick() {
    // do something that triggers some interim state change we want to
    // happen before suspending starts
    startTransition(() => {
      // do something that triggers a suspending component to render
    });
  }

  // if needed, you can use the `isPending` boolean to display a loading spinner
  // or similar
}
```

## Cache Resources

> State that comes from the server is basically a cache of state. It's not UI
> state. How long that cache sticks around is totally up to you. Right now, our
> cache only hangs around until we select a new resource, but we could persist it
> in memory somewhere and retrieve it later if needed.

```javascript
const promiseCache = {};
function MySuspendingComponent({ value }) {
  let resource = promiseCache[value];
  if (!resource) {
    resource = doAsyncThing(value);
    promiseCache[value] = resource; // <-- this is very important
  }
  return <div>{resource.read()}</div>;
}
```

## Suspense Image

> Loading images is tricky business because you're handing the asynchronous state
> over to the browser. It manages the loading, error, and success states for you.
> But what if you have an experience that doesn't look any good until the image is
> actually loaded? Or what if you want to render a fallback in the image's place
> while it's loading (you want to provide your own loading UI)? In that case,
> you're kinda out of luck, because the browser gives us no such API.

```javascript
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => resolve(src);
  });
}
```

> That function will resolve to the source you gave it as soon as the image has
> loaded. Once that promise resolves, you know that the browser has it in its
> cache and any `<img />` elements you render with the `src` set to that `src`
> value will get instantly rendered with the image straight from the browser
> cache.

## Coordinate Suspending components with SuspenseList

> When your app is simple, you can pretty much expect everything to be there and
> load together when you need them, and that works nicely. But when your app grows
> and you start code splitting and loading data alongside the code that needs it,
> pretty soon you end up in situations where you have several things loading all
> at once. Having those all pop into place on the page can be a jarring experience
> for the user.

> A better experience for the user is a more predictable loading experience, even
> if it means that they see the data displayed out of order from how it was
> loaded.

> Coordinating these loading states is a really hard problem, but thanks to
> Suspense and `<React.SuspenseList />`, it's fairly trivial.

[Example from React official](https://reactjs.org/docs/concurrent-mode-reference.html#suspenselist)

```jsx
<React.SuspenseList revealOrder="forwards">
  <React.Suspense fallback="Loading...">
    <ProfilePicture id={1} />
  </React.Suspense>
  <React.Suspense fallback="Loading...">
    <ProfilePicture id={2} />
  </React.Suspense>
  <React.Suspense fallback="Loading...">
    <ProfilePicture id={3} />
  </React.Suspense>
</React.SuspenseList>
```

The `SuspenseList` component has the following props:

- `revealOrder`: the order in which the suspending components are to render
  - `{undefined}`: the default behavior: everything pops in when it's loaded (as
    if you didn't wrap everything in a `SuspenseList`).
  - `"forwards"`: Only show the component when all components before it have
    finished suspending.
  - `"backwards"`: Only show the component when all the components after it have
    finished suspending.
  - `"together"`: Don't show any of the components until they've all finished
    loading
- `tail`: determines how to show the fallbacks for the suspending components
  - `{undefined}`: the default behavior: show all fallbacks
  - `"collapsed"`: Only show the fallback for the component that should be
    rendered next (this will differ based on the `revealOrder` specified).
  - `"hidden"`: Opposite of the default behavior: show none of the fallbacks
- `children`: other react elements which render `<React.Suspense />` components.
  Note: `<React.Suspense />` components do not have to be direct children as in
  the example above. You can wrap them in `<div />`s or other components if you
  need.
