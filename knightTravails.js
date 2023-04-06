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
      /* //add all legal Knight moves as edges to the vertices
      genLegalMoves (x = 0, y = 0, board = this.chessBoard) {
        //let board = this.chessBoard
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
          if (board.has(JSON.stringify(edge))) {
            let key = JSON.stringify([x, y])
            board.get(key).push(JSON.stringify(edge))
          }
        }
        return board
      } */
    addEdges(board = this.chessBoard){
      for (let [ coord ] of board) {
        const coordArr = JSON.parse(coord)
        const x = parseInt(coordArr[0])
        const y = parseInt(coordArr[1])
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
      queue.push({node: JSON.stringify(startNode), dist: 0})
      visited.add(JSON.stringify(startNode))
/*         console.log('queue: ')
        console.log(queue) */
      while(queue.length>0){
        const {node, dist} = queue.shift()
/*         console.log('first element dequeued: ')
        console.log({node, dist})
        console.log('new queue: ')
        console.log(queue) */
        if (node === JSON.stringify(stopNode)) {
          console.log(`Shortest Number of paths: ${dist}`)
          console.log('See Nodes traversed, below')
          this.printPath(previous, startNode, stopNode)
          return  {shortestDistance: dist, previous}
        }
        for (let neighbor of this.chessBoard.get((node))) {
          //neighbor = JSON.parse(neighbor)
          if (!visited.has(neighbor)) {
            previous.set(neighbor, node)
            queue.push({ node: neighbor, dist: dist + 1 })
            visited.add(neighbor)
            
          }
        }
      }
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
  //console.log(typeof graph.chessBoard.get(JSON.stringify([2,3])))
  //console.log(graph.genLegalMoves(2,3))
  //console.log(graph.genLegalMoves(0,2))
  
  //console.log(graph.chessBoard)
  let {shortestDistance, previous} = graph.knightMoves([4,3],[4,4])
  //console.log(`shortestdist: ${shortestDistance}`)
  //console.log(graph.knightMoves([2,3],[3,0]).previous)
  //graph.printPath(graph.knightMoves([2,3],[3,0]).previous,[2,3],[3,0])

 /*  let x = 1
  let y = 1
  console.log(JSON.parse(`[${x},${y}]`)) */
  /* let pracQueue = new Map()
  pracQueue.set('node', [2,3])
  console.log(pracQueue)
  console.log(pracQueue.has([2,3])) */
  
