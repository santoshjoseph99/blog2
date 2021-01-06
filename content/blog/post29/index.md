---
title: "Which is faster? 3 ways to loop in JS"
path: "/javascript-loops"
tags: ["javascript"]
featuredImage: "./image29.jpg"
excerpt: Javascript loops
created: 2020-05-01
updated: 2021-01-02
---

I wrote some code recently and I was iterating over an array and was using `forEach`. Seems pretty simple right?
But I was told to use a `for-of` instead because there is overhead with `forEach`. I kind of agreed and the part that I thought where I disagreed was the fact the javascript compiler could probably optimize the `forEach` better...

Anyways I wrote some simple code:

```
let a = [];
for(let i = 0; i < 1000000; i++) {
  a.push(i);
}

let total = 0;
console.time('for-loop');
for(let i = 0; i < 1000000; i++) {
  total += a[i];
}
console.timeEnd('for-loop');

total = 0;
console.time('for-of');
for(let x of a) {
  total += x;
}
console.timeEnd('for-of');

total = 0;
console.time('for-each');
a.forEach(x => total += x);
console.timeEnd('for-each');
```

And then I ran that snippet with node 12...
the results:

```
for-loop: 23.411ms
for-of: 36.625ms
for-each: 23.079ms
```

Ran the code in the chrome dev tools:

```
21:40:45.731 VM150:12 for-loop: 29.47216796875ms
21:40:45.766 VM150:19 for-of: 33.974853515625ms
21:40:45.787 VM150:24 for-each: 21.697998046875ms
```

Then I ran the code in the firefox console:

```
for-loop: 300ms - timer ended debugger eval code:12:9
for-of: 240ms - timer ended debugger eval code:19:9
for-each: 94ms - timer ended
```

Guess firefox needs some more improvement?

Do you know why the `for` loop runs slower in firefox?

My only guess is that `V8` rewrites the `for` loop, by doing the following:

- caching the end check (possibly done in the `for of` example)
- iterating the loop from the end: `while(--end) { ... }`

Maybe I should add more complicated code inside my for loops to get a better test?

Anyways, `V8` is doing a great job of optimizing and going to keep using `forEach`!
