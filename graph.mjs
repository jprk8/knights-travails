// use adjacency list

class Graph {
    constructor() {
        // this array will contain adjacency list
        this.arr = [];
    }

    // returns adjacency list based on the knight's current position
    buildGraph(pos) {
        // knight's current position
        const x = pos[0];
        const y = pos[1];
        // build an array with possible moves (up to 8)
        // first build a list of all moves (whether they are possible or not)
        const moves = [];
        moves.push([x - 2, y + 1]);
        moves.push([x - 2, y - 1]);
        moves.push([x + 2, y + 1]);
        moves.push([x + 2, y - 1]);
        moves.push([x - 1, y + 2]);
        moves.push([x - 1, y - 2]);
        moves.push([x + 1, y + 2]);
        moves.push([x + 1, y - 2]);
        // filter only valid moves
        const validMoves = moves.filter((pos) => pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7);
        // console.log(validMoves);
        // store the validMoves to adjacency list
        // clear the adjacency on each move
        this.arr = [];
        for (const pos of validMoves) {
            (!this.arr[pos[0]]) ? this.arr[pos[0]] = [pos[1]] : this.arr[pos[0]].push(pos[1])
        }
        // return current position and possible moves from it
        return [pos, this.arr];
    }

    // for each item in the adjacency list, build another adjacency list for them


}

function knightMoves(start, end) {
    const path = [];
    const queue = [];
    queue.push(start);
    const board = new Graph();
    // Start building what to push to the PATH array
    let pathEntry = [];
    // nextPath contains the adjacency list
    pathEntry.push(board.buildGraph(start));
    path.push(pathEntry);

    pathEntry = [];
    let i = 0;
    // grab the next paths from the PATH array
    // will not work for path with multiple entries..for of again?
    const entry = path[path.length - 1];
    console.log(entry);
    for (const item of entry) {
        for (const coord of item[1]) {
            if (coord != null) {
                for (let j = 0; j < coord.length; j++) {
                    const current = [i, coord[j]];
                    pathEntry.push(new Graph().buildGraph(current));
                }
            }
            i++;
        }
    }

    path.push(pathEntry);


    return path;

    // let pos = start;
    // let i = 0;

    // while (pos[0] != end[0] && pos[1] != end[1]) {
    //     path.push(pos);
    //     path.push(board.buildGraph(pos));
    // }
    //return path;
}

// NOTE: make PATH object(array) with 3 entries (previous position, possible next positions, total distance)
// e.g. [3, 3], 
// [
//   <1 empty item>,
//   [ 4, 2 ],
//   [ 5, 1 ],
//   <1 empty item>,
//   [ 5, 1 ],
//   [ 4, 2 ]
// ]

const test = new Graph();
//console.log(test.buildGraph([2, 1]));
const result = knightMoves([0, 0], [1, 2]);
console.log(result);
console.log(JSON.stringify(result));

// const arr1 = [1, 1];
// const arr2 = [1, 1];
// if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) {
//     console.log('true');
// }