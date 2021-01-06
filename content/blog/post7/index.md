---
title: "Function: SaveAndCheckHash(byte[] bytes)"
path: "/function"
tags: ["function"]
featuredImage: "./image7.jpg"
excerpt: Function naming
created: 2017-12-22
updated: 2017-12-22
---

So from the name of this function it should be obvious what this function does?
Sure…it saves some bytes (somewhere) and checks a hash (of the bytes probably).
Well, the function is a member of a class that has a member called filename…so it computes a hash of the bytes and writes to the file and reads from the file and then computes the hash again and finally compares both hashes.
A function that has the word “And” in it probably is doing too much.
The best thing would be to break apart this function into 2 steps…
```
SaveFile(bytes);
if(GetHash(bytes) == GetHashFromFile())
```
Why do I mention this? Well I had to remove the hashing (because it was not needed anymore) and in my haste I just deleted the call to `SaveAndCheckHash`. Anyways, my tests passed so I assumed everything was ok, but it wasn’t…the program failed somewhere else.
So now my lesson is learned…create functions that do one thing (that sounds familiar right...clean code!).