const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20;

let ballX = cw/2 - ballSize/2,
    ballY =  ch/2 - ballSize/2;

const paddelHeight = 100,
      paddleWidth = 20,
      playerX = 70,
      aiX = 910;

let playerY = 200,
    aiY = 200;

const lineWidth = 6,
      lineHeight = 16;

let ballSpeedX = 3,
    ballSpeedY = 3;

function player(){
    ctx.fillStyle="#42de9c";
    ctx.fillRect(playerX, playerY, paddleWidth, paddelHeight);
}

function ai(){
    ctx.fillStyle="#c8ef24";
    ctx.fillRect(aiX, aiY, paddleWidth, paddelHeight);
}
function ball(){
    ctx.fillStyle="#FFF";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    //the ball is bouncing
    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY;
    }
    if(ballX <= 0 || ballX + ballSize >= cw){
        ballSpeedX = -ballSpeedX;
    }
    
    //player bounce the ball
    if((ballX <= playerX + paddleWidth) 
    && (ballY >= playerY && ballY <= playerY + paddelHeight)){
        
        ballSpeedX = -ballSpeedX;
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
    playerY = e.clientY - topCanvas - paddelHeight/2;
    player();   
    if(playerY >= ch - paddelHeight){
        playerY = ch -paddelHeight;
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