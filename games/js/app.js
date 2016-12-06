/**
 * app.js
 * Main application script
 */
"use strict";

var canvas = document.querySelector("canvas");
// Comparable to graphics from drawing panel
var ctx = canvas.getContext("2d");
var gameState;

// Sound stuff
var pongSound = new Audio("/sounds/pong.wav");
var gameOverSound = new Audio("/sounds/game-over.wav");

function resizeCanvas() {
   // Has entire document in it
   var docElem = document.documentElement;
   canvas.width = docElem.clientWidth;
   canvas.height = docElem.clientHeight;
}

//Auto resizing
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Change game state one frame
function step(timestamp) {
   var ball = gameState.ball;
   ball.x += ball.vectorX * ball.velocity;
   ball.y += ball.vectorY * ball.velocity;

   ctx.fillStyle();


   ctx.fillStyle = '#000000';

   if(ball.y + ball.radius >= canvas.height || 
      ball.y - ball.radius <= 0) {
      
      ball.vectorY = -ball.vectorY;
      pongSound.play();
   }

   // Bounce off right wall
   if(ball.x + ball.radius >= canvas.width) {
      
      ball.vectorX = -ball.vectorX;
      pongSound.play();
   }

   // Detect paddle
   var paddle = gameState.paddle;
   if(ball.x - ball.radius <= paddle.x + paddle.width) {
      if(ball.y + ball.radius >= paddle.y &&
         ball.y - ball.radius <= paddle.y + paddle.height) {
            ball.vectorX = -ball.vectorX;
            pongSound.play();
      } else {
         // gameOverSound.play();
         // return false;
         ball.vectorX = -ball.vectorX;
         pongSound.play();
      }
   }

   if(timestamp - ball.lastVelIncrease > 10000) {
      ball.velocity++;
      ball.lastVelIncrease = timestamp
   }

   return true;

}


// Display state
function render(state) {
   // Clear things
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   // Starts drawing 
   ctx.beginPath();
   //Draw circles or arcs
   ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
   ctx.fill();

   // render paddle
   ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
}

// Step and then render
function animate(timestamp) {
   // Step the animation and keep going
   // if step returns true.
   if(step(timestamp)) {
      requestAnimationFrame(animate);
   }

   render(gameState);
}

// Start new game
function startGame() {
   // Data tracked for game
   gameState = {
      ball: {
         x: 50,
         y: 50,
         radius: 10,
         vectorX: 1,
         vectorY: 1,
         velocity: 4,
         lastVelIncrease: performance.now()
      }, 
      paddle: {
         x: 10,
         y: 10,
         width: 10,
         height: canvas.height / 6
      }
   };

   // Pass callback function that receives high-res timestamp
   requestAnimationFrame(animate);
}

window.addEventListener("keydown", function(evt) {
   var paddle = gameState.paddle;
   if(evt.keyCode == 40) {
      paddle.y += 15;
   } else if(evt.keyCode == 38) {
      paddle.y -= 15;
   }
})

startGame()