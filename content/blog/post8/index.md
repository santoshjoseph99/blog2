---
title: "Coffeescript or Javascript?"
path: "/coffescript-or-typescript"
tags: ["Coffescript", "typescript"]
featuredImage: "./image8.jpg"
excerpt: coffescript or typescript
created: 2017-07-22
updated: 2017-07-22
---

I started programming in Coffeescript about 2 years ago because that was what my company used (frontend & backend).  I really didn't like the language at first (coming from a background of C++/C#), but it steadily grew on me.  Recently though we are converting much of the server side code to be ES6 since that Node 6+ runs that natively.  But is that really needed?  Should we really convert?
  Coffeescript does have its advantages.

+ less overall code
  + terse like `python` & `ruby`
+ no braces
  + ever written a test in mocha that had a few describes & contexts
+ everything is an expression 
  + ex: `color = if color then 'RED' else 'GREEN'`
+ checking for undefined with `?`
  + ex: `color = config?.features?.color`

But I feel like the disadvantages can put Coffeescript down a little bit.

+ debugging
  + can be annoying since the code is not the same
+ errors
  + hard to read errors from the compiler
+ untyped
  + I've had personal problems with untyped languages!
+ spaces instead of braces

And competing against ES6 is hard since ES6 has lots of things that are coffeescript has (like destruturing objects).  And ES6 has more flexibility with variables (`let` and `const`).

I would in conclusion choose ES6 especially if you are in Node 6+ environment, but I'm not a huge fan of dynamic languages so if you can use [flow](https://flow.org/) or [Typescript](http://www.typescriptlang.org/) then I would highly recommend using one of those technologies alongside ES6.
