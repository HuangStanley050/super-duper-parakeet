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

```javascript
const Demo = () => {
  const [inputRef, setInputFocus] = useFocusHook();

  return (
    <>
      <button onClick={setInputFocus}>FOCUS</button>
      <input ref={inputRef} />
    </>
  );
};

const useFocusHook = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
```

### Triggering imperative animations.

```javascript
import React, { useEffect, useState, useRef } from 'react';

function Animation() {
  const [background, setBackground] = useState('blue');

  const divRef = useRef();

  function onScroll(params) {
    const div = divRef.current;
    const { y } = div.getBoundingClientRect();
    const backgroundColor = y <= 0 ? 'blue' : 'pink';
    setBackground(backgroundColor);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div ref={divRef} style={{ height: '120vh', background: background }}>
      Scroll to turn background pink.
    </div>
  );
}

export default Animation;
```

### Integrating with third-party DOM libraries.

Example using with d3:

```javascript
import React from 'react';
import * as d3 from 'd3';

const MultilineChart = ({ data, dimensions }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].items, d => d.date))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].items, d => d.value) - 50,
        d3.max(data[0].items, d => d.value) + 50,
      ])
      .range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom);
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    xAxisGroup
      .selectAll('text')
      .attr('opacity', 0.5)
      .attr('color', 'white')
      .attr('font-size', '0.75rem');
    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat(val => `${val}%`);
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    yAxisGroup
      .selectAll('text')
      .attr('opacity', 0.5)
      .attr('color', 'white')
      .attr('font-size', '0.75rem');
    // Draw the lines
    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));
    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 3)
      .attr('d', d => line(d.items));
  }, [data]); // Redraw chart if data changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default MultilineChart;
```
