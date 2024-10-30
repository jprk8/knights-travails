export { Graph };

class Graph {
  constructor() {
    this.arr = [];
  }

  // returns adjacency list based on the knight's current position
  buildGraph(pos) {
    const x = pos[0];
    const y = pos[1];
    const moves = [];
    moves.push([x - 2, y + 1]);
    moves.push([x - 2, y - 1]);
    moves.push([x + 2, y + 1]);
    moves.push([x + 2, y - 1]);
    moves.push([x - 1, y + 2]);
    moves.push([x - 1, y - 2]);
    moves.push([x + 1, y + 2]);
    moves.push([x + 1, y - 2]);
    const validMoves = moves.filter(
      (pos) => pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7
    );

    this.arr = [];
    // convert edge list to adjacency list
    for (const pos of validMoves) {
      !this.arr[pos[0]]
        ? (this.arr[pos[0]] = [pos[1]])
        : this.arr[pos[0]].push(pos[1]);
    }

    // return current position and its adjacency list
    return [pos, this.arr];
  }

  buildPath(start, end) {
    const path = [];
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
    while (true) {
      pathEntry = [];
      const entry = path[path.length - 1];
      for (const item of entry) {
        let i = 0;
        for (const coord of item[1]) {
          if (coord != null) {
            for (let j = 0; j < coord.length; j++) {
              current = [i, coord[j]];
              // only visit non-visited nodes
              if (
                !visited[current[0]] ||
                !visited[current[0]].includes(current[1])
              ) {
                pathEntry.push(board.buildGraph(current));
                !visited[current[0]]
                  ? (visited[current[0]] = [current[1]])
                  : visited[current[0]].push(current[1]);
              }
              // stop and return when reaching end
              if (current[0] === end[0] && current[1] === end[1]) {
                const { moves, result } = this.getPath(path, end);
                return { moves, result };
              }
            }
          }
          i++;
        }
      }
      path.push(pathEntry);
    }
  }

  getPath(pathArray, end) {
    const resultArray = [];
    resultArray.push(end);
    let current = end.slice();
    for (let i = pathArray.length - 1; i >= 0; i--) {
      const path = pathArray[i];
      for (const item of path) {
        if (item[1][current[0]] && item[1][current[0]].includes(current[1])) {
          resultArray.push(item[0]);
          current = item[0];
        }
      }
    }

    return { moves: resultArray.length - 1, result: resultArray.reverse() };
  }

  // helper function to visualize path array
  printPath(arr) {
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
}
