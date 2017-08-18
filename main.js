(function(){
    const canvas = document.querySelector('canvas');

    const ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 700;

    const cw = canvas.width;
    const ch = canvas.height;
    const ballSize = 20;

    let ballX = cw/2 - ballSize/2,
        ballY =  ch/2 - ballSize/2;

    const paddleHeight = 150,
          paddleWidth = 20,
          playerX = 70,
          aiX = 910;

    let playerY = 100,
        aiY = 240;

    const lineWidth = 6,
          lineHeight = 16;

    let ballSpeedX = -3,
        ballSpeedY = 3;
    
    //AI behaviro
    let move='stop';

    function player(){
        ctx.fillStyle="#42de9c";
        ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
    }

    function ai(){
        ctx.fillStyle="#c8ef24";
        ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
    }

//change ball speed
  function changeBallSpeed(){
    if(ballSpeedY > 0 && ballSpeedY <= 10){
        ballSpeedY++;
    }
    if(ballSpeedY < 0 && ballSpeedY >= -10){
        ballSpeedY--;
    }
}
//bouncing ball
    function bouncingBall(){
    
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
    //player bounce bottom edge
    if(ballSpeedY < 0 && ballX >= playerX && ballX <= playerX+paddleWidth && ballY <= playerY + paddleHeight){
        ballSpeedY = -ballSpeedY;
    }    

    //ai bounce the ball
    if((ballX >= aiX) && ballY >= aiY && ballY <= aiY + paddleHeight){
        ballSpeedX = -ballSpeedX;
        changeBallSpeed();
    }

}
    
    function ball(){
        ctx.fillStyle="#FFF";
        ctx.fillRect(ballX, ballY, ballSize, ballSize);

        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        bouncingBall();
        
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
    
    function aiBehavior(){
        if(ballSpeedX > 0 
           && ballX > cw/2
           && aiY > 0
           && ballY <= aiY + paddleHeight)
          {   
            move='goUp'; 
        } else if(aiY < ch-paddleHeight
                 && ballX > cw/2
                 && aiY > 0
                 && ballY > aiY)
                 {
            move = 'goDown';
        } else {
            move = 'stop';
        }
        
        if(move=='goUp'){
            aiY -= 5;
        } else if(move=='goDown'){
            aiY += 5;
        }
    }
    
    canvas.addEventListener("mousemove", playerPosition);
    function game(){
        table();
        ball();
        player();
        ai();
        aiBehavior();
    }


    setInterval(game, 1000/60);

})();