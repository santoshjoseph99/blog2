---
title: "Testing #2 Tic-Tac-Toe"
date: "2024-03-10"
description: "tic tac toe"
---

![Testing](./testing-button.jpeg "testing image")

## End-To-End Testing (e2e testing)

We need to test more like how an user will use our game.

Lets take a look at a library called playwright to help us out with that.

### Install
`npm init playwright@latest`

Just answer the questions with the defaults.

and lets run the example tests: `npx playwright test`

### Write first test
Create a file called `tictactoe.spec.ts` in the e2e directory.

Add the following:
```
import {test, expect} from '@playwright/test';

test('player 1 wins', async ({page}) => {
  await page.goto('http://localhost:5173');

  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-2"]');

  const locator = page.locator('[data-testid="message"]');
  await expect(locator).toContainText('Player 1 Wins!');
});
```
for this to work add a testid to the message div: `data-testid="message"`

Exercise: Write the following 2 tests:
1. player 2 wins
2. tie game

<summary>Answer</summary>
<pre>
<code>
test('player 2 wins', async ({page}) => {
  await page.goto('http://localhost:5173');

  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-6"]');
  await page.click('[data-testid="cell-5"]');

  const locator = page.locator('[data-testid="message"]');
  await expect(locator).toContainText('Player 2 Wins!');
});

test('game tied', async ({page}) => {
  await page.goto('http://localhost:5173');

  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-2"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-5"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-6"]');
  await page.click('[data-testid="cell-8"]');
  await page.click('[data-testid="cell-7"]');

  const locator = page.locator('[data-testid="message"]');
  await expect(locator).toContainText('Game Tied');
});
</code>
</pre>

You can delete the example file.  

# After thoughts
Anyways, so this is a good way to check if the code works if we
make some changes.  But notice if we make visual changes or structural 
changes then these tests will have to change.

There is a lot of talk about e2e testing and how much should be included
in the overall testing plan.  Usually e2e are a bit brittle and sometimes
flaky.  

# Next
Out app is not really done. Using `getByTestId` is not the ideal for testing
the web page.  We use it on all our tests.  What we need to do use `getByRole`. This
method is the way the browsers and screen readers navigate the page.
Lets change our tests and code to make the page more accessible.

# Bonus
1. Write an e2e for the Reset button


