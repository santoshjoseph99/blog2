---
title: "ES6 Import Statement...How Annoying"
path: "/es6-import"
tags: ["javascript", "es6"]
featuredImage: "./image2.jpg"
description: The most annoying thing about imports in ES6.
created: 2017-07-29
date: 2017-07-29
---

So lets say you are about to bring in an import in ES6 like this:

```javascript
1) import {x,y} from 'ABC';
```

It would be great if the `import` looked something like this:

```javascript
2) using 'ABC' as {x,y}
```

Why would this be better?

Well, for _1)_ as you type you don't any type information till you finish the statement.
So, you just have to type the braces in and then you can get type information and finish the import, then go back into the braces for types.

But with _2)_ after you finish the end quote then your IDE can process the import and give you type information.

Why does this matter? As codebases get more complex (whether you use Typescript or ES6), just getting the right information can save you time and help you concentrate on the code at hand.

I'm just really annoyed with this design...how would you know exactly what classes/functions are in the file you are importing.

Anyways, just my 2 cents.
