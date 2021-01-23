---
title: "Coffeescript tidbit: try/catch"
path: "/coffeescript-try-catch"
tags: ["coffeescript"]
featuredImage: "./image23.jpg"
description: coffeescript try & catch
created: 2018-10-29
date: 2018-10-29
---

Really simple, the morale of the story is don't put your `try/catch` on one line. Even though the following does compile:

```
_encodeParam = (str) ->
  try encodeURIComponent(str) catch str
```

and you would think the `catch` handler just returns the input `str`, but the complied code is:

```
var _encodeParam;
_encodeParam = function(str) {
  try {
    return encodeURIComponent(str);
  } catch (error) {
    str = error;
  }
};
```

so the magic `error` variable is actually assigned to string
and returned. So `coffeescript` should return an error (or least a warning) about that compilation, but silently eats your input variable.
So, that nice, compact one line of code really needs to be:

```
_encodeParam = (str) ->
  try
    encodeURIComponent(str)
  catch
    return str
```

Thanks `coffescript`.

My real rant is feedback from the compiler. I think a compiler from the ground up needs to think about displaying informational error and warning messages. That why I like the [Elm](http://elm-lang.org/) language.
