let canvas;
let ctx;

/**
 * Get canvas and set it's size.
 */
exports.init = () => {
    canvas = document.getElementById('game')
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth / 5
    canvas.height = window.innerHeight / 5
}

/**
 * Get size of the canvas
 */
exports.getSize = () => {
    return {
        width: canvas.width,
        height: canvas.height
    }
}

/**
 * Draw the map
 * 
 * @param {Array<Array<number>>} nextMap Map to be drawn
 * @param {Array<Array<number>>} previousMap Unused previous state of the map
 */
exports.paint = (nextMap, previousMap) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < nextMap.length; i++) {
        for (let j = 0; j < nextMap.length; j++) {
            if (nextMap[i][j] === 1) {
                ctx.fillRect(i, j, 1, 1)
            }
        }
    }
}