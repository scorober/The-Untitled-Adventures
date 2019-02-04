export default class AStarPathfind {
    constructor(world, pathStart, pathEnd) {
        this.world = world
        this.pathStart = pathStart
        this.pathEnd = pathEnd

        this.worldWidth = world[0].length
        this.worldHeight = world[1].length
        this.worldSize = this.worldWidth * this.worldHeight

        this.distanceFunction = this.manhattanDistance
        this.findNeighbours = function () { }

        /** Any tile with a number higher than this number is considered "walkable"
         * All values below this number will be considered blocked.
         */
        this.minWalkableTileNum = 1
    }

    // Path function, executes AStar algorithm operations
    calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        const mypathStart = Node(null, { x: this.pathStart[0], y: this.pathStart[1] }, this.worldWidth)
        const mypathEnd = Node(null, { x: this.pathEnd[0], y: this.pathEnd[1] }, this.worldWidth)
        // create an array that will contain all world cells
        let AStar = new Array(this.worldSize)
        // list of currently open Nodes
        let Open = [mypathStart]
        // list of closed Nodes
        let Closed = []
        // list of the final output array
        const result = []
        // reference to a Node (that is nearby)
        let myNeighbours
        // reference to a Node (that we are considering now)
        let myNode
        // reference to a Node (that starts a path in question)
        let myPath
        // temp integer variables used in the calculations
        let length, max, min, i, j
        // iterate through the open list until none are left
        while (Open.length > 0) {
            length = Open.length
            max = this.worldSize
            min = -1
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f
                    min = i
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0]
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1]
                do {
                    result.push([myPath.x, myPath.y])
                    myPath = myPath.Parent
                }
                while (myPath != null)
                // clear the working arrays
                AStar = Closed = Open = []
                // we want to return start to finish
                result.reverse()
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = this.neighbors(myNode.x, myNode.y)
                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i], this.worldWidth)
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + this.distanceFunction(myNeighbours[i], myNode)
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + this.distanceFunction(myNeighbours[i], mypathEnd)
                        // remember this new path for testing above
                        Open.push(myPath)
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode)
            }
        } // keep iterating until until the Open list is empty
        return result
    }

    neighbors(x, y) {
        const N = y - 1
        const S = y + 1
        const E = x + 1
        const W = x - 1
        const myN = N > -1 && this.canWalkHere(x, N)
        const myS = S < this.worldHeight && this.canWalkHere(x, S)
        const myE = E < this.worldWidth && this.canWalkHere(E, y)
        const myW = W > -1 && this.canWalkHere(W, y)
        const result = []
        if (myN)
            result.push({ x: x, y: N })
        if (myE)
            result.push({ x: E, y: y })
        if (myS)
            result.push({ x: x, y: S })
        if (myW)
            result.push({ x: W, y: y })
        this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result)
        return result
    }

    canWalkHere(x, y) {
        return ((this.world[x] != null) &&
            (this.world[x][y] != null) &&
            (this.world[x][y] >= this.minWalkableTileNum))
    }

    manhattanDistance(point, goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y)
    }

    diagonalDistance(point, goal) {	// diagonal movement - assumes diag dist is 1, same as cardinals
        return Math.max(Math.abs(point.x - goal.x), Math.abs(point.y - goal.y))
    }

    euclideanDistance(point, goal) {	// diagonals are considered a little farther than cardinal directions
        // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
        // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
        return Math.sqrt(Math.pow(point.x - goal.x, 2) + Math.pow(point.y - goal.y, 2))
    }

    // returns every available North East, South East,
    // South West or North West cell - no squeezing through
    // "cracks" between two diagonals
    diagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && this.canWalkHere(E, N))
                result.push({ x: E, y: N })
            if (myW && this.canWalkHere(W, N))
                result.push({ x: W, y: N })
        }
        if (myS) {
            if (myE && this.canWalkHere(E, S))
                result.push({ x: E, y: S })
            if (myW && this.canWalkHere(W, S))
                result.push({ x: W, y: S })

        }
    }

    // returns every available North East, South East,
    // South West or North West cell including the times that
    // you would be squeezing through a "crack"
    diagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1
        myS = S < this.worldHeight
        myE = E < this.worldWidth
        myW = W > -1
        if (myE) {
            if (myN && this.canWalkHere(E, N))
                result.push({ x: E, y: N })
            if (myS && this.canWalkHere(E, S))
                result.push({ x: E, y: S })
        }
        if (myW) {
            if (myN && this.canWalkHere(W, N))
                result.push({ x: W, y: N })
            if (myS && this.canWalkHere(W, S))
                result.push({ x: W, y: S })
        }
    }
}

// Node function, returns a new object with Node properties
// Used in the calculatePath function to store route costs, etc.
class Node {
    constructor(parentNode, point, worldWidth) {
        this.parentNode = parentNode
        this.point = point
        this.worldIndex = point.y * worldWidth + point.x
        this.x = this.point.x
        this.y = this.point.y
        this.f = 0
        this.g = 0

    }
}