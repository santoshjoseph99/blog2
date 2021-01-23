---
title: "Javascript: partial application"
path: "/javascript-partial-application"
tags: ["javascript"]
featuredImage: "./image21.jpg"
description: javascript partial application
created: 2018-09-29
date: 2018-09-29
---

I guess from that title, its not exactly intuitive to what that means. How about if say `partial function application`? Does that make it more clear?
Anyways, the short of it is this: it means we are connecting arguments to a function...here is an example (pretend we have a function called `partial`):

```
function add(x, y) {
  return x + y;
}
let add9 = partial(add, 9);
add9(5); //returns 14
```

Let go ahead and implement `partial`:

```
function partial(fn, arg1) {
  return function(arg2) {
    return fn.call(null, arg1, arg2);
  }
}
```

Since functions are [first class objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) in Javascript its easy to pass them around as function arguments and as return values.
We use Javascript's [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) method to help us out. The `call` method allows us to call the function that is attached to it and calls that function with the argument list.
Also an important concept called lexical scoping (AKA [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)) is used to bind `arg1` to the inner function, so that argument is saved. `partial` returns a function that in its body has `arg1` basically saved.
So that means you can pass around `add9` anywhere and when you call it you just have to specify its only argument and that will always get added to `9`.

That is the basics of `partial application`, but the only annoying name is some libraries will call it `partial` (like in [lodash](https://lodash.com/docs/4.17.4#partial)). I wouldn't mind if the name was a little different. How about something called `connectArg` or `attachArg`?

Now, what if we wanted `partial` to take multiple arguments?
Lets take a look at a little bit closer to `ES6` syntax and see how it can help us out.

```
function add(x, y, z) {
  return x + y + z;
}
let add9 = partial(add, 8, 1);
add9(5); //returns 14
```

We can use the `rest` operator, which takes multiple arguments
and presents it as an array. And then we can use the `spread` operator to break apart the array.

```
function partial(fn, ...args) { //combining all args as an array
  return function(arg2) {
    return fn.apply(null, [...args, arg2]); //breaking array into parts
  }
}
```

Note, we are using [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fapply) which is very similar to call and `apply` needs an array for the 2nd parameter.

As an exercise can you figure out what to do so that multiple arguments can be passed to the function that is returned from `partial`?
