import { Graph } from './graph.mjs';

function knightMoves(start, end) {
  const { moves, result } = new Graph().buildPath(start, end);
  console.log(`Knight travails from [${start}] to [${end}]`);
  console.log(`=> You made it in ${moves} moves! Here's your path:`);
  for (let i = 0; i < result.length; i++) {
    console.log(`  [${result[i]}]`);
  }
}

knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
