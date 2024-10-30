# Knights Travails

This project applies __graph data structure__ to find the shortest path between two squares for a knight on a chessboard.

## Documentation

- `knightMoves([0,0], [3,3])` function finds the shortest path from `[0,0]` to `[3,3]` and prints all squares visited along the way.
- `Graph` class contains the 8x8 chessboard and functions to build adjacency list and the shortest path.
- Algorithm for finding the shortest path uses the concept of __breadth-first-search__.
  - `buildPath(start, end)` will build adjacency list representing squares reachable by 1 move.
  <br> The squares from this adjacency list will act as the starting point for the next group of adjacency lists.
  <br> Each group of adjacency lists represents 1 additional move.


<br />

Sample Output
```console

Knight travails from [3,3] to [4,3]
=> You made it in 3 moves! Here's your path:
  [3,3]
  [1,4]
  [2,2]
  [4,3]
Knight travails from [0,0] to [3,3]
=> You made it in 2 moves! Here's your path:
  [0,0]
  [1,2]
  [3,3]
Knight travails from [3,3] to [0,0]
=> You made it in 2 moves! Here's your path:
  [3,3]
  [1,2]
  [0,0]
Knight travails from [0,0] to [7,7]
=> You made it in 6 moves! Here's your path:
  [0,0]
  [1,2]
  [0,4]
  [1,6]
  [3,7]
  [5,6]
  [7,7]

```