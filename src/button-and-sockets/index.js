import http from 'http';
import bodyParser from 'body-parser';
import five from 'johnny-five';
import express from 'express';
import { Server } from 'socket.io';
import createBoard from '../utilities/create-board.js';
import { startClientServer } from '../utilities/client-server.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

await createBoard({ repl: false });

const button = new five.Button(2);
const pot = new five.Sensor('A0');
const lightMeter = new five.Light({
  pin: 'A1',
  freq: 500,
  threshold: 5,
});
const led = new five.Led(11);

lightMeter.on('change', () => {
  const { value, raw } = lightMeter;
  console.log(value);
});

pot.scale([0, 255]);

io.on('connection', (socket) => {
  console.log('🔌 socket connection established');

  button.on('down', () => {
    console.log('Button down');
    led.fadeIn(500);
    socket.emit('button', 'down');
  });

  button.on('up', () => {
    console.log('button released');

    led.fadeOut(500);
    socket.emit('button', 'up');
  });

  pot.on('change', () => {
    socket.emit('pot', pot.value);
  });

  lightMeter.on('change', () => {
    const { value, raw } = lightMeter;
    socket.emit('light', value);
    console.log(value);
  });
});

server.listen(PORT, () => {
  console.log('🤖 Express and Johnny-Five are up and running.');
  startClientServer();
});
