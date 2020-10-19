---
title: Epic react hook review
date: '2020-10-11'
---

![intro](./intro.jpg)

This part is what I really want to look into beside the fundamental section of the Epic React course, as we shift from the class components to the functional components, things change but they don't change much in the fundamental aspect.

It's pretty cool how in the past functional components are considered the dumb components as they can't hold state and are generally used for display only. With the introduction of the newer version of React, we do cool things like **componentDidUpdate**, **componentDidMount** effortlessly with hooks.

### useState

The first kind of special hook that makes the react functional component behaving like a class component.

This function returns a value of values and we use the latest ES6 syntax to destructure and use them.

```javascript
const [yourState, setYourState] = React.useState('');
```

Another cool thing that we can do is very similar to what we used to do with this.setState() in the class component, we can pass in a function to the setter that changes value for useState() like:

```javascript
const [counter, setCounter] = React.useState(0);
setCounter((c) => c + 1);
```

instead of:

```javascript
setCounter(c + 1);
```

### useEffect

It's a function which takes a function and an array as parameters.

The function which it takes allows you to do side-effect and run logic which controls the side effects, which could include updating the state or an ajax call.

The 2nd parameter is an array which will take variables of dependencies that will trigger the react to re render.

**side note**

In the function which you run the side effects if you return another function that's considered as **componentWillUnMount** in the old react way.

```javascript
useEffect(() => {}, []);
```

### useContext

The idea of using a context is to avoid prop drilling and sharing state between components. Before this api became widely available, redux was the main solution to this problem.

Quote Kent C Dodds:

> To avoid this pain, we can insert some state into a section of our react tree, and then extract that state anywhere within that react tree without having to explicitly pass it everywhere. This feature is called context. In some ways it's like global variables, but it doesn't suffer from the same problems (and maintainability nightmares) of global variables thanks to how the API works to make the relationships explicit.

Here is how one can use it:

```javascript
const FooContext = React.createContext()

cont FooContextProvider = ({children}) => {
  //....blah blah
  //const value = {}
  //const value = []

  return <FooContext.Provider value={value}>
  {children}
  </FooContext.Provider>

}

function FooDisplay() {
  const foo = React.useContext(FooContext)
  return <div>Foo is: {foo}</div>
}

function App = () => {
  return <FooContextProvider>
    <FooDisplay/>
  </FooContextProvider>
}

```

### useRef

The usual case with useRef hook is that sometimes we need to interact directly with the DOM element like if say we use a third party library like D3.

In order to get access to a particular node in the DOM, we need to get React to give us access.

**Example**

```javascript
function MyDiv() {
  const myDivRef = React.useRef();
  React.useEffect(() => {
    const myDiv = myDivRef.current;
    // myDiv is the div DOM node!
    console.log(myDiv);
  }, []);
  return <div ref={myDivRef}>hi</div>;
}
```

> After the component has been rendered, it's considered "mounted." That's when the React.useEffect callback is called and so by that point, the ref should have its current property set to the DOM node. So often you'll do direct DOM
> interactions/manipulations in the useEffect callback.

### useReducer

This hook is basically a more advanced version of useState, you can incorporate logic and is very similar to the concept that's used in Redux's reducer.

> That said, sometimes you want to separate the state logic from the components that make the state changes. In addition, if you have multiple elements of state that typically change together, then having an object that contains those elements of state can be quite helpful.

> This is where `useReducer` comes in really handy. If you're familiar with redux, then you'll feel pretty comfortable here. If not, then you have less to unlearn

```javascript
function nameReducer(previousName, action) {
  return action;
}

const initialNameValue = 'Joe';

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer, initialNameValue);
  const handleChange = (event) => setName(event.target.value);
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  );
}
```

I personally prefer the old way of redux, so to use like Redux, we could do:

```javascript
const [state, dispatch] = React.useReducer(countReducer, {
  count: initialCount,
});
const { count } = state;
const increment = () => dispatch({ type: 'INCREMENT', step });
```
