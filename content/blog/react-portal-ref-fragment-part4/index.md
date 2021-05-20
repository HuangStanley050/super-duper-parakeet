---
title: React Portal Ref Fragment Part 4
date: '2021-05-14'
---

![waterfall](./waterfall.jpg)

So again, what is Ref? Is there something special about it? Do we need to use it? What is the ususal use case for React Ref?

Official explaination from React:

> Refs provide a way to access DOM nodes or React elements created in the render method.

> In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

A quick example:

```javascript

import React, { useRef } from 'react'

const ActionButton = ({ label, action }) => {
    const buttonRef = useRef(null)

    return (
      <button onClick={action} ref={buttonRef}>{label}</button>
    )
  }
}
```

**Area for usage:**

### Managing focus, text selection, or media playback.

### Triggering imperative animations.

### Integrating with third-party DOM libraries.
