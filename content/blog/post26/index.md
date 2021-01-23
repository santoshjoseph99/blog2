---
title: "Javascript Async Return Tidbit"
path: "/javascript-async"
tags: ["javascipt"]
featuredImage: "./image26.jpg"
description: javascript async fun
created: 2018-12-02
date: 2018-12-02
---

If you have the following code, what does it return?

```
async function get() {
  return "something";
}
```

If you said, it returns a `string`, then you are wrong.
Its a `Promise`. To be more exact `Promise<string>`.

So guess what this function returns:

```
async function get() {
  return [1, 2, 3];
}
```

If you say (following along from the first example), an array of `Promises`, then you are wrong. Its just one `Promise`, type is `Promise<number[]>`.

Anyways, this is probably the first thing you need to know when learning about Javascript's wonderful `async/await`.

The next tidbit will be about handling `async/await` errors...
