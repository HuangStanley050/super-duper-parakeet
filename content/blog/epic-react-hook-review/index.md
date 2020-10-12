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

### useContext

### useRef

### useReducer
