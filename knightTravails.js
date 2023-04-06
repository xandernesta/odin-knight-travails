export const knightGraph = () => {
    return {
      //Map is an obj w/ key-value pairs that can hold the vertex as a key and values will be an array of agjacent nodes
      chessBoard: new Map(),
  
      //defining vertex array and Adjancency list
      /* This method will create our vertices, For this problem we use a standard 8x8 chessboard */
      genBoard (size = 8) {
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            //here we set the Map's keys with an empty array for their corresponding values
            this.chessBoard.set(JSON.stringify([x, y]), [])
          }
        }
      },
    addEdges(board = this.chessBoard){
      for (let [ coord ] of board) {
        const coordArr = JSON.parse(coord)
        const x = parseInt(coordArr[0])
        const y = parseInt(coordArr[1])
        //an array of all the possible moves the Knight could make from a given chess square
        const moveOffsets = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1]
        ]
        for (let i of moveOffsets) {
          let newX = x + parseInt(i[0])
          let newY = y + parseInt(i[1])
          let edge = [newX,newY]
          let stringEdge = JSON.stringify((edge))
          //check that the edge to the next node is within the board bound AND if the current coordinate doesnt currently map to the new edge, then push the edge onto the array that maps to that coord
          if (board.has(stringEdge) && !board.get(coord).includes(stringEdge)) {
            this.chessBoard.get(coord).push(stringEdge);
          }
        }
      }
    },
      //find the shortest path for the Knight to move given start and end
      knightMoves(startNode, stopNode){
      //https://www.geeksforgeeks.org/shortest-path-unweighted-graph/
      //https://betterprogramming.pub/5-ways-to-find-the-shortest-path-in-a-graph-88cfefd0030f
      const previous = new Map()
      const queue = []
      const  visited = new Set()
      //create a queue to hold objects of the strings of the nodes and their distance or level of travel from the start node
      queue.push({node: JSON.stringify(startNode), dist: 0})
      //add to a Set of nodes to track which nodes we've visited
      visited.add(JSON.stringify(startNode))
      //while loop to go through queue
      while(queue.length>0){
        //dequeue node
        const {node, dist} = queue.shift()
        //check our base case to see if we found our path
        if (node === JSON.stringify(stopNode)) {
          console.log(`Shortest Number of paths: ${dist}`)
          console.log('See array of Nodes traversed below:')
          this.printPath(previous, startNode, stopNode)
          //returns the distance and Map of previously visited nodes so we could do something with them beside call printPath if we want
          return  {shortestDistance: dist, previous}
        }
        //if our basecase is not reach go through all neighbors of our current node
        for (let neighbor of this.chessBoard.get((node))) {
          //if the neighbor is not already in the visited Set then add the neighbor and the current node to the previous Map, push it onto the queue to traverse with an iterated dist, and finially add to the visited Set
          if (!visited.has(neighbor)) {
            previous.set(neighbor, node)
            queue.push({ node: neighbor, dist: dist + 1 })
            visited.add(neighbor)
          }
        }
      }
      //return -1 distance if shortestpath can't be found
      return {shortestDistance: -1, previous}
      },
      printPath (previous, startNode, stopNode) {
        let currentNode = JSON.stringify(stopNode)
        let paths = []
        paths.unshift(currentNode)
        while (currentNode !== JSON.stringify(startNode)) {
          currentNode = previous.get(currentNode)
          paths.unshift(currentNode)
        }
        console.log(paths)
      },
    }
  }
  
  //testing
  const graph = knightGraph()
  graph.genBoard()
  graph.addEdges()
  let {shortestDistance, previous} = graph.knightMoves([7,7],[1,0])
  //console.log(typeof graph.chessBoard.get(JSON.stringify([2,3])))
  //console.log(graph.genLegalMoves(2,3))
  //console.log(graph.genLegalMoves(0,2))
  //console.log(graph.chessBoard
  //console.log(`shortestdist: ${shortestDistance}`)
  //console.log(graph.knightMoves([2,3],[3,0]).previous)

  
