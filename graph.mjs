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

        // clear the adjacency on each move
        this.arr = [];
        // store the validMoves to adjacency list
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
    // adjacency list for visited nodes
    const visited = [];
    let current = [];
    visited[start[0]] = [start[1]];
    const board = new Graph();
    // Start building what to push to the PATH array
    // manually build start
    let pathEntry = [];
    pathEntry.push(board.buildGraph(start));
    path.push(pathEntry);

    
    // grab the next paths from the PATH array

    while (true) { // testing loop
        pathEntry = [];
        const entry = path[path.length - 1];
        for (const item of entry) {
            let i = 0;
            for (const coord of item[1]) {
                if (coord != null) {
                    for (let j = 0; j < coord.length; j++) {
                        current = [i, coord[j]];

                        // only visit non-visited nodes
                        if (!visited[current[0]] || !visited[current[0]].includes(current[1])) {
                            pathEntry.push(board.buildGraph(current));
                            (!visited[current[0]]) ? visited[current[0]] = [current[1]] : visited[current[0]].push(current[1]);
                        }
                        // check if we found the end
                        if (current[0] === end[0] && current[1] === end[1]) {
                            const { steps, final } = getPath(path, end);
                            console.log(`=> You made it in ${steps} moves! Here's your path:`);
                            for (let i = 0; i < final.length; i++) {
                                console.log(`  [${final[i]}]`);
                            }
                            return;
                        }
                    }
                }
                i++;
            }
        }
        path.push(pathEntry);
    }
}

function getPath(pathArray, end) {
    const result = [];
    result.push(end);
    let current = end.slice();
    for (let i = pathArray.length - 1; i >= 0; i--) {
        const path = pathArray[i];
        for (const item of path) {
            if (item[1][current[0]] && item[1][current[0]].includes(current[1])) {
                result.push(item[0]);
                current = item[0];
            }
        }
    }

    return { steps: result.length - 1, final: result.reverse() };
}

// helper function to visualize path array
function printPath(arr) {
    console.log('Printing PATH');
    let index = 0;
    for (const entry of arr) {
        console.log(`==================PATH Index: ${index}==================`);
        let i = 0;
        for (const item of entry) {
            console.log(`--PATH Entry index: ${i}`);
            console.log(`----Origin coord: ${item[0]}`);
            console.log(`----Adjacency Array:`);
            console.log(item[1]);
            i++;
        }
        index++;
    }
}


knightMoves([3, 3], [4, 3]);

// const { steps, path } = knightMoves([3, 3], [4, 3]);
// console.log(`=> You made it in ${steps} moves! Here's your path:`);
// for (let i = 0; i < path.length; i++) {
//     console.log(`  [${path[i]}]`);
// }