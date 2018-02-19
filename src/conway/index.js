const createMapArray = require('./utils').createMapArray
const getNumberOfNeighbours = require('./utils').getNumberOfNeighbours
const getNextGenState = require('./utils').getNextGenState

module.exports = class Conway {
    /**
     * Creates an instance of Conway.
     * @param {number} width width of the map
     * @param {number} height height of the map
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.map = createMapArray(width, height)
    }

    /**
     * Calculates next state of the game
     * 
     */
    step() {
        // I like this soluton more :D
        // But it should be slower and is less readable
        // this.map = this.map.map((row, i) => row.map((value, j) => {
        //     let amountOfFriends = getNumberOfNeighbours(this.map, {x: i, y: j})
        //     return getNextGenState(this.map[i][j], amountOfFriends)
        // }))

        let nextMap = [];
        
        for (let i = 0; i < this.width; i++) {
            nextMap[i] = [];
            for (let j = 0; j < this.height; j++) {
                let amountOfFriends = getNumberOfNeighbours(this.map, {x: i, y: j});
                nextMap[i][j] = getNextGenState(this.map[i][j], amountOfFriends);
            }
        }

        this.map = nextMap;
    }
}