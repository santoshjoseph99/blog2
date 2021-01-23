---
title: "Manipulating strings in Visual Studio"
path: "/visual-studio-strings"
tags: ["Visual Studio"]
featuredImage: "./image5.jpg"
description: visual studio strings
created: 2017-10-22
date: 2017-10-22
---

I needed to replace the spaces in a string and instead of copying into my editor I put the string into my F# Interactive window….

```
> “a b c d e”.Replace(” “,”“);;
val it : string = “abcde”
```

Then I thought it should work in the Package Manger Console:

```
PM> “a b c d e”.Replace(” “, “”)
abcde
```

And yes you can do that in the powershell as well and you can try the Python interactive window (and I’m sure the list can go on).

I keep forgetting how much power/flexibility there is with just the interactive shells that come with VS.
