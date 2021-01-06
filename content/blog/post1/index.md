---
title: "Coffeescript Tidbit: '?' vs 'or'"
path: "/coffescript-tidbit"
tags: ["Coffescript"]
featuredImage: "./image1.jpg"
excerpt: A little snippet to understand coffescript.
created: 2017-07-22
updated: 2017-07-22
---

If you use the `?` operator to check for the existence of a variable like this: `a?.b` then you are using it right because the javascript looks like this:
```
if (typeof a !== "undefined" && a !== null) {
  a.b;
}
```

But I've seen this usage of the `?` operator in my work's codebase:

`a ? b`

which translates to:

```
if (typeof a !== "undefined" && a !== null) {
  a;
} else {
  b;
};
```

really you should be using `or`:

`a or b`

translates to:

`a || b`

Maybe `a ? b` gets optimized (I'm not sure), so I would use the `or` version to get the logical or property.