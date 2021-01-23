---
title: "Preact & Mobx Part 2"
path: "/preact-mobx-part2"
tags: ["preact", "mobx"]
featuredImage: "./image13.jpg"
description: Small tutorial for preact & mobx
created: 2018-04-29
date: 2018-04-29
---

Testing is very important and this post will describe what the best (or simplest) way to go about doing that. We'll do some unit testing and some pseudo integration testing with a DOM emulation library (jsdom).

We are going to start by installing a few packages needed for testing:
`npm install --save-dev mocha preact-jsx-chai sinon sinon-chai jsdom chai lodash`

Lets do some minor refactoring. Add this to the `CountStore` class:

```
  incCount() {
    this.count++;
  }
  decCount() {
    this.count--;
  }
```

Why? Well, its going to easier to test if we can stub out functionality.

Also in CountUi class lets call these methods:

```
  handleInc() {
    this.props.store.incCount();
  }
  handleDec() {
    this.props.store.decCount();
  }
```

Also lets create files for the store and ui. This is needed so we can test each part separately.
Create `store.js` and 'count.js':
`store.js:`

```
const {extendObservable} = require('mobx');

class CountStore {
  constructor() {
    extendObservable(this, {
      count: 0
    })
  }
  incCount() {
    this.count++;
  }
  decCount() {
    this.count--;
  }
}

module.exports = CountStore;
```

`count.js:`

```
const { createElement, div, button, input } = require('preact-hyperscript');
const { Component } = require('preact');
const {observer} = require('mobx-observer');

const CountUi = observer(class CountUi extends Component {
  handleInc() {
    this.props.store.incCount();
  }
  handleDec() {
    this.props.store.decCount();
  }
  render() {
    let store = this.props.store;
    return div([
      button('#inc', { onClick: () => this.handleInc() }, '+'),
      button('#dec', { onClick: () => this.handleDec() }, '-'),      input({ type: 'text', readonly: true, value: store.count }),
    ]);
  }
});

module.exports = CountUi;
```

`index.js` is now the following:

```

const { createElement } = require('preact-hyperscript');
const { render, Component } = require('preact');
const h = createElement;
const CountStore = require('./store');
const CountUi = require('./count');

const countStore = new CountStore();

render(
  h(CountUi, {store: countStore}),
  document.getElementById('app')
);
```

Lets create a setup file for mocha (mostly copied from the Enzyme project).
create a `test` directory and create `setup.js` there.

```
'use strict';

var context = global;

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var assertJsx = require('preact-jsx-chai');
var expect = chai.expect;
chai.use(assertJsx.default);
chai.use(require('sinon-chai'));

const {JSDOM} = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body><div id="test"></div></body></html>');
const {window} = jsdom;
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.MouseEvent = global.window.MouseEvent;
copyProps(window, global);

var moduleOutput = {
  chai,
  expect,
  sinon,
  JSDOM
};

_.extend(context, moduleOutput);

module.exports = moduleOutput;
```

All of these things we export out of the setup.js file, we can then use them in our test file.

create a test file: `count.test.js`

```
const { createElement } = require('preact-hyperscript');
const { render, Component } = require('preact');
const h = createElement;
const CountUi = require('../count');

class StoreStub {
  incCount() {
  }
  decCount() {
  }
}

describe('Count', function () {

  it('To contain the `+` symbol', function () {
    let storeStub = new StoreStub();
    let component = h(CountUi, {store: storeStub});
    expect(component).to.contain('+');
  });

  it('To contain the `-` symbol', function () {
    let storeStub = new StoreStub();
    let component = h(CountUi, { store: storeStub });
    expect(component).to.contain('-');
  });

  it('handles the `+` click event', function () {
    let storeStub = new StoreStub();
    storeStub.incCount = sinon.stub().returns();
    let component = h(CountUi, { store: storeStub });
    let container = document.getElementById('test');
    const context = render(component, container, container.lastElementChild);

    let event = new MouseEvent('click');
    document.getElementById('inc').dispatchEvent(event);
    expect(storeStub.incCount).to.be.called;
  });

  it('handles the `-` click event', function () {
    let storeStub = new StoreStub();
    storeStub.decCount = sinon.stub().returns();
    let component = h(CountUi, { store: storeStub });
    let container = document.getElementById('test');
    const context = render(component, container, container.lastElementChild);

    let event = new MouseEvent('click');
    document.getElementById('dec').dispatchEvent(event);
    expect(storeStub.decCount).to.be.called;
  });

});
```

The first couple of tests just do a simple check for some exact text in the component.
Then last two tests use `jsdom` to send click events and then we test to see if our methods on the store get called.

To start the tests:
`mocha --require ./test/setup.js`

As an exercise to the reader, so what else needs testing?

You can find the code on [Github](https://github.com/santoshjoseph99/preact-mobx.git). Checkout the tag 'part2'.

You can view the live site [here](http://preact-mobx-counting.surge.sh/). Thanks to [surge](https://surge.sh/)

Next post, lets talk about MobX's computed values.
