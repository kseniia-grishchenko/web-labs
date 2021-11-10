let socket = io(["polling", "websocket"]);

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');
const startButton = document.querySelector('#startButton');
let crazyButton = document.getElementById('crazyButton');

startButton.addEventListener('click', () => {
  socket.emit('startGame');
});

homeBtn.addEventListener('click', () => {
  socket.emit('home');
})

crazyButton.addEventListener('click', () => {
  socket.emit('crazyIsClicked', {
      offsetLeft: Math.random() * ((window.innerWidth - crazyButton.clientWidth) - 100),
      offsetTop: Math.random() * ((window.innerHeight - crazyButton.clientHeight) - 50)
  });
})

socket.on('startGame', () => {
  hideStartButton();
});

function hideStartButton() {
  startButton.style.display = "none";
  crazyButton.style.display = "block";
  startingSection.style.display = "none";
}

socket.on('home', () => {
  showStartButton();
});

function showStartButton() {
  startButton.style.display = "block";
  crazyButton.style.display = "none";
  startingSection.style.display = "block";
}

socket.on('crazyIsClicked', (data) => {
  console.log('clicked', data)
  goCrazy(data.offsetLeft, data.offsetTop);
});

function goCrazy(offLeft, offTop) {
  let top, left;

  left = offLeft;
  top = offTop;

  crazyButton.style.top = top + 'px';
  crazyButton.style.left = left + 'px';
  crazyButton.style.animation = "none";
}