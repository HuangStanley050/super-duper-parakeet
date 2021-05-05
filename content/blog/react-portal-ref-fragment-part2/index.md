---
title: React Portal, Fragment and Refs (Part 2)
date: '2021-04-30'
---

![portal2](./portal2.jpeg)

Here is a dirty quick fix for the "div soup" issue:

Say if we create a component like:

```javascript
export const Wrapper = props => {
  return props.children;
};
```

Else where in the code base:

```javascript
import { Wrapper } from '../somehwere';

const NoMoreDivSoup = () => {
  return (
    <Wrapper>
      <div>stuff</div>
    </Wrapper>
  );
};
```

### React Fragment

So with react it actually have something like the above Wrapper already and we can use it like:

```javascript
return (
  <React.Fragment>
    <h1>Hey</h1>
    <p>I am a paragraph</p>
  </React.Fragment>
);
```

or:

```javascript
return (
  <>
    <h1>Hey</h1>
    <p>I am another paragraph</p>
  </>
);
```
