import five from 'johnny-five';
import createBoard from '../utilities/create-board.js';
import system from 'systeminformation';
import bodyParser from 'body-parser';
import express from 'express';

// Your code here!
const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/update', (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
});

const board = await createBoard();

const lcd = new five.LCD({
  pins: [7, 8, 9, 10, 11, 12],
  // backlight: 10,
  rows: 2,
  cols: 16,
});

board.repl.inject({
  lcd,
});

// lcd.cursor(0, 0).print('Howdy!');
// lcd.cursor(1, 3).print('World!');
setInterval(async () => {
  const memory = await system.mem();
  const battery = await system.battery();

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const humanReadable = `${month}-${day} ${hours}:${minutes}:${seconds}`;

  lcd.cursor(0, 0).print(humanReadable);
  lcd
    .cursor(1, 0)
    .print('Memory: ' + Math.round(memory.available / 1024 / 1024) + 'MB');
}, 1000);

app.listen(PORT, () => {
  console.log('Web Server is up and running!');
});
