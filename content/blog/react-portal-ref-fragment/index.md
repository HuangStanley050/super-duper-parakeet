---
title: React Portal, Fragment and Refs
date: '2021-04-28'
---

![portal](./portal.jpg)

Before we dive into more about Portal, Fragment and Refs, there is a refresher about JSX to for a bit of review.

### JSX Limitation

**You can't return more than one root JSX element and you also can't store more than one root JSX element in a variable**

Example:

```javascript
return (
  <h1>Hello World</h1>
  <p>
  This is not allowed
  </p>
)
```

Once that get used by React, you would get something like:

```javascript
return (
  React.createElement('h1',{},"Hello World")
  React.createElement('p',{},"This is not allowed")
)
```

Because in Javascript you are only allowed to return one thing and this would apply to React as well.
