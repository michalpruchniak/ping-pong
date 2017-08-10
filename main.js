const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20;

let ballX = cw/2 - ballSize/2,
    ballY =  ch/2 - ballSize/2;

const paddleHeight = 100,
      paddleWidth = 20,
      playerX = 70,
      aiX = 910;

let playerY = 100,
    aiY = 240;

const lineWidth = 6,
      lineHeight = 16;

let ballSpeedX = -3,
    ballSpeedY = 3;

function player(){
    ctx.fillStyle="#42de9c";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai(){
    ctx.fillStyle="#c8ef24";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}
function ball(){
    ctx.fillStyle="#FFF";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    function changeBallSpeed(){
        if(ballSpeedY > 0 && ballSpeedY <= 10){
            ballSpeedY++;
        }
        if(ballSpeedY < 0 && ballSpeedY >= -10){
            ballSpeedY--;
        }
    }
    //the ball is bouncing
    if(ballY <= 0 || ballY + ballSize >= ch - 30){
        ballSpeedY = -ballSpeedY;
        changeBallSpeed();
    }
    if(ballX <= 0 || ballX + ballSize >= cw - 30){
        ballX = cw/2 - ballSize/2,
        ballY =  ch/2 - ballSize/2;
        ballSpeedX = 3;
        ballSpeedY = 3;
    }

    //player bounce the ball
    if((ballX <= playerX + paddleWidth)
    && (ballY >= playerY - ballSize && ballY <= playerY + paddleHeight + ballSize)){

        ballSpeedX = -ballSpeedX;
        changeBallSpeed();
    }

    //ai bounce the ball
    if(ballX >= aiX - paddleWidth && (ballY >= aiY && ballY <= aiY + paddleHeight)){
        ballSpeedX = -ballSpeedX;
        changeBallSpeed();
    }

    //ai: bounce of top edge
    if(ballSpeedY < 0 && ballY == aiY + paddleHeight
    && (ballX < aiX && ballX > aiX - paddleWidth) ){
        ballSpeedY = -ballSpeedY;
    }
    
    //ai: bounce of bottom edge
    if(ballSpeedY > 0 && ballY + ballSize == aiY
      && (ballX < aiX && ballX > aiX - paddleWidth)) {
        ballSpeedY = -ballSpeedY;
    }
    
    //player: bounce of top edge
    if(ballSpeedY < 0 && ballX == playerX + paddleWidth
      && (ballX > playerX && ballX < playerX - paddleWidth)){
        ballSpeedY = -ballSpeedY;
    }
    
    //player: bounce of bottom edge
    if(ballSpeedY > 0 && ballY + ballSize == playerY
      && (ballX < playerY && ballX > playerY - paddleWidth)) {
        ballSpeedY = -ballSpeedY;
    }
}

function table(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
     for(var linePosition = 20; linePosition < ch; linePosition += 30){
        ctx.fillStyle = "grey";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
    }
}

const topCanvas = canvas.offsetTop
function playerPosition(e){
    playerY = e.clientY - topCanvas - paddleHeight/2;
    player();
    if(playerY >= ch - paddleHeight){
        playerY = ch -paddleHeight;
    }
    if(playerY <= 0){
        playerY = 0;
    }


}
canvas.addEventListener("mousemove", playerPosition);
function game(){
    table();
    ball();
    player();
    ai();
}


setInterval(game, 1000/60);
