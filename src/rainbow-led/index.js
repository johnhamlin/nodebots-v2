import five from 'johnny-five';
import createBoard from '../utilities/create-board.js';

// Your code here!

const board = await createBoard();

const led = new five.Led.RGB([5, 10, 9]);

// let index = 0;
// const rainbow = [
//   'FF0000',
//   'FF7F00',
//   'FFFF00',
//   '00FF00',
//   '0000FF',
//   '4B0082',
//   '8F00FF',
// ];

// board.loop(1000, () => {
//   led.color(rainbow[index++]);
//   if (index === rainbow.length) {
//     index = 0;
//   }
// });

board.repl.inject({
  led,
});
