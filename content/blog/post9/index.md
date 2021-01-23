---
title: "Dependency Injection....Why?"
path: "/dependency-injection"
tags: ["Dependency injection"]
featuredImage: "./image9.jpg"
description: A little concept called dependency injection
created: 2018-01-22
date: 2018-01-22
---

If someone is going ask you in an interview: “How would you explain dependency injection to a programmer who knew nothing about it?”…what would you say? I thought about this while walking my dog (yes my mind wanders aimlessly sometimes when _walking the dog_).

So you want to say something that doesn’t sound like its from a text book while still conveying the main points. _That is always usually harder then it seems._
The main points of DI (when I think of) are:

- Testability
- Changing behavior
- Bootstrapping

**Testability**: It is important to test your software (unit testing) and you want to isolate your tests so that anything your class depends on doesn’t interfere with your tests. This is where sending in an interface instead of the actual implementation is good. In your tests you can use a mock instead of the real class.  
An simple example is when you have a class that uses a service to download data from the web. When testing this class you don’t actually want to download data from the web, instead you pass in a mocked version of the service which would just return some data which wouldn’t be downloaded.

**Changing behavior**: Sometimes a behavior of a class can change. It can change because of incoming data or by some configuration. DI is perfect here because it allows a new implementation to be seamlessly used.

**Bootstrapping**: This is really an DI feature but for a beginner to understand this topic they have to see the implementation. Some frameworks like ASP.NET MVC have nice pluggable places where a DI implementation can replace the existing DI implementation and then its just about setting some configuration through code or through unfortunate XML (_I can rant about XML but for another post!_). If no framework is being used then you basically have to create the bootstrapping code yourself which would be an good exercise to understand the DI library being used.

So with those points being said, that still sounds like lots of words to explain a not so complicated topic?  
I think so and I would have been slightly confused without a more laconic response and without a concrete example.

So without showing an example because remember this is about answering an interview question, this is what I would say to my prospective employer:

> “DI is about having a class created in a way so that it is not dependent on external services (like the internet). We can then send in interfaces to this class so those interfaces can be replaced with implementations that are suitable for whatever context we are using the class in. For example we can input mock classes when testing the class and concrete implementations when using the class in the desired way and change the services whenever we want.”
