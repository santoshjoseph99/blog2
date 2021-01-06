---
title: "Get/Set in Javascript (ES6)"
path: "/javascript-get-set"
tags: ["javascript"]
featuredImage: "./image17.jpg"
excerpt: javascript get & set
created: 2018-08-22
updated: 2018-08-22
---

Javascript `get/set` for ES6 (or Ecmascript2015 if you prefer) is an under used feature.  Some people it seems really do not like the use of it.  I think it is undervalued and should be used more.
So this is a basic example:
```
class Foo {
  realBar = 0;
  get bar() {
    return this.realBar * 2;
  }
  set bar(b) {
    this.realBar = b / 2;
  }
```
And then accessing...
```
let foo = new Foo();
foo.bar = 10;
let x = foo.bar;  //this would return 10
```
How would this look without get/set?
```
class Foo {
  bar = 0;
  getBar() {
   return this.bar * 2;
  }
  setBar(b) {
   this.bar = b / 2;
  }
}
```
Ok, not so bad...quite similar to the get/set example.
How about accessing?
```
let foo = new Foo();
foo.setBar(10);
let x = foo.getBar();
```
So very similar? right.

Whats the benefit?

Well, I think if you have a class or structure and you can just start it out by defining members.  You can have the clients of that class access the members directly.  
At some point there may be some complexity in the class, so do you need to at that point add a function? No, just add the `set` and/or `get` function and that can encapsulate the extra logic.  That way the clients don't change (or break).


