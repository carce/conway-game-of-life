const Conway = require('./conway')

/**
 * This is a basic game loop going 30 frames per second. 
 * Logic and rendering are not separated since
 * Conway's game of life has no input and the game
 * would not benefit from the separation.
 *  
 * @param {Renderer} renderer Object with methods: init, getSize, and paint
 */
module.exports = (renderer) => {
    renderer.init()
    
    let {width, height} = renderer.getSize()
    let game = new Conway(width, height)
    let previousMap;

    setInterval(() => {
        renderer.paint(game.map, previousMap)
        previousMap = game.map
        game.step()
    }, 1000 / 10)
}