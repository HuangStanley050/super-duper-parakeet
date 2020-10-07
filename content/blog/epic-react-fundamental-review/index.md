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
