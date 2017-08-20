(function(){
    const canvas = document.querySelector('canvas');

    const ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 700;

    const cw = canvas.width;
    const ch = canvas.height;
    const ballSize = 20;
    
    let stage = 1;
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
    function tableStart(){
        ctx.fillStyle="#5e7dff";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle="#c3fdf4";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Ping Pong", cw/2, 150);
        ctx.font = "30px Arial";
        ctx.fillText("Kliknij zeby rozpoczac gre", cw/2, 400);
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
        playerScore +=1;
        playerPoint.play();
    }
      if(ballX <= playerX || ballX + ballSize >= aiX + paddleWidth){
        ballX = cw/2 - ballSize/2,
        ballY =  ch/2 - ballSize/2;
        ballSpeedX = -3;
        ballSpeedY = 3;
    }
        ctx.font = "40px Arial"
        ctx.fillStyle = "#FFF";
        ctx.fillText(playerScore, 50, 60);
        ctx.fillText(aiScore, cw-50, 60);
    }

    function table(){
        if(stage===2){
            canvas.addEventListener("mousemove", playerPosition);
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, cw, ch);
         for(var linePosition = 20; linePosition < ch; linePosition += 30){
            ctx.fillStyle = "grey";
            ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
        }
    }

    const topCanvas = canvas.offsetTop
    function playerPosition(e){
        if(stage==2){
            playerY = e.clientY - topCanvas - paddleHeight/2;
            player();
            if(playerY >= ch - paddleHeight){
                playerY = ch -paddleHeight;
            }
            if(playerY <= 0){
                playerY = 0;
            }   
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
    
    function winner(){
        if(playerScore==3){
            ctx.fillStyle="#007D00";
            ctx.fillRect(0, 0, cw, ch);
            ctx.fillStyle="#FF9900";
            ctx.font = "100px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Wygrales", cw/2, 150);
            ctx.font = "30px Arial";
            ctx.fillText("Chcesz zagrac jeszcze raz?", cw/2, 400);
            document.addEventListener("click", function(){ stage=1 });
        } else {
            ctx.fillStyle="#E88F14";
            ctx.fillRect(0, 0, cw, ch);
            ctx.fillStyle="#2B1CBC";
            ctx.font = "100px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Przegrales", cw/2, 150);
            ctx.font = "30px Arial";
            ctx.fillText("Chcesz zagrac jeszcze raz?", cw/2, 400);
            document.addEventListener("click", function(){ stage=1 });
        }
        
        document.addEventListener("click", function(){
           aiScore=0;
           playerScore=0;
            stage=1;
            console.log(stage + " " + aiPoint + " " + playerPoint);
        });
    }
    function game(){
    if(aiScore==3 || playerScore==3){
        stage=3;
     }
        switch(stage){
            case 1:
                 tableStart();
                 document.addEventListener("click", function(){ stage = 2; })
             break;
            case 2:
                table();
                ball();
                player();
                ai();
                aiBehavior();
                score();
            break;
            case 3:
                winner();
            break;
        }
    }

  
    setInterval(game, 1000/60);

})();