function pathFinder(maze) {
  const arrOfmaze = maze.split('\n')
  const size = arrOfmaze.length
  //hash table for already visited points
  const visited = {}
  for (let i = 0; i < size; i++) {
    visited[i] = Array(size)
  }
  //end at 0,0 for simplicity
  const end = [size - 1, size - 1]
  //the queue of potential paths
  const queue = [end]

  return move(queue, visited, arrOfmaze, size)
}

function move (queue, visited, arrOfmaze, size) {
  //sort by Fscore to always start with the closest path
  if (queue.length > 2 ) {
   queue.sort((a, b) => a[2] - b[2])
  }

  const point = queue.shift()
  //add the new point to the visited table
  visited[point[0]][point[1]] = true

  const neighbors = findNeighbors(point)

  for (let i = 0; i < 4; i++) { //check for goal and return if found
    let row = neighbors[i][0]
    let col = neighbors[i][1]

    //base case= we found it
    if (row === 0 && col === 0) return true

      //is it off the map?
    if (row < 0 || row >= size || col < 0 || col >= size) continue
    //is it a wall?
    if (arrOfmaze[row][col] === 'W') continue
    //have we already been there?
    if (visited[row][col]) continue
    //potential path- add to the queue
      neighbors[i][2] = getFscore(neighbors[i])
      queue.push(neighbors[i])
  }
  if (!queue.length) return false
  return move(queue, visited, arrOfmaze, size)
}

//returns distance to the goal
function getFscore (point) {
  return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
}

function findNeighbors(point) {
  let up = [point[0] - 1, point[1]]
  let right = [point[0], point[1] + 1]
  let left = [point[0], point[1] - 1]
  let down = [point[0] + 1, point[1]]
  return [up, left, right, down]
}

