---
title: "Thinking About JSON"
path: "/thinking-about-json"
tags: ["JSON"]
featuredImage: "./image10.jpg"
description: JSON explanation
created: 2018-02-22
date: 2018-02-22
---

JSON is a pretty simple idea. It was conceived in Javascript but can be used as data interchange between a multitude of languages (see the list [here](http://json.org)).
JSON's syntax consists of the following tokens: `[ ]{ } : ,` and only 3 named tokens: `false true null`, and any number of whitespace between tokens.

example:

```
{
  "string" : "value",
  "number" : 5,
  "array" : ["one", "two"],
  "object" : { "string" : "value" }
}
```

While simple, the main thing to keep in mind is how your **language translates some of the values**.

- Javscript's largest number is `Number.MAX_VALUE = 1.7976931348623157e+308`, so if you pass in a larger number then that, what happens is specific to your Javascript implementation. Check your implementation...I tried in Firefox and got `Infinity`.

- Also JSON does not parse binary data. You will have to base64 encode it.

Good exercise to do: JSON is usually sent with the whitespace removed. Create a function (in your favorite language) which takes a string which is a valid JSON object and pretty-print it. I'll try to do it Javascript.
