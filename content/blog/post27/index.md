---
title: "Preact & Unistore"
path: "/preact-unistore"
tags: ["preact"]
featuredImage: "./image27.jpg"
description: preact & unistore
created: 2018-12-02
date: 2018-12-02
---

Trying to make a website load as quickly as possible is difficult. You are fighting to reduce the amount of HTML, Javascript and CSS that needs to be downloaded and parsed.

In this article I'll talk about reducing the Javascript part. Using [Preact](https://preactjs.com/) is a start. Its 3kb for production and if you are really interested you really interested then use [preact-cli](https://github.com/developit/preact-cli). It creates a Preact-enabled website with a [lighthouse](https://developers.google.com/web/tools/lighthouse/) score of 100.

Anyways, most applications need some help with state. If your application is pretty simple, I would just stick with Preact state, but most of the time you'll need some more complex state handling. A good choice would be [Redux](https://redux.js.org/) or a choice I think that is very easy to program is [Mobx](https://github.com/mobxjs/mobx). We'll talk about [Unistore](https://github.com/developit/unistore) which provides a very small library (less then 1kb) and provides a good interface to properly manage your state.

Let start with the simplest example.
You can see the code [here](https://github.com/santoshjoseph99/preact-unistore). Check out the tag `initial`.
First lets get the project started...simple node/webpack project.

`npm init`

`npm install express preact unistore preact-hyperscript -S`

`npm install webpack webpack-cli -D`

next create a server.js file:

```
const express = require('express');
const app = express();
app.use(express.static('./'));
app.listen(8080);
```

create a index.html file:

```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="./dist/main.js" charset="utf-8"></script>
  </body>
</html>
```

create a `src` directory and add an index.js file:

```
const { createElement, div, p, button } = require('preact-hyperscript');
const { render, Component } = require('preact');
const h = createElement;
import createStore from 'unistore'
import { Provider, connect } from 'unistore/preact'

let store = createStore();
let actions = store => ({});

const App = connect('', actions)(
  () => {
    return (
      div([ ])
    );
  }
);

const App =
render(
  h(Provider, { store: store }, [
    div(
      [
        h(App),
      ])]),
  document.getElementById('app')
);
```

If you run `webpack`, you should get the output file in the `dist` directory. Then if you run `node server.js`, you can go see the file at `http://localhost:8080`, which will show nothing at the moment.
Lets go through each part...
I like to use `preact-hyperscript` so I don't need to use babel...you can then at least debug your code exactly as its written.
The `createStore` function can take an object, which we will pass shortly. This is where we will store the state of the application. The `actions` object is where we will specify actions to take on the state. The `connect` function either takes an `Component` or a function (if a stateless component). Our example will start with the stateless component.
Then our `App` is enclosed in a `Provider` component which connects the store as a prop to the `App`.

So lets add some basic functionality....a simple counter to get started.
`git checkout part2` if you are following from git.

Our entire state for the program is an integer..we will call it `count`.

```
let store = createStore({ count: 0 });
```

Then we can increment the state when the action is called...

```
let actions = store => ({
  increment: (state) => {
    return {
      count: state.count + 1
    }
  }
});
```

Notice we don't actually increment the state, but return an incremented version of the state.

Then we can pass in the state and action as a prop into the view:

```
const App = connect('count', actions)(
  ({ count, increment }) => {
    return (
      div([
        p('.count', count),
        button('.button', { onClick: increment }, '+'),
      ])
    );
  }
);
```

When you click on the button, you increment the state and the view is rendered.

Lets create an another `Component` and also create a little bit more of a complicated state.

```
let store = createStore({ count: 0, data: {count2: 1 } });
```

Instead of a string we can use a function to return the appropriate data to the component.

```
const App2 = connect(function(s) { return s.data; }, actions)(class MyComponent extends Component {
  constructor() {
    super();
  }

  render({ count, increment2 }) {
    return (
      div([
        p('.count', count),
        button('.button', { onClick: increment2 }, '+'),
      ])
    );
  }
});
```

Here is the actions object which handles the new increment:

```
let actions = store => ({
  increment(state) {
    return { count: state.count + 1 }
  },
  increment2(state) {
    return {
      data: {
          count2: state.data.count2 + 1,
        }
      }
  },
});
```

```
render(
  h(Provider, { store: store }, [
    div(
      [
        h(App),
        h(App2),
      ])]),
  document.getElementById('app')
);
```

So is the basics (and mostly) of using `unistore` with `preact`. I'll try putting another post with a few more of features of `unistore`.
