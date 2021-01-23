---
title: "F# and Euler Problem 22"
path: "/euler-22"
tags: ["F#", "Euler"]
featuredImage: "./image4.jpg"
description: Problem 22 in euler.com
created: 2017-09-22
date: 2017-09-22
---

This is a good problem that can be solved with some parallel programming.

F# makes this pretty easy. I’m not going post the entire solution, but just give an idea what F# can do to solve this problem a little faster.
So after the list is sorted (assume the data is stored into an Array object)

```
input_array
|> Array.sort
|> Array.Parallel.mapi (func i e -> …)
```

i is the index into the array and e is the element

and the … is your “solution”.
