const run = require('./src/engine')

const is3d = process.env.IS_3D || false;

const renderer = is3d ? require('./src/renderer/3d') : require('./src/renderer/canvas');

run(renderer)
