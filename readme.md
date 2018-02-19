# Conway's Game of Life

Simple implementation of this popular game. Code is separated into modules, core and rendering engines. Implemented rendering engines are HTML5 canvas and terminal. The core logic is also tested using mocha and chai.

## Usage

To run the game inside a terminal/console run ```npm start```.

You can also run the game in the canvas mode by running ```npm run web``` and after a quick test and webpack build you will be presented with a browser window with the game playing.

And if you want to only run the test that can be done with the command ```npm test```.

## Trivia

- I am very fond of the implementation of the console rendering engine. As I was developing this on Windows, I noticed that the console is very slow to re-render whole images 30 times a second and rendering process was very visible. After some thought I added randomness to the rendering process and got an interesting result. The amount of time needed for additional processing is not noticeable compared to the amount of time needed to actually paint the console so the randomized rendering process actually seems much faster at first sight.
- In the "step" method of the Conway class I have left, commented out, alternative way to write the same logic. It seems cleaner but it is slower and maybe not quite as readable for most people.