---
title: "Your code broken down into 3 concepts..."
path: "/code-into-three-concepts"
tags: ["software"]
featuredImage: "./image30.jpg"
description: three concepts for code
created: 2020-05-02
date: 2018-05-02
---

###**R**eadability, **P**erformance, and **M**aintainability (RPM)

I think most code can broken into three concepts: readability, performance and maintainability. This is important when writing your code and also when reviewing code. Sometimes these concepts can collide with each other (and they should), so its important to understand the trade offs. I'll give a quick intro to these concepts and then I'll do some more elaborate posts describing them.

###### Readability

Why is this important? This is important for people reviewing the code and you having to read it at some point. I have in my past written code and had to look at that code again for a bug and found it completely baffled at my own understanding. Someone said something about "clever code"...its not good. Its better to write something in a simple way.

###### Performance

We all have to think about the practical aspects of our code. Its going to used by people (usually). They can't wait forever (or a long time) for the code return an answer. If your code take too long to run, then people will abandon it ([Why Performance Matters](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)). You will find writing performant code means sometimes the code will have to look "clever" or it might even need a complete re-architecture.
Performance can definitely have adverse effects on readability and maintainability. So, when is it right to break (or weaken) the other two concepts? When nothing else matters then performance.  
Performance can be broken down in a couple components. Think about the **size** of your code. Web code can have latency problems. So having megabytes downloaded initially before anything shows to the user will have negative impacts. Also think about how **quickly** your code executes. If you have a O(N^2) loop somewhere in the code and that code block gets hit frequently and you can't constrain the inputs then you'll get high CPU usage which will in turn have negative impacts overall.
Check out the [Preact](https://preactjs.org) source code for an example when only performance matters (they did recently add more comments to their code, which was nice).

###### Maintainability

This concept really ties in with readability but also goes a bit deeper. Maintainability is the ability for the code to changed at some later date. How easy is it to add a new feature? How easy is it to refactor the code? This is where concepts from the [SOLID](https://en.wikipedia.org/wiki/SOLID) design principles come in.
Concepts like dependency inversion principle come into play here. Also having sufficient test code coverage is important because it give the confidence for the programmer to change the code (refactor).

So, **R**eadability, **P**erformance, and **M**aintainability are concepts which I follow every day when writing code and reviewing code. If you able to understand the reasoning and how one affects each other then it will go a long way into how your software is written and in turn how your career unfolds. Writing quality code will in turn create less bugs and you can spend more time writing features.
Just note not all code can follow these concepts fully and that's OK. There are exceptions to most rules.
