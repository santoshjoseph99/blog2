---
title: "Tutorial: Game of War, Part 4"
date: "2021-04-18"
description: "With React Native"
---

## Exercise Results

- How to create an npm package? You can follow some articles like [this](https://bugfender.com/blog/how-to-create-an-npm-package/), [this](https://medium.com/swlh/how-to-create-and-publish-an-npm-package-17b5e1744f26) or at the [npm site](https://docs.npmjs.com/creating-and-publishing-private-packages).
  Basically you need to follow these steps:

  - Create an account at https://www.npmjs.com
  - Create a github repo for the code
  - `npm init`
  - make some modifications to the `package.json`
  - `npm publish`

- Show a random card when clicking the `Change Image` button:
  This is a hack (meaning no error checking).
  `import {Deck} from 'deckjs';`
  and add the deck initialization before the `Card` function.

```
const deck = new Deck(1);
deck.shuffle();
```

and add `deck.getCard().toShortString()` inside of the `cardMap.get(` calls.
That should do the trick...its not the right way, but you get the idea.

## State Management

For any moderately complex software program we need to keep the state of the program in such a way that it is easy to update and receive updates. For this program our is basically the deck and each players cards. There are software libraries
that can help out with this especially with `React`. We won't
be using these for this project (but definitely the next).

- [Redux](https://redux.js.org/)
- [MobX](https://mobx.js.org/README.html)

We can also use `React`'s [context API](https://reactjs.org/docs/context.html) which there are some drawbacks especially considering the reusability of components.

Another possibility `React` [state](https://reactjs.org/docs/state-and-lifecycle.html).

What we do is a little bit more modern for `React` development. We will use [React Hooks](https://reactjs.org/docs/hooks-intro.html). One of the reason we will hooks is because we don't have any class components. All our React components are functions. Our `WarGame` class will create the state objects and pass those to our subcomponents as props.
Lets add some code...

## More UI

Lets open `Card.js`. What we will do is pass in the `Card` object. So basically what is returned from the `cardMap`. The main reason we do this is because the `Card` component doesn't need to where the card is coming from or the deck class. The `Card.js` file should like this:

```
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 166,
    height: 158,
    resizeMode: 'contain',
  },
});


const Card = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.cardImage} style={styles.image} />
    </View>
  );
};

export default Card;
```

Lets open `CurrentCards.js`. We are going to add a couple `Card` components here.

```
const CurrentCards = () => {
  return (
    <View>
      <Card />
      <Card />
    </View>
  );
};
```

And this component will also take some props. It will need to pass in the cards to the individual card components.

```
const CurrentCards = ({player1Card, player2Card}) => {
  return (
    <View>
      <Card cardImage={player1Card} />
      <Card cardImage={player2Card} />
    </View>
  );
};
```

So these 2 components are more like "dumb" components. They are giving arguments to present.
The `WarGame` module will set up the cards and handle actions from the user. The React `useEffect` hook will be called once when the component is set up so we will use for initialization.

```
  React.useEffect(() => {
    deck.shuffle();
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  }, []);
```

And don't forget the empty array argument for `useEffect`, if that is left out basically it will called every time.
We will have a play `Button` which when clicked will get 2 new cards and assign them, so basically what the `useEffect` does but without the `shuffle`:

```
const play = () => {
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
}
```

So try it now...

```
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import CurrentCards from './CurrentCards';
import HandResult from './HandResult';
import PlayerScore from './PlayerScore';
import {Deck} from 'deckjs';
import cardMap from './Cards';

const deck = new Deck(1);

export default function WarGame() {
  const [player1Card, setPlayer1Card] = React.useState();
  const [player2Card, setPlayer2Card] = React.useState();

  const play = () => {
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  };
  React.useEffect(() => {
    deck.shuffle();
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  }, []);
  return (
    <View style={styles.container}>
      {player1Card && player2Card && (
        <CurrentCards
          player1Card={cardMap.get(player1Card.toShortString())}
          player2Card={cardMap.get(player2Card.toShortString())}
        />
      )}
      <HandResult />
      <PlayerScore />
      <Button title="Play" onPress={play} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Lets finish up the rest of the code for this part through with some exercises...and we cover tests in the next post.

## Exercises

1. Refactor the `WarGame` so that the `play1 code is not duplicated.
2. How to check when the deck is empty?
3. The cards are on top of each other...can you modify the CSS to make the cards are show side by side in `CurrentCards`.
