import post from '../utilities/post';

const lightSwitch = document.querySelector('#lightswitch');

// Your code here!

lightSwitch.addEventListener('click', async () => {
  const response = await post('/api/light');
  console.log(response);
});
