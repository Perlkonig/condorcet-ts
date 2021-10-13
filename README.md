# Condorcet Library

A TypeScript library that implements various Condorcet voting algorithms.

[Hosted by GitHub](https://github.com/Perlkonig/condorcet-ts)

## Ballots

The library exports a `Ballot` type, which is a `Map` of a key (which must be a `string` or a `number`, and which is also typed as `Candidate`) and a value (which must be a number). All the algorithms use this ballot. Typically, the magnitude of the ranks is irrelevant. All that matters is their sequence. For example, you could rank your first choice as `100` as long as your next choice was something like `110` and so on down the line. But this might differ by algorithm. Traditionally you indicate your first choice with a `1` and go from there. You do *not* need to vote for all candidates. Skipping a candidate simply means they're at the very bottom of your list.

Here's an example of a ballot ranking five candidates in the order ACBED:

```ts
const b: Ballot = new Map([
    ["A", 1],
    ["C", 2],
    ["B", 3],
    ["E", 4],
    ["D", 5]
]) as Ballot;
```

## Available Algorithms

For all algorithms, the constructor takes the list of candidates, after which you can use the `addBallot` method. You can then call the `rank` method to get a list of candidates in order, winner first.

### Schulze

A description of the method can be found on [Wikipedia](https://en.wikipedia.org/wiki/Schulze_method).

```ts
import { Candidate, Ballot, Schulze } from "condorcet";

const candidates: Set<Candidate> = new Set(["A", "B", "C", "D", "E"]);

//Build the ballot
const b: Ballot = new Map([
    ["A", 1],
    ["C", 2],
    ["B", 3],
    ["E", 4],
    ["D", 5]

]);

//Construct the Schulze object with the list of candidates
const s = new Schulze(candidates);

//Assume 50 people all voted the same way
s.addBallot(b, 50);

//Get the rankings
ranked: Candidate[] = s.rank();

//Because everybody voted unanimously, you should get the array ['A', 'C', 'B', 'E', 'D'].
//See the tests for more examples.
```

### Ranked Pairs

A description of the method can be found on [Wikipedia](https://en.wikipedia.org/wiki/Ranked_pairs).

```ts
import { Candidate, Ballot, Schulze } from "condorcet";

const candidates: Set<Candidate> = new Set(["Memphis", "Nashville", "Chattanooga", "Knoxville"]);

const b: Ballot = new Map([
    ["Chattanooga", 1],
    ["Knoxville", 2],
    ["Nashville", 3],
    ["Memphis", 4]
]);

const s = new RankedPair(candidates);
s.AddBallot(b1, 42);
const ranked: Candidate[] = s.rank();

//Because everybody voted unanimously, you should get the array ["Chattanooga", "Knoxville", "Nashville", "Memphis"].
//See the tests for more examples.
```

## TODO

* I'm an amateur programmer. Any suggestions to improve efficiency or readability would be warmly welcomed.
* I'm always looking for more test cases. I need to add code for ties.
