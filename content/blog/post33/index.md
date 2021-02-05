---
title: "Tutorial: Playing the game of War"
date: "2021-02-07"
description: "With React Native"
---

This will be a multi-part series which doesn't involve anything too complex, but will
cover a few aspects of software construction:

- Thinking about the problem from a high level
- Breaking apart the problem (separating the UI & business logic)
- Test driven development (TDD)
- Integration testing the UI
- Performance
- Metrics (gathering of user data)
- The ability to reuse software components
- Assume that you have knowledge of Javascript, React and git.

I've decided to venture into creating an app with React Native that would involve something fun...so how about a game of `War`.

### Why choose React Native?

[React Native](https://reactnative.dev) is a solid platform to build out an app. There is good documentation and a variety of tutorials encompassing the many facets of mobile programming. And especially for an app like this, which isn't compute heavy and not needing to access mobile phone features like GPS, a cross platform solution does fit the model (I also considered Flutter & Ionic). Also another thought is what if we would like to support the web, then we probably could reuse some code.

### Why Choose _War_?

[_War_](<https://en.wikipedia.org/wiki/War_(card_game)>) seems like a simple game to play, but is it that easy to program? The toughest part to program is when there are ties and when one player runs out of cards (especially in a tie) depending on the variation. So there are some corner cases to investigate. What else could complicate things? What about variations of the game? Time limit? Cards won? We won't worry about
variations but that is something you should keep in mind when programming.

### Tutorial Parts

- `Go` game logic
- Building out the UI
- Testing
- Gathering data
- Going to the web?

### Scope of the problem

From the number of platforms we can support and the variations of the game, this could be a `big` project. We will limit ourselves just working
on Android or iOS (your choice) and a simple game of `Go` without any variations and play vs the computer (multi-player would be cool right?).

Next post we will get into `Go` game logic.

### First Steps

1. Get your environment [setup](https://reactnative.dev/docs/environment-setup) for React Native. (Currently using v0.63 of React Native)
2. Go through the React Native [docs](https://reactnative.dev/docs/getting-started).
3. This [repo](https://github.com/santoshjoseph99/ReactNativeGo) will have the code for the tutorial. Each blog post will be tagged by the following format: partX.
4. Read up on [TDD](https://en.wikipedia.org/wiki/Test-driven_development) if you haven't participated in modern programming 😃.
