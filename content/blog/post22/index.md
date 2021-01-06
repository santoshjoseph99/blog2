---
title: "Javascript: splice"
path: "/javascript-splice"
tags: ["javascript"]
featuredImage: "./image22.jpg"
excerpt: javascript splice
created: 2018-10-22
updated: 2018-10-22
---

Ok, (ranting time) so is this the worst name for a function?  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) starts the description: 
> > "The splice() method changes the contents of an array by removing existing elements and/or adding new elements."

So this function does a lot...so you can actually remove elements and at the same time add elements.  Why?  This just breaks software design at its core.

Every time I see a splice, I have to look at the arguments.  No idea what the function does from its name, so it literally makes code unreadable.
It would nice to see code like this:
```
let array = [1,2,3];
array.removeAt(0); //array is [2,3]
array.insertAt(0, 4); //array is now [4,2,3]
```
but instead we see code like this:
```
let array = [1,2,3];
array.splice(0,1);
array.splice(0,0,4);
```
Whats more readable?

So I'm not sure why the Javascript [spec](https://github.com/tc39/proposals) doesn't change for array.  Its not hard to add a couple new functions.  Of course `splice` would have to be kept around forever, but encourage people to use the newer methods.
