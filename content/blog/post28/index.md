---
title: "How to duplicate an array quickly in Javascript?"
path: "/javascript-array-duplicate"
tags: ["javascript"]
featuredImage: "./image28.jpg"
excerpt: javascript array duplication
created: 2018-12-02
updated: 2018-12-02
---

We have a simple interview question...how to duplicate an array.  I think there at least 2 answers:
1. `for` loop
2. `concat`
  
and my buddy at work said: 'use the `spread` operator', which in my opinion isn't very readable and got me thinking...is that `es6` construct efficient?

Here are some results of the running the following code using 3 different node versions.
```javascript
const concat = [];
for(let i = 0; i < 1000; i++){
  concat.push(i);
}
let a1 = [];
console.time('concat');
for(let i = 0; i < 1000; i++) {
  a1 = concat.concat(concat);
}
console.timeEnd('concat');

let spread = [];
for(let i = 0; i < 1000; i++) {
  spread.push(i);
}
let a2 = [];
console.time('spread');
for(let i = 0; i < 1000; i++){
  a2 = [...spread, ...spread];
}
console.timeEnd('spread');
```
node 12:
```
concat: 5.016ms
spread: 9.849ms
```
node 10:
```
concat: 4.721ms
spread: 16.884ms
```
node 8:
```
concat: 4.257ms
spread: 79.438ms
```

Well, it looks like v8 definitely improved on node 12, but still not as good as `concat`.

So I definitely wouldn't recommend using the `spread` operator until it can get as fast as `Array concat`.

Btw, if a candidate uses a `for` loop for the interview answer, then I would be a little disappointed and ask for a better solution.
