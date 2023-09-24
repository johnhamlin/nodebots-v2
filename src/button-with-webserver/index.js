import five from 'johnny-five';
import express from 'express';

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;
const board = new five.Board({
  repl: false,
});

board.on('ready', () => {
  let buttonIsPressed = false;

  const button = new five.Button({
    pin: 2,
  });

  const led13 = new five.Led(13);

  button.on('down', () => {
    buttonIsPressed = true;
  });

  button.on('up', () => {
    buttonIsPressed = false;
  });

  app.get('/', (req, res) => {
    res.send(`The button is ${buttonIsPressed ? 'pressed' : 'not pressed'}`);
  });

  app.post('/', (req, res) => {
    led13.toggle();
    res.status(200).send();
  });

  app.listen(PORT, () => {
    console.log(
      '👻 Your server is up and running on Port ' + PORT + '. Right on!',
    );
  });
});
