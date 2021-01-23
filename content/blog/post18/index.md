---
title: "Designing a HTTP Cache for Ionic apps"
path: "/ionic-cache"
tags: ["ionic", "cache"]
featuredImage: "./image18.jpg"
description: Ionic & caches
created: 2018-09-22
date: 2018-09-22
---

So when trying to solve a problem its important to apply scope orrectly. Don't try to solve everything. Just solve the problem at hand and maybe follow the motto: `Fail fast and break things`. (maybe not breaking too many things!)

######Here is the problem:
You have to make `http` calls from an Ionic app and the data received doesn't change that often, so this is a case that is a good candidate for caching.

So here are some questions we should be asking:

1. Does the cache expire? If so when.
2. Can you force the cache to expire?
3. How is the cache implemented? memory, browser storage, db?
4. What are the cache keys?
5. Since http calls are async, the cache interface needs to be async?

Maybe thats a good start?

Lets discuss some of these questions in detail:

1. _Cache expiration._ This is important. This has to configurable. The cache class should read this from a config or the time can be passed into the constructor. We'll do both.
2. _Force cache expiration._ This is important too. Maybe we need certain keys to expire or maybe the whole cache. We'll implement methods for both.
3. _Cache backing._ This can be important, but shouldn't affect everyday usage of the cache. Memory would be fastest. We'll keep it simple and we'll use memory.
4. _Cache keys._ Since these are `http` methods, can we use a combination of the `http` verb (GET, POST, etc) and the address? Lets go with this and see if any problems crop up.
5. _Async calls._ Now this we have to support. We don't want the clients of the class to change the behavior.

With these in mind, the next article will describe an implementation.
