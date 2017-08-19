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
    
    //Score
    let playerScore = 0,
        aiScore = 0;

    //sounds
    const pong = new Audio('/sound/pong.wav'),
          aiPoint = new Audio('/sound/aipoint.wav'),
          playerPoint = new Audio('/sound/playerpoint.wav');
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
        pong.play();
    }

    //player bounce the ball
    if((ballX <= playerX + paddleWidth)
    && (ballY >= playerY - ballSize && ballY <= playerY + paddleHeight + ballSize)){
        ballSpeedX = -ballSpeedX;
        pong.play();
        changeBallSpeed();
    }
    //player bounce bottom edge
    if(ballSpeedY < 0 && ballX >= playerX && ballX <= playerX+paddleWidth && ballY <= playerY + paddleHeight){
        ballSpeedY = -ballSpeedY;
        pong.play();
    }    

    //ai bounce the ball
    if((ballX >= aiX - paddleWidth) && ballY >= aiY && ballY <= aiY + paddleHeight){
        ballSpeedX = -ballSpeedX;
        changeBallSpeed();
        pong.play();
    }

}
    
    function ball(){
        ctx.fillStyle="#FFF";
        ctx.fillRect(ballX, ballY, ballSize, ballSize);

        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        bouncingBall();
        
    }
    function score(){
    if(ballX <= playerX){
        aiScore+=1;
        aiPoint.play();
    }
        
    if(ballX + ballSize >= aiX + paddleWidth){
        console.log("Player win");
        playerScore +=1;
        playerPoint.play();
    }
      if(ballX <= playerX || ballX + ballSize >= aiX + paddleWidth){
        ballX = cw/2 - ballSize/2,
        ballY =  ch/2 - ballSize/2;
        ballSpeedX = -3;
        ballSpeedY = 3;
    }
        console.log(ballX + ' ' + playerX);
        ctx.font = "40px Arial"
        ctx.fillStyle = "#FFF";
        ctx.fillText(playerScore, 50, 60);
        ctx.fillText(aiScore, cw-50, 60);
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
           && ballY > 30
           && aiY > 0
           && ballY <= aiY + paddleHeight
           && ballY > 200)
          {   
            move='goUp'; 
        } else if(aiY < ch-paddleHeight
                 && ballX > cw/2
                 && aiY > 0
                 && ballY > aiY
                 && ballY < ch - 50)
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
        score();
    }


    setInterval(game, 1000/60);

})();