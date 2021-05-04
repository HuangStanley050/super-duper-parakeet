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
