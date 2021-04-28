---
title: React Portal, Fragment and Refs (Part 1)
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

So usually, you would have it wrapped in a <div> or have a <CustomComponent/> to return the above:

```javascript
return (
  <div>
    <h1>Hello Wolrd</h1>
    <p>This is now allowed</p>
  </div>
);
```

Using the above usually work in most cases but some issues could rise from that. We could have something called the "div soup"

Unnecessary <div> will be rendered on the DOM even though they are just there to solve the wrapping problem. It is not unrealistic to see this in some of the bigger apps. With the unnecessary <div>, we lose the semantic meaning structure to our code.

Example:

```javascript
<div>
  <div>
    <div>
      <h1>Hello!</h1>
    </div>
  </div>
</div>
```

**Problems from above:**

1. It could break the styling

2. Meaningless semantic structure

3. Issues with E2E testing

4. Rendering too many HTML elements thus making the app slower
