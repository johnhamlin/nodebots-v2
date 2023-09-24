import post from '../utilities/post';
import io from 'socket.io-client';

const buttonState = document.querySelector('.button-state');

// Add in client-side socket.io code here.

const socket = io();
socket.on('connect', () => {
  console.log('We are set up on the client!');
});

socket.on('button', (message) => {
  buttonState.textContent = message;
});

socket.on('pot', (value) => {
  document.body.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
});
