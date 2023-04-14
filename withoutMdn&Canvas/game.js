
//game screen
const gameDiv = document.getElementById("game");
var game_top = 0;
var game_bottom = 480;
var game_left = 0;
var game_right = 720;


//ball
var ball_x = 50;
var ball_y = 200;
var ball = document.createElement("div");
ball.id = "ball";
gameDiv.appendChild(ball);

//ball movement
var dX = 0;
var dY = 1;

//plate
var plate = document.createElement("div");
var plate_left = 0;
var isLeft = false;
var isRight = false;
var isMove = false;
plate.id = "plate";
gameDiv.appendChild(plate);

// brick
const brickRow = 3;
const brickColumn = 6;
var bricks = [];


//score
var score = 0
var score_view = document.createElement("div")
score_view.innerHTML = score
gameDiv.appendChild(score_view)

function createBricks() {
  for (let i = 0; i < brickRow; i++) {
    for (let j = 0; j < brickColumn; j++) {
      var brick = document.createElement("div");
      brick.className = "brick";
      brick.style.top = `${20 + 40 * i}px`;
      brick.style.backgroundColor = "black";
      brick.style.left = `${10 + 120 * j}px`;
      bricks.push(brick);
      gameDiv.appendChild(brick);
    }
  }
}
createBricks();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    isLeft = true;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    isRight = true;
  }
  isMove = true;
}
function keyUpHandler(e) {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    isLeft = false;
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    isRight = false;
  }
  isMove = false;
}

function movePlate() {
  if (isLeft && plate_left > 0) {
    plate_left = plate_left - 2;
  } else if (isRight && plate_left < 570) {
    plate_left = plate_left + 2;
  }
  plate.style.left = `${plate_left}px`;
}

function moveBall() {
  if (ball_x > 702) {
    dX = -1;
  }
  if (ball_x < 0) {
    dX = 1;
  }
  if (ball_y == 462) {
    dY = -1;
  }
  if (ball_y == 0) {
    dY = 1;
  }
  ball_x = ball_x + dX;
  ball_y = ball_y + dY;

  ball.style.left = `${ball_x}px`;
  ball.style.top = `${ball_y}px`;
}
function collisionDetection() {
  plateCollision();
  brickCollision();
}
function plateCollision() {
  if (ball_y == 462) {
    alert("gameover");
  }
  if (ball_y > 458) {
    if (plate_left < ball_x && plate_left + 150 > ball_x) {
      dY = -1;
      if (isMove) {
        if (isLeft) {
          dX = dX - 1;
        } else {
          dX = dX + 1;
        }
      }
    }
  }
}
function brickCollision() {
  var brick = bricks.find(findBrick);
  if (brick) {
    brick.remove();
    score = score +1
    score_view.innerHTML = score
  }
}
function findBrick(b) {
  if (
    b.offsetTop+5 == ball_y &&
    b.offsetLeft < ball_x &&
    b.offsetLeft + 100 > ball_x
  ) {
    dY = 1;
    return true;
  }
  if (
    b.offsetTop  == ball_y &&
    b.offsetLeft < ball_x &&
    b.offsetLeft + 100 > ball_x
  ) {
    dY = -1;
    return true;
  }
  return false;
}

function game() {
  moveBall();
  movePlate();
  collisionDetection();
}

setInterval(game, 5);
