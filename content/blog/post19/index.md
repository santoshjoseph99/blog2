---
title: "Ionic HTTP Cache Implementation"
path: "/ionic-cache-implementation"
tags: ["ionic", "cache"]
featuredImage: "./image19.jpg"
excerpt: ionic cache implementation
created: 2018-08-29
updated: 2018-08-29
---

Caches are notoriously difficult to implement correctly.  I've done it a few times for work-related projects and I think each time there was at least one problem.

Ideally I would like a solution that would use the cache almost as a side effect or something that you don't explicitly code against.
For example, lets say you had a `http` interface for your program called `FooService` and it implemented a few methods for getting data.
```
class FooService {
  getFoo1();
  getFoo2();
  //etc
}
```
Then I would like to cache the `get` methods and not change `FooService`.  I was thinking something like this would be cool: `LocalCache<FooService>` and that would wrap each of the `get` methods automatically. 
Well, that might work out, but I have to learn about Typescript's type system a little bit more.

For starters I wrote this [ionic-http-cache](https://github.com/santoshjoseph99/ionic-http-cache).  This is basically a wrapper around your get calls.  Some more work will need to be done to account for needed `http` headers and/or params.
The cache key is the `url` and you can specify different expire times for each key.
You can also invalidate the entire cache or just the data for a key.
And it returns `Observables`.
It also uses Ionic [storage](https://ionicframework.com/docs/storage/) for the backing.  Another good this is you don't to change the the service code, but will have to change each client that uses the cache.

So this is a really simple cache, and it needs to be updated to handle the `http` headers and params.  I'll do that in a following post, but for the time being, this will work.