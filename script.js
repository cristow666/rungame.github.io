const startBtn = document.getElementById('startBtn');
// CONTROLS
window.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') moveLeft();
if (e.key === 'ArrowRight') moveRight();
if (e.code === 'Space') jump();
});


document.addEventListener('touchstart', jump);


function moveLeft() {
if (playerX > 0) {
playerX -= 40;
player.style.left = playerX + 'px';
}
}


function moveRight() {
if (playerX < 320) {
playerX += 40;
player.style.left = playerX + 'px';
}
}


function jump() {
if (!isJumping) {
gravity = 15;
isJumping = true;
}
}


function gameLoop() {
// Jump physics
if (isJumping) {
let bottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
if (bottom < 120) {
player.style.bottom = bottom + gravity + 'px';
gravity -= 1;
} else {
isJumping = false;
gravity = 0;
}
} else {
player.style.bottom = '10px';
}


// Obstacle movement
obstacleX -= 5;
obstacle.style.left = obstacleX + 'px';


if (obstacleX < -40) {
obstacleX = 360;
score++;
scoreText.innerText = 'Score: ' + score;
}


// Collision
const p = player.getBoundingClientRect();
const o = obstacle.getBoundingClientRect();


if (p.left < o.right && p.right > o.left && p.bottom > o.top && p.top < o.bottom) {
clearInterval(gameInterval);
alert('Game Over! Score: ' + score);
location.reload();
}
}
