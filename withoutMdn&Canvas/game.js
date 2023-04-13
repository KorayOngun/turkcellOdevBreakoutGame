const gameDiv = document.getElementById("game");
var game_top = 0;
var game_bottom = 480;
var game_left = 0;
var game_right = 720;
var ball_x = 50;
var ball_y = 50;
var ball = document.createElement("div");
ball.id = "ball"
gameDiv.appendChild(ball);
var dX = 1;
var dY = 1;
var plate = document.createElement("div");
var plate_left = 0
var isLeft = false
var isRight = false
var isMove = false
plate.id = "plate"
gameDiv.appendChild(plate)


document.addEventListener("keydown",keyDownHandler)
document.addEventListener("keyup",keyUpHandler)

function keyDownHandler(e) {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    isLeft = true
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    isRight = true
  } 
  isMove = true
}
function keyUpHandler(e) {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    isLeft = false
  }
  if (e.key == "Right" || e.key == "ArrowRight") {
    isRight = false
  } 
  isMove = false
}

function movePlate() {
  if (isLeft && plate_left>0) {
    plate_left = plate_left-2
  }else if(isRight && plate_left<570){
    plate_left = plate_left+2
  }
  plate.style.left = `${plate_left}px`
}

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
function collisionDetection() {
 plateCollision();
}
function plateCollision() {
  if (ball_y==462) {
    alert("gameover")
  }
  if (ball_y>458) {
    if (plate_left<ball_x && plate_left+150>ball_x) {
      dY = -1
      if (isMove) {
        if (isLeft) {
          dX = -1
        }else{
          dX = 1
        }
      }
    }
  }
}




function game() {
  moveBall();
  movePlate();
  collisionDetection()
}

setInterval(game, 1);
