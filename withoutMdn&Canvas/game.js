const gameDiv = document.getElementById("game");
var game_top = 0;
var game_bottom = 480;
var game_left = 0;
var game_right = 720;
var ball_x = 50;
var ball_y = 50;
var ball = document.createElement("div");
var dX = 1;
var dY = 1;
function createBall() {
  gameDiv.appendChild(ball);
  ball.style.width = "18px";
  ball.style.position = "absolute";
  ball.style.height = "18px";
  ball.style.backgroundColor = "red";
  ball.style.borderRadius = "50%";
}
createBall();

function moveBall() {
  if (ball_x == 702) {
    dX = -1;
  }
  if (ball_x == 0) {
    dX = 1;
  }
  if (ball_y == 462) {
    dY = -1;
  }
  if (ball_y == 0) {
    dY = 1;
  }
  ball_x = ball_x +dX
  ball_y = ball_y +dY

  ball.style.left = `${ball_x}px`;
  ball.style.top = `${ball_y}px`;
}

function game() {
  moveBall();
  
}

setInterval(game, 1);
