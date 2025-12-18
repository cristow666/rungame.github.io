const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreEl = document.getElementById('score');


let playerX = 160;
let obstacleX = 360;
let jumping = false;
let velocity = 0;
let score = 0;
let loop;


startBtn.onclick = () => {
startScreen.style.display = 'none';
gameArea.style.display = 'block';
loop = setInterval(gameLoop, 20);
};


window.addEventListener('keydown', e => {
if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 40;
if (e.key === 'ArrowRight' && playerX < 320) playerX += 40;
if (e.code === 'Space' && !jumping) {
jumping = true;
velocity = 15;
}
player.style.left = playerX + 'px';
});


function gameLoop() {
if (jumping) {
let bottom = parseInt(getComputedStyle(player).bottom);
player.style.bottom = bottom + velocity + 'px';
velocity--;
if (bottom <= 10) {
jumping = false;
player.style.bottom = '10px';
}
}


obstacleX -= 5;
obstacle.style.left = obstacleX + 'px';


if (obstacleX < -40) {
obstacleX = 360;
score++;
scoreEl.innerText = score;
}


const p = player.getBoundingClientRect();
const o = obstacle.getBoundingClientRect();


if (p.left < o.right && p.right > o.left && p.bottom > o.top && p.top < o.bottom) {
clearInterval(loop);
alert('Game Over! Score: ' + score);
location.reload();
}
}
