const NEIGHBOURS = require('./const').NEIGHBOURS

/**
 * Get value of the tile.
 * 
 * This is done using a simple logic statement that checks for contstraints before returning the actual value.
 * 
 * @param {Array<Array<number>>} map matrix of the game
 * @param {Object} point x and y of that will be checked on the map
 * @returns value of the tile or false if it is not possible to get the tile
 */
const getTile = (map, point) => {
    return point.x >= 0 && point.y >= 0 && point.x < map.length && point.y < map[0].length && map[point.x][point.y]
}

/**
 * Efficient way of getting number of alive tiles around the chosen point
 * 
 * @param {Array<Array<number>>} map matrix of the game
 * @param {Object} point x and y of that will be checked on the map
 * @returns amount of surrounding live tiles
 */
exports.getNumberOfNeighbours = (map, point) => {
    let aliveCount = 0;

    for (let i = 0; i < NEIGHBOURS.length; i++) {
        let neighbour = {
            x: point.x + NEIGHBOURS[i].x,
            y: point.y + NEIGHBOURS[i].y
        }

        if (getTile(map, neighbour)) {
            aliveCount++
        }
    }

    return aliveCount
}

/**
 * Calculate if the chosen tile will be alive or dead in the next step.
 * 
 * Game rules are squished into a simple logic statement.
 * 
 * @param {number} state current state of the tile
 * @param {number} numberOfNeighbours number of neighbours
 * @returns state of the tile in the next step
 */
exports.getNextGenState = (state, numberOfNeighbours) => {
    let threeNeighbours = numberOfNeighbours === 3;
    let twoNeighbours = numberOfNeighbours === 2;

    return (threeNeighbours || (state && twoNeighbours)) ? 1 : 0;
}

/**
 * Generate random matrix
 * 
 * @param {number} w width of the matrix
 * @param {number} h height of the matrix
 * @returns generated matrix
 */
exports.createMapArray = (w, h) => {
    return new Array(w).fill().map(val => new Array(h).fill().map(value => Math.floor(Math.random() * 8) ? 0 : 1));
}