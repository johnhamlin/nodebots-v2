import five from 'johnny-five';

const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(11);
  const button = new five.Button(2);

  // button.on('press', () => {
  //   console.log('button pressed!');
  //   led13.isOn ? led13.off() : led13.on();
  // });

  button.on('down', () => {
    console.log('light on');

    led.fadeIn(500);
  });

  button.on('up', () => {
    console.log('light off');

    led.fadeOut(500);
  });

  board.repl.inject({
    led: led,
  });
});
