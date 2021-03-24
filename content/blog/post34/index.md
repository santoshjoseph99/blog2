---
title: "Tutorial: Game of War, Part 1"
date: "2021-03-16"
description: "With React Native"
---

## War Game Logic

### Research

Let investigate what the rules of are and also get an idea of the variations of the game.
Read up on the following links (and maybe do some of your own research):

- https://boredombusted.com/war-card-game-rules-variations/
- https://en.wikipedia.org/wiki/War_(card_game)
- https://www.dummies.com/games/card-games/childrens-games/how-to-play-war/

### Scope out problem

My main question is what to do when one player runs out of cards in a game of war. I think the solution to let the other player (one with more cards) to win is completely fine. You can go ahead and code this with a complicated route: assume that the player with less cards will get to flip up the last card. So if the player 1 had 2 cards left and the 1st one is a tie, then the 2nd card (the last one for player 1) will get flipped up, while the other player has to put down 3 cards and flip the 4th card up.

### UI and Logic Interaction

The real question that needs to be answered is what is the logic flow between the UI (player) and the game. What happens when a player presses
the proverbial 'Play' button and what the UI should show. So what about this (this might change): Each player starts with an equal amount of cards. When a round of play happens (after the play button is pressed), then the game should
send the UI the 2 cards and a result of the play. Then the UI needs to signal the logic to process
that play: logic will put the winners card and losers card into their pile (shuffle and place at the end). Then the UI can call 'play' again.
And so forth.

### Choosing libraries

In this case lets not create all software if we don't need too. Let use this [deck](https://github.com/santoshjoseph99/deckjs) package. Not sure why, but I feel its a good one:)
Also feel free to grab some images of cards (if you can't find your own use [these](https://github.com/santoshjoseph99/card-games/tree/master/packages/counting-client/public/images/PNG)). Download entire code in zip [here](https://github.com/santoshjoseph99/card-games/archive/master.zip).
Of course you know we are using React Native.

### Test Driven Development

So lets get the testing setup and some tests, but first lets get the basic project setup.

```
expo init ReactNativeWarGame
```

Choose:

```
❯   blank                 a minimal app as clean as an empty canvas
```

follow the commands:

```
cd ReactNativeWarGame
```

and open up your favorite editor. I'll be using [visual studio code](https://code.visualstudio.com)
We are going to need to add testing support, so the lets do the following:

Open the terminal in VS code and run:

```
yarn add -D jest-expo
```

Open `package.json` and add the following statement:

```
"test": "jest --watchAll"
```

to the end of the scripts section.

Also add this right after the scripts section:

```
"jest": {
    "preset": "jest-expo"
  },
```

then run:

```
yarn start
```

This will open a webpage and then you can
choose the platform you want to start testing in...for right now it doesn't matter. We just want to make it run.

Ok then next step...lets write a simple test.
Create a folder `__tests__` in the base directory. Its convention that our tests will be located in that folder.
Create a file called App.js and place the following contents:

```
import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
```

And run `yarn test`. This should return success.

```
 PASS  __tests__/App.js (18.91s)
  ✓ renders correctly (5989ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        19.031s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

### More Tests

Add a folder in `__tests__` called `game`. This will be were all our game tests will be located. Add `Game.js` to the `game` folder. This won't have anything specific to React.
Add the following to `Game.js`.

```
it('Game', () => {
});
```

You should still have `yarn test` running, if not then start a terminal and keep it running. You should see the following output:

```
PASS  __tests__/App.js
PASS  __tests__/game/Game.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        4.725s
```

First step...lets create a test that fails.

```
it('Game', () => {
  const game = new Game();
});
```

After that, let get it to pass in 2 steps:
step 1: add import

```
import Game from '../../game/';
```

step 2: create a file index.js in a directory called `game`.

```
export default class Game {
}
```

Congrats...the test should pass now!

Now for the fun part. Lets write a real test. How about we get the deck to deal the cards equal among 2 hands.

```
it('Game deals 26 cards to each player', () => {
  const game = new Game();
  expect(game.player1.cards).toHaveLength(26);
  expect(game.player2.cards).toHaveLength(26);
});
```

For reference check out Jest [expect docs](https://jestjs.io/docs/en/expect).

Since this test fails, lets create an implementation for this. Now this is where we can really take small steps in getting this code to just work. Basically the `Game` class can have to members `player1` & `player2` and they can have `cards` members...no need to actually create a deck and deal cards. If we make our test a little more stricter by checking the first card of player1 is not equal to player2 (each card is unique in a deck), then we would have to get a deck going...so lets do that. Lets make the test more through. Add the following line:

```
expect(game.player1.cards[0]).not.toEqual(game.player2.cards[0]);
```

To make this test pass we need to add a `Deck` package and we need to deal to both players. Lets do that now.

```
yarn add deckjs
```

I think you will have to stop the tests whenever you add/remove packages.

Add the following initialization code to `Game`:

```
  constructor() {
    this.player1 = {
      cards: []
    }
    this.player2 = {
      cards: []
    }
  }
```

Then lets add the import for `Deck`:

```
import {Deck} from 'deckjs';
```

Lets finally use the deck...add the following to the end of the constructor:

```
    this.deck = new Deck(1);
    this.deck.shuffle();
    for(let i = 0; i < 26; i++) {
      this.player1.cards.push(this.deck.getCard());
    }
    for(let i = 0; i < 26; i++) {
      this.player2.cards.push(this.deck.getCard());
    }
```

Now your tests should pass:)

Of course this isn't the best way to write the code. We are exposing the members of the `Game` class and the internal implementation. We will do some refactoring later on.

Next, lets write a test to actually play a hand.
What we are going to need is a way to manipulate each players hand. So basically after the cards are dealt, we need to exchange cards into an order where we can control how the cards come out. This way we can test all the possible combinations.
This will be easy for us. Since the `Game` class has exposed the player and cards
we will just modify those directly (still not the best way for this happen, but we will refactor!).
Lets try the following:

```
it('play game: player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = [new Card(Rank.Ace, Suit.Club), new Card(Rank.King, Suit.Club)];
  game.player2.cards = [new Card(Rank.King, Suit.Spade), new Card(Rank.Queen, Suit.Spade)];
  const handResult = game.play();
  expect(handResult.result).toBe(game.Player1Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('ac');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  expect(game.player1.cards).toHaveLength(3);
  expect(game.player2.cards).toHaveLength(1);
});
```

So this test shows quite a bit. We need to return from the `play` method some information: the result of the hand, player 1's cards, player 2's cards. Also we check the players in the game. Since player1 won, player 1 will take the 2 cards. Lets write code to make sure this can be returned.

```
 play() {
    const card1 = this.player1.cards.shift();
    const card2 = this.player2.cards.shift();
    if (this.compareCards(card1, card2) === 1) {
      this.player1.cards.push(card1);
      this.player1.cards.push(card2);
      return {
        result: GameResult.Player1Wins,
        player1Cards: [card1],
        player2Cards: [card2],
      };
    }
}
```

Here is `compareCards`:

```
compareCards(card1, card2) {
    if (card1.getValue() > card2.getValue()) {
      return 1;
    } else if (card1.getValue() < card2.getValue()) {
      return -1;
    }
    return 0;
  }
```

Since javascript doesn't have an official way create `enums` we will
just create a class called `GameResult` and place this code in there:

```
export default class GameResult {
  Player1Wins = 'Player1Wins';
  Player2Wins = 'Player2Wins';
  PlayerTie = 'PlayerTie';
  Player1GameWin = 'Player1GameWin';
  Player2GameWin = 'Player2GameWin';
}
```

and place `import GameResult from './GameResult';` at the end of the imports.

Lets write a test for the opposite case...player 2 wins:

Write the test first:

```
it('play game: player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = [new Card(Rank.King, Suit.Club), new Card(Rank.King, Suit.Club)];
  game.player2.cards = [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Queen, Suit.Spade)];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.Player2Wins);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('as');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(3);
});
```

this will fail:)
Now lets make this test pass:

```
 else if (this.compareCards(card1, card2) === -1) {
      this.player2.cards.push(card1);
      this.player2.cards.push(card2);
      return {
        result: GameResult.Player2Wins,
        player1Cards: [card1],
        player2Cards: [card2],
      };
```

Now lets do an interesting test case. What happens when a tie happens.
Well..we should get the tie result and `player1Cards` and `player2Cards` should return 1 card: the tie card. A second part of
this test would be to call `play` again and it should return 4 cards for each player1 and player2. So do we do that in one test? We could
break that up in two but that seems redundant.

```
it('play game: tie game, player 1 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Six, Suit.Club),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Spade),
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade),
    new Card(Rank.Seven, Suit.Spade),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('kc');
  expect(handResult.player2Cards[0].toShortString()).toBe('ks');
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player1Wins);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('ac');
  expect(handResult2.player2Cards[3].toShortString()).toBe('qs');
});
```

lets add the following to the `Game` class:

```
else {
       return {
        result: GameResult.PlayerTie,
        player1Cards: [card1],
        player2Cards: [card2],
      }
    }
```

Ok, so that will pass the first part of the test, but what happens
when we call `play` again. The `Game` class needs to know that the game is tied. We need to keep some state, so lets add a variable to the `constructor`: `this.gameTied = false;` and in the else part lets
do this: `this.gameTied = true;` and lets add this to the beginning if the play function:

```
if (this.gameTied) {

}
```

This first thing we need to do is to get 3 cards from player 1 and player 2:

```
   if (this.gameTied) {
      const player1HiddenCards = [];
      const player2HiddenCards = [];
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
    }
```

After that is strangely convenient but it seems the rest of the function can proceed as is....except for the face that we need
to return the hidden cards. Lets move the hidden cards declaration out of the if statement because we will need to reference it later:

```
  const player1HiddenCards = [];
    const player2HiddenCards = [];
    if (this.gameTied) {
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player1HiddenCards.push(this.player1.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
      player2HiddenCards.push(this.player2.cards.shift());
    }
```

And we need to make sure we unset the `gameTied` state...so add this to to the end of the `if` statement: `this.gameTied = false;`.
What is an easy way to return all the cards? Lets use the `concat` method `Array`.
Replace everywhere you see:

```
  player1Cards: [card1],
  player2Cards: [card2],
```

with

```
  player1Cards: player1HiddenCards.concat([card1]),
  player2Cards: player2HiddenCards.concat([card2]),
```

Also since player1 wins, we need to give player 1 all of the hidden cards: `this.player1.cards.push(...player1HiddenCards, ...player2HiddenCards);`

So look at our test, I do something missing. We are not checking
the length of each of the players cards. We should add that in:

Right after:

```
  expect(handResult.result).toBe(GameResult.PlayerTie);
```

add the following:

```
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
```

This should work since we `shift`'ed the card out of each players hand.
What should the length of both players cards be after the 2nd play?

```
  expect(game.player1.cards).toHaveLength(11);
  expect(game.player2.cards).toHaveLength(1);
```

And put that code after the 2nd call to `play`.
Run the tests...
What happened? We failed.

```
play game: tie game, player 1 wins hand

    expect(received).toHaveLength(expected)

    Expected length: 11
    Received length: 9
    Received array: ...
```

What happened? We didn't keep track of the tied hands. We need to keep that state. Lets set up a couple arrays because think about what
happens when we have multiple ties.
Add the following to the constructor:

```
  this.player1TiedCards = [];
  this.player2TiedCards = [];
```

So after the tie is resolved, we need to add these tied cards to the victors hand. First lets add the tied cards when the result is tied:

```
  this.player1TiedCards.push(card1);
  this.player2TiedCards.push(card2);
```

Then modify this line:

```
  this.player1.cards.push(
    ...player1HiddenCards,
    ...player2HiddenCards,
  );
```

to:

```
  this.player1.cards.push(
    ...player1HiddenCards,
    ...player2HiddenCards,
    ...this.player1TiedCards,
    ...this.player2TiedCards
  );
```

Also right after that code, lets reset those variables because we are not tied anymore:

```
  this.player1TiedCards = [];
  this.player2TiedCards = [];
```

The tests should pass now.

Doing the mirror image test for player 2 is important too.
test...which is kind of easy. I would copy the previous test and make the changes..see the following:

```

it('play game: tie game, player 2 wins hand', () => {
  const game = new Game();
  game.player1.cards = [
    new Card(Rank.King, Suit.Spade),
    new Card(Rank.Three, Suit.Spade),
    new Card(Rank.Five, Suit.Spade),
    new Card(Rank.Four, Suit.Spade),
    new Card(Rank.Queen, Suit.Spade),
    new Card(Rank.Seven, Suit.Spade),
  ];
  game.player2.cards = [
    new Card(Rank.King, Suit.Club),
    new Card(Rank.Three, Suit.Club),
    new Card(Rank.Four, Suit.Club),
    new Card(Rank.Five, Suit.Club),
    new Card(Rank.Ace, Suit.Club),
    new Card(Rank.Six, Suit.Club),
  ];
  const handResult = game.play();
  expect(handResult.result).toBe(GameResult.PlayerTie);
  expect(handResult.player1Cards[0].toShortString()).toBe('ks');
  expect(handResult.player2Cards[0].toShortString()).toBe('kc');
  expect(game.player1.cards).toHaveLength(5);
  expect(game.player2.cards).toHaveLength(5);
  const handResult2 = game.play();
  expect(handResult2.result).toBe(GameResult.Player2Wins);
  expect(handResult2.player1Cards).toHaveLength(4);
  expect(handResult2.player2Cards).toHaveLength(4);
  expect(handResult2.player1Cards[3].toShortString()).toBe('qs');
  expect(handResult2.player2Cards[3].toShortString()).toBe('ac');
  expect(game.player1.cards).toHaveLength(1);
  expect(game.player2.cards).toHaveLength(11);
});
```

This will fail, so make the appropriate changes to the code:

```
  this.player2.cards.push(
    ...player1HiddenCards,
    ...player2HiddenCards,
    ...this.player1TiedCards,
    ...this.player2TiedCards
  );
  this.player1TiedCards = [];
  this.player2TiedCards = [];
```

We won't be covering every case, I'll leave that to the reader.

### Exercises

1. What happens when there are multiple ties? Does the code work? Write a test for player 1 and then get that to work, then write the test for player 2.
2. How about when there is a tie and one player doesn't have enough cards? Write that test.
3. Write tests for game winning situations.
4. Are there any other edge cases?
5. When there is a tie, we always put the cards in the victor's deck in an ordered way. Should we randomize that?

### Next Part

1. We will go over the exercises and check out test coverage.
2. Refactoring.

You see the code for this part in the repo by running the following command: `git checkout part1`