---
title: "Preact & MobX (Part 1)"
path: "/preact-mobx-part1"
tags: ["preact", "mobx"]
featuredImage: "./image12.jpg"
excerpt: Small tutorial for preact & mobx
created: 2018-04-22
updated: 2018-04-22
---

#### Why Preact over React
Preact is small (3kb), one of the fastest Virtual DOM libraries and if you know React then you can easily work with Preact.
Also (a major point for me), its that is doesn't have Facebook's license.
There is also a Preact CLI which really helps you build an initial project.

#### Why MobX over Redux/Flux
I believe Redux (and Flux) present a lot of boilerplate code. I also think that especially with Redux I'm not a big fan of the 'immutable state' concept.  I'm all for functional programming, but maybe in a language that supports immutable data structures.  Javascript doesn't support that and you typically need to bring in Immutate.js or Mohri for that support.  I think its unnecessary. I'll have another post that shows the example listed below in Redux.
Mobx really simplifies state management. It hides the framework and your code remains more readable and simple. 

#### Simple Example
This is a simple example which uses 2 buttons to increment and decrement a running count, and I didn't want to complicate this with extra build steps, so no Babel and no build config file.  

+ create a directory: `mkdir preact-mobx`
+ `cd` into it and run: `npm init` (accept the defaults)
+ then `npm install mobx mobx-observer express preact preact-hyperscript --save`
+ install webpack: `npm install webpack -g`
+ create a basic node server
 + create `server.js`
 + add the following:
```
const express = require('express');  
const app = express(); 
app.use(express.static('./'));
app.listen(8080);
```
This is the simplest server that can be written in express (hopefully).

 + create `index.html`
 + add this to index.html:
```
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="./bundle.js" charset="utf-8"></script>
  </body>
</html>
```
We'll create bundle.js shortly and we'll need that `div` with `id=app`.  That is where Preact will render into.

  + create index.js
  + add this to index.js
```
  document.write('javascript working');
```
  + run `webpack ./index.js bundle.js`
  + now run your node server: `node server.js`
  + access the webpage: `http://localhost:8080`
  + you should see `javascript working`

Replace the document call in index.js with this:
```
const { createElement, div, button, input } = require('preact-hyperscript');
const { render, Component } = require('preact');
const {extendObservable} = require('mobx');
const {observer} = require('mobx-observer');
const h = createElement;
```
All of the following code snippets can be added to index.js.

Lets add a class which keeps track of the information (the model): `CountStore`:
```
class CountStore {
  constructor() {
    extendObservable(this, {
      count: 0
    })
  }
}

```
We 'mark' the `count` member with the function `extendObservable`.  MobX will connect this member with a component that is an `observer`.  After creating a new CountStore, you can simply access the count like this: `countStore.count`.

And now the view:
```
const CountUi = observer(class CountUi extends Component {
  handleInc() {
    this.props.store.count++;
  }
  handleDec() {
    this.props.store.count--;
  }
  render() {
    let store = this.props.store;
    return div([
      button({ onClick: () => this.handleInc() }, '+'),
      button({ onClick: () => this.handleDec() }, '-'),
      input({ type: 'text', readonly: true, value: store.count }),
    ]);
  }
});
```

So, MobX will connect any observers with observables. The `mobx-observer` package helps by making the `render` call whenever the observable changes. 

And to connect the 2 together:
```
const countStore = new CountStore();

render(
  h(CountUi, {store: countStore}),
  document.getElementById('app')
);
```
Run webpack again: `webpack ./index.js bundle.js` and then run the server.

You can find the code on [Github](https://github.com/santoshjoseph99/preact-mobx.git). Checkout the tag 'part1'.

You can view the live site [here](http://preact-mobx-counting.surge.sh/). Thanks to [surge](https://surge.sh/)

Next up...lets test this component.

