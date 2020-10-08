---
title: Epic React Fundamental
date: '2020-10-07'
---

![study](./study.jpg)

So I was under the impression that I might not get much out of this section but boy was I wrong. After going through this section, I managed to pick up many useful things and thing that I genuinely didn't know about React. After using React for awhile I can appreciate learning the nitty gritty aspect of it which I am hoping to get myself close to getting better at it.

## Basic React api

There are two sets of instances which are responsible for doing different things for any react applications.

**React** : It is responsible for creating React element like the basic api provided by JS

```javascript
document.createElement();
```

**ReactDOM** : It is responsible for rendering React elements to the DOM like:

```javascript
rootElement.append();
```

### Example like

```javascript
const rootElement = document.getElementById('root');
const props = { id: 'yourId', children: 'Hello world' };
const elementType = 'h1';
const reactElement = React.createElement(elementType, props);
ReactDOM.render(reactElement, rootElement);
```

## Embedding react/babel directly in your index.html

What you can do is make sure you download the minimized react code in your script tag and also include the babel library as well in the script tag.

In the script tag where you write your react codes make sure you do <script type="text/babel">your code</script>

Example:

```html
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>

  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"></script>

  <script type="text/babel">
    // 🐨 on the script tag above, change `type="module"`
    // to `type="text/babel"` so babel will compile this code for the browser to run.

    // 🐨 re-implement this using JSX!
    const element = React.createElement('div', {
      className: 'container',
      children: 'Hello World',
    });

    // 💰 there are a few subtle differences between JSX and HTML. One such
    // difference is how you apply a class to an element in JSX is by using
    // `className` rather than `class`!
    // 📜 You can learn the differences between JSX and HTML syntax from the React docs here:
    // https://reactjs.org/docs/dom-elements.html#differences-in-attributes

    ReactDOM.render(element, document.getElementById('root'));
  </script>
</body>
```
