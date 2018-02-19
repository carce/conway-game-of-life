ctx = require('axel')

/**
 * Inside of the terminal it is more efficient to draw only what has changed then to redraw the whole frame.
 * 
 * @param {Array<Object>} changes Changes that should be painted on the console
 */
const paintDiff = (changes) => {
    changes.forEach(c => {
        if (c.alive) {
            ctx.bg(255, 255, 255)
        }
        else {
            ctx.bg(0, 0, 0)
        }

        ctx.point(1 + c.x, 1 + c.y)
    })

    ctx.bg(0, 0, 0)
}

/**
 * Randomize elements of an array.
 * 
 * @param {Array} array Any array
 */
const shuffleArray = (array) => {
    let i = array.length
    let temp
    let randomIndex

    while (0 !== i) {
        randomIndex = Math.floor(Math.random() * i--)

        temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }

    return array
}

/**
 * Render the current map without knowledge of the past map
 * 
 * @param {Array<Array<number>>} map Map to be rendered
 */
const firstRender = (map) => {
    let changes = []
    
    ctx.clear()
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] === 1) {
                changes.push({x: i, y: j, alive: true})
            }
        }
    }

    paintDiff(shuffleArray(changes))
}

/**
 * Render only changes between two maps
 * 
 * @param {Array<Array<number>>} nextMap 
 * @param {Array<Array<number>>} previousMap 
 */
const diffRender = (nextMap, previousMap) => {
    let changes = []

    for (let i = 0; i < nextMap.length; i++) {
        for (let j = 0; j < nextMap.length; j++) {
            if (previousMap[i][j] === 1 && nextMap[i][j] === 0) {
                changes.push({x:i, y:j, alive: false})
                
            }
            else if (previousMap[i][j] === 0 && nextMap[i][j] === 1) {
                changes.push({x:i, y:j, alive: true})
                
            }
        }
    }
    
    paintDiff(shuffleArray(changes))
}

/**
 * Nothing to init
 */
exports.init = () => {

}

/** 
 * Get console inner window size
*/
exports.getSize = () => {
    return {
        width: ctx.cols,
        height: ctx.rows
    }
}

/**
 * Paint method to be called by engine
 * 
 * @param {Array<Array<number>>} nextMap Map to be drawn
 * @param {Array<Array<number>>} previousMap Map from the previous step
 */
exports.paint = (nextMap, previousMap) => {
    if (!previousMap) {
        return firstRender(nextMap)
    }

    return diffRender(nextMap, previousMap)
}