title: "Tutorial: Game of War, Part 5"
date: "2022-01-28"
description: "With React Native"

---

## Exercise Results

1. Refactoring

```
 const play = () => {
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    setPlayer1Card(card1);
    setPlayer2Card(card2);
  };
  React.useEffect(() => {
    deck.shuffle();
    play();
  }, []);
```

2. Check for empty deck
   What you need to do is to check if `deck.getCard()` returns null and then return
   an appropriate view that doesn't show any cards.

3. CSS changes for `CurrentCards`
   Add the `StyleSheet` from `react-native`. And then like other components like `WarGame`, create the styles.

```
  const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

`flexDirection` is the important concept to understand for this case.

and
`<View style={styles.container}>`

## Testing

Create the following files in the `__tests__/components` directory: `Card.js`, `CurrentCards.js`, `HandResult.js`, and `PlayerScore.js`. We would like to write the tests first in TDD, but we ended up writing basic skeletons and now we can get down & dirty with some [Red, Green & Refactor](https://www.codecademy.com/articles/tdd-red-green-refactor).
Lets go from the bottom to the top.

Lets start with the test with `Card.js`:

```
it('renders correctly', () => {
  renderer.create(<Card cardImage={cardMap.get('ac')} />);
});
```

`CurrentCards.js` is very similar:

```
it('renders correctly', () => {
  renderer.create(<CurrentCards player1Card={cardMap.get('ac')} player2Card={cardMap.get('as')} />);
});
```

`HandResult.js`
So hand result will display in text from which player won the hand and how many cards that player won: `Result: player 2 wins 2 cards` or it can display if the hand is a tie or if a player won the game.

Lets start with the minimum:

```
it('renders correctly', () => {
  renderer.create(<HandResult />);
});
```

## More Components

## Exercises
