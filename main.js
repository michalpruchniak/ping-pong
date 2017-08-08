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

let ballSpeedX = 1,
    ballSpeedY = 1;

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
}

function table(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
     for(var linePosition = 20; linePosition < ch; linePosition += 30){
        ctx.fillStyle = "grey";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
    }
}

function game(){
    table();
    ball();
    player();
    ai();
}



setInterval(game, 1000/60);