# MyRepo
Test repo for learning

## Number Guessing Game

Open `index.html` in a browser to play. Guess the randomly selected number
between 1 and 100. The game tells you whether each guess is too high or too low
and tracks the number of attempts. It also narrows the remaining range and
shows an optimal binary-search guess.

### Rules

- Enter a whole number from 1 through 100.
- A too-low result means the secret number is higher.
- A too-high result means the secret number is lower.
- Repeated guesses do not count as new attempts.
- Keep guessing until the exact number is found.

### Fastest strategy

Guess the middle of the remaining range. Starting with 50 leaves only 50
possibilities; each later answer halves the remaining range. At most seven
guesses are needed.
