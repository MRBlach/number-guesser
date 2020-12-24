/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if lose
- Let player choose to play again
*/

//UI elements
game = document.querySelector('#game'),
minNum = document.querySelector('.min-num'),
maxNum = document.querySelector('.max-num'),
guessBtn = document.querySelector('#guessBtn'),
guessInput = document.querySelector('#guess-input'),
playAgain = document.querySelector('#playAgain');
message = document.querySelector('.message');

guessBtn.disabled = true;
guessInput.disabled = true;
playAgain.disabled = true;

const startBtn = document.getElementById('startBtn').addEventListener('click', Roll);

function Roll(e) {
  guessBtn.disabled = false;
  guessInput.disabled = false;
  document.querySelector('.staticBg').style.backgroundImage = "url('images/roll.gif')";
  document.querySelector('.staticBg').style.backgroundRepeat = 'no-repeat';
  document.querySelector('.staticBg').style.backgroundSize = 'contain';
  
  document.querySelector('.sun').hidden = true;
  document.querySelector('.player1').hidden = true;
  setTimeout(function() {
    startGame();
  }, 3700);
}

function startGame() {
  document.querySelector('.staticBg').style.backgroundImage = "url('images/raceway.webp')";
  document.querySelector('.staticBg').style.backgroundPosition = 'top';
  
  document.getElementById('game').hidden = false;
  document.querySelector('.life').hidden = false;
  document.querySelector('#startBtn').disabled = true;
  document.querySelector('#playAgain').disabled = true;
  document.querySelector('.instruction').hidden = false;
  





//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;



//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
// game.addEventListener('mousedown', function(e){
//   if(e.target.className === 'play-again'){
//     window.location.reload();
//   }
// });

//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //Validate input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Enter a number between ${min} and ${max}`);
  }





  //Check if won
  if(guess === winningNum){
    //Game over - won
    document.querySelector('.instruction').classList.add('animated'); 
    document.querySelector('.instruction').classList.add('pulse');  
    document.querySelector('.instruction').innerHTML = '<h2>WINNER</h2>';
    gameOver(true, `${winningNum} is correct, you win!`);
    document.querySelector('.staticBg').style.backgroundImage = "url('images/win.gif')";
    document.querySelector('.staticBg').style.backgroundSize = '80%';
    document.querySelector('.staticBg').style.backgroundRepeat = 'no-repeat';
    document.querySelector('.staticBg').style.backgroundPosition = 'top';
    guessBtn.disabled = true;
    guessInput.disabled = true;
    playAgain.disabled = false;

  } else {
    //wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //Game over - lost
      document.querySelector('.first').src = "images/heart2.png";
      document.querySelector('.instruction').hidden = true;
      document.querySelector('.staticBg').style.backgroundImage = "url('images/gameover1.gif')";
      document.querySelector('.staticBg').style.backgroundSize = '80%';
      document.querySelector('.staticBg').style.backgroundRepeat = 'no-repeat';
      document.querySelector('.staticBg').style.backgroundPosition = 'top';
      guessBtn.disabled = true;
      guessInput.disabled = true;
      playAgain.disabled = false;
      gameOver(false, `The correct number was ${winningNum}`);
      
    } if(guessesLeft === 1) {
      //Game continues - answer wrong

      //Change border color
      guessInput.style.borderColor = '#ff007f';
      //Clear input
      guessInput.value = '';
      //Set wrong answer message
      document.querySelector('.second').src = "images/heart2.png";
      setMessage(`${guess} is incorrect, you now have ${guessesLeft} guess left`, '#ff007f');
     
    } if(guessesLeft === 2) {
      guessInput.value = '';
      //Set wrong answer message
      document.querySelector('.third').src = "images/heart2.png";
      setMessage(`${guess} is incorrect, you now have ${guessesLeft} guesses left`, '#ff007f');
      //Change border color
      guessInput.style.borderColor = '#ff007f';
    }
  }
});

//Game over function
function gameOver(won, msg){
  let color;
  won === true ? color = "#39FF14" : color = '#ff007f';
  
  //Change border color
  guessInput.style.borderColor = color;
  //Set text color
  message.style.color = color;
  //Set winning message
  setMessage(msg);

}

//Get winning number
function getRandomNum(min, max){
return Math.floor(Math.random()*(max-min+1)+min);
}

//Set the message function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

}

