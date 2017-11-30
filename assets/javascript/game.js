//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var doubleWord = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];
//Holds the all the words
var wordBank =['orange','blue','green', 'yellow','violet','red','purple'];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var blanksAndSuccesses =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;
var delay = 1000;

//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	//Reset hiddenWin container

	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;

	// Testing / Debugging
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('WORKING!');
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					//Test / Debug
					console.log(blanksAndSuccesses);
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
		
}

function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		document.getElementById('hiddenWin').style.visibility="visible";
		audio.play();
		reset();

	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		reset();
	}
}

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < doubleWord.length; i++)
	{	
		if(letterGuessed === doubleWord[i] && test === true)
		{
			var spliceDword = doubleWord.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + doubleWord[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}

//ADD COLOR SPECTRUM
//-----------------------------------------------

function color_from_hue(hue)
{
  var h = hue/60;
  var c = 255;
  var x = (1 - Math.abs(h%2 - 1))*255;
  var color;
 
  var i = Math.floor(h);
  if (i == 0) color = rgb_to_hex(c, x, 0);
  else if (i == 1) color = rgb_to_hex(x, c, 0);
  else if (i == 2) color = rgb_to_hex(0, c, x);
  else if (i == 3) color = rgb_to_hex(0, x, c);
  else if (i == 4) color = rgb_to_hex(x, 0, c);
  else color = rgb_to_hex(c, 0, x);
 
  return color;
}
 
function rgb_to_hex(red, green, blue)
{
  var h = ((red << 16) | (green << 8) | (blue)).toString(16);
  // add the beginning zeros
  while (h.length < 6) h = '0' + h;
  return '#' + h;
}

// ADD JQUERY FUNCTION 
(function( $ ) {
 
  $.fn.rainbowize = function() {
    return this.each(function() {
      var rainbowtext = '';
      var hue=0;
      var step=0;
 
      // get the current text inside element
      var text = $(this).text();
 
      // hue is 360 degrees
      if (text.length > 0)
        step = 360 / (text.length);
 
      // iterate the whole 360 degrees
      for (var i = 0; i < text.length; i++)
      {
        rainbowtext = rainbowtext + '<span style="color:' + color_from_hue(hue) + '">' + text.charAt(i) + '</span>';
        hue += step;
      }
 
      $(this).html(rainbowtext);
    });
  };
})( jQuery );

// START HANGMAN DRAWING IN CANVAS
// function draw(){
//     var ctx = document.getElementById("hangman").getContext('2d');
//         ctx.fillStyle = "white";
//         ctx.lineWidth=3;
//         ctx.fillRect(0, 0, 300, 300);
//         ctx.beginPath(); //vertical bar
//             ctx.moveTo(50,270);
//             ctx.lineTo(50,25);
//             ctx.stroke();
//         ctx.beginPath(); //vertical bar long piece
//             ctx.moveTo(65,270);
//             ctx.lineTo(65,85);
//             ctx.stroke();
//         ctx.beginPath(); //vertical bar short piece
//             ctx.moveTo(65,64);
//             ctx.lineTo(65,40);
//             ctx.stroke();
//         ctx.beginPath(); //horizontal bar
//             ctx.moveTo(49,25);
//             ctx.lineTo(175,25);
//             ctx.stroke();
//         ctx.beginPath(); //horizontal bar short piece
//             ctx.moveTo(49,40);
//             ctx.lineTo(86,40);
//             ctx.stroke();
//         ctx.beginPath(); //horizontal bar long piece
//             ctx.moveTo(106,40);
//             ctx.lineTo(175,40);
//             ctx.stroke();
//         ctx.beginPath(); //small vertical bar
//             ctx.moveTo(173,25);
//             ctx.lineTo(173,40);
//             ctx.stroke();
//         ctx.beginPath(); //cross bar
//             ctx.moveTo(50,80);
//             ctx.lineTo(100,25);
//             ctx.stroke();
//         ctx.beginPath(); //cross bar
//             ctx.moveTo(60,90);
//             ctx.lineTo(111,35);
//             ctx.stroke();
//         ctx.beginPath(); //cross bar
//             ctx.moveTo(50,80);
//             ctx.lineTo(60,90);
//             ctx.stroke();
//         ctx.beginPath(); //cross bar
//             ctx.moveTo(100,25);
//             ctx.lineTo(111,35);
//             ctx.stroke();
//         ctx.beginPath(); //ground
//             ctx.moveTo(35,270);
//             ctx.lineTo(265,270);
//             ctx.stroke();
//         ctx.beginPath(); //noose
//             ctx.moveTo(150,40);
//             ctx.lineTo(150,80);
//             ctx.stroke();
//     var cntx = document.getElementById("homeHangman").getContext('2d');
//         cntx.fillStyle = "white";
//         cntx.lineWidth=3;
//         cntx.fillRect(0, 0, 300, 300);
//         cntx.beginPath(); //vertical bar
//             cntx.moveTo(50,270);
//             cntx.lineTo(50,25);
//             cntx.stroke();
//         cntx.beginPath(); //vertical bar long piece
//             cntx.moveTo(65,270);
//             cntx.lineTo(65,85);
//             cntx.stroke();
//         cntx.beginPath(); //vertical bar short piece
//             cntx.moveTo(65,64);
//             cntx.lineTo(65,40);
//             cntx.stroke();
//         cntx.beginPath(); //horizontal bar
//             cntx.moveTo(49,25);
//             cntx.lineTo(175,25);
//             cntx.stroke();
//         cntx.beginPath(); //horizontal bar short piece
//             cntx.moveTo(49,40);
//             cntx.lineTo(86,40);
//             cntx.stroke();
//         cntx.beginPath(); //horizontal bar long piece
//             cntx.moveTo(106,40);
//             cntx.lineTo(175,40);
//             cntx.stroke();
//         cntx.beginPath(); //small vertical bar
//             cntx.moveTo(173,25);
//             cntx.lineTo(173,40);
//             cntx.stroke();
//         cntx.beginPath(); //cross bar
//             cntx.moveTo(50,80);
//             cntx.lineTo(100,25);
//             cntx.stroke();
//         cntx.beginPath(); //cross bar
//             cntx.moveTo(60,90);
//             cntx.lineTo(111,35);
//             cntx.stroke();
//         cntx.beginPath(); //cross bar
//             cntx.moveTo(50,80);
//             cntx.lineTo(60,90);
//             cntx.stroke();
//         cntx.beginPath(); //cross bar
//             cntx.moveTo(100,25);
//             cntx.lineTo(111,35);
//             cntx.stroke();
//         cntx.beginPath(); //ground
//             cntx.moveTo(35,270);
//             cntx.lineTo(265,270);
//             cntx.stroke();
//         cntx.beginPath(); //noose
//             cntx.moveTo(150,40);
//             cntx.lineTo(150,80);
//             cntx.stroke();
// }

// function hang(){
//     var ctx = document.getElementById("hangman").getContext('2d');
//     if(numWrong==1){
//         ctx.beginPath(); //head
//             ctx.arc(150, 100, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //mouth
//             ctx.arc(150, 103, 9, 0, Math.PI);
//             ctx.stroke();
//     }
//     if(numWrong==2){
//         ctx.beginPath(); //body
//             ctx.moveTo(150,120);
//             ctx.lineTo(150,190);
//             ctx.stroke();
//     }
//     if(numWrong==3){
//         ctx.fillStyle = "white";
//         ctx.fillRect(138, 102, 24, 12); //cover mouth
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,108);
//             ctx.lineTo(160,108);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(150,135);
//             ctx.lineTo(180,160);
//             ctx.stroke();
//     }
//     if(numWrong==4){
//         ctx.beginPath(); //left arm
//             ctx.moveTo(150,135);
//             ctx.lineTo(120,160);
//             ctx.stroke();
//     }
//     if(numWrong==5){
//         ctx.fillRect(138, 102, 24, 12); //cover mouth
//         ctx.beginPath(); //sad mouth
//             ctx.arc(150, 112, 9, 0, Math.PI, true);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,188);
//             ctx.lineTo(180,230);
//             ctx.stroke();
//     }
//     if(numWrong==6){
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,188);
//             ctx.lineTo(120,230);
//             ctx.stroke();
//     }
//     if(numWrong==7){
//         ctx.fillRect(138, 90, 24, 24); //cover face
//         ctx.fillRect(118, 121.2, 70, 120); //cover body
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,108);
//             ctx.lineTo(160,108);
//             ctx.stroke();
//         ctx.beginPath(); //body
//             ctx.moveTo(150,135);
//             ctx.lineTo(150,205);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(150,150);
//             ctx.lineTo(180,175);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(150,150);
//             ctx.lineTo(120,175);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,203);
//             ctx.lineTo(180,245);
//             ctx.stroke();
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,203);
//             ctx.lineTo(120,245);
//             ctx.stroke();
//         ctx.lineWidth=2;
//         ctx.beginPath(); //left eye
//             ctx.moveTo(140,93);
//             ctx.lineTo(146,98);
//             ctx.stroke();
//             ctx.moveTo(140,98);
//             ctx.lineTo(146,93);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.moveTo(154,98);
//             ctx.lineTo(160,93);
//             ctx.stroke(); 
//             ctx.moveTo(154,93);
//             ctx.lineTo(160,98);
//             ctx.stroke();
//     }
//     if(numWrong==8){
//         ctx.fillRect(118, 135, 70, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(150,150);
//             ctx.lineTo(150,220);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(150,165);
//             ctx.lineTo(180,180);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(150,165);
//             ctx.lineTo(120,180);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,218);
//             ctx.lineTo(180,260);
//             ctx.stroke();
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,218);
//             ctx.lineTo(120,260);
//             ctx.stroke();
//     }
//     if(numWrong==9){
//         ctx.fillRect(118, 143, 70, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(150,165);
//             ctx.lineTo(150,235);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(150,180);
//             ctx.lineTo(180,195);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(150,180);
//             ctx.lineTo(120,195);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,232);
//             ctx.lineTo(180,270);
//             ctx.stroke();
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,232);
//             ctx.lineTo(120,270);
//             ctx.stroke();
//     }
//     if(numWrong==10){
//         ctx.fillRect(118, 148, 70, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(150,180);
//             ctx.lineTo(150,250);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(150,195);
//             ctx.lineTo(180,210);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(150,195);
//             ctx.lineTo(120,210);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,247);
//             ctx.lineTo(200,270);
//             ctx.stroke();
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,247);
//             ctx.lineTo(100,270);
//             ctx.stroke();
//     }
//     if(numWrong==11){
//         ctx.fillRect(90, 148, 120, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(200,195);
//             ctx.lineTo(150,268);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(191,210);
//             ctx.lineTo(220,245);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(191,210);
//             ctx.lineTo(145,237);
//             ctx.stroke();
//         ctx.beginPath(); //right leg
//             ctx.moveTo(149,268);
//             ctx.lineTo(210,268);
//             ctx.stroke();
//         ctx.beginPath(); //left leg
//             ctx.moveTo(151,268);
//             ctx.lineTo(90,268);
//             ctx.stroke();
//     }
//     if(numWrong==12){
//         ctx.fillRect(90, 145, 140, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(230,220);
//             ctx.lineTo(150,268);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(212,230);
//             ctx.lineTo(240,255);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(212,230);
//             ctx.lineTo(165,237);
//             ctx.stroke();
//     }
//     if(numWrong==13){
//         ctx.fillRect(90, 145, 160, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(245,255);
//             ctx.lineTo(150,268);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(225,255);
//             ctx.lineTo(255,268);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(225,255);
//             ctx.lineTo(185,250);
//             ctx.stroke();
//     }
//     if(numWrong==14){
//         ctx.fillRect(90, 145, 160, 120); //cover body
//         ctx.lineWidth=3;
//         ctx.beginPath(); //body
//             ctx.moveTo(245,264);
//             ctx.lineTo(150,268);
//             ctx.stroke();
//         ctx.beginPath(); //right arm
//             ctx.moveTo(225,268);
//             ctx.lineTo(255,268);
//             ctx.stroke();
//         ctx.beginPath(); //left arm
//             ctx.moveTo(225,264);
//             ctx.lineTo(185,264);
//             ctx.stroke();
//         ctx.fillRect(138, 90, 24, 24); //cover face
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,108);
//             ctx.lineTo(160,108);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//     }
//     if(numWrong==15){
//         ctx.fillRect(138, 102, 24, 12); //cover mouth
//         ctx.beginPath(); //mouth
//             ctx.arc(150, 103, 9, 0, Math.PI);
//             ctx.stroke();
//     }
//     if(numWrong==16){
//         ctx.fillRect(128, 78, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 120, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 115, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 115, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //mouth
//             ctx.arc(150, 123, 9, 0, Math.PI);
//             ctx.stroke();
//     }
//     if(numWrong==17){
//         ctx.fillRect(128, 98, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 140, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 135, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 135, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //mouth
//             ctx.arc(150, 143, 9, 0, Math.PI);
//             ctx.stroke();
//     }
//     if(numWrong==17){
//         ctx.fillRect(128, 118, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 160, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 155, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 155, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,168);
//             ctx.lineTo(160,168);
//             ctx.stroke();
//     }
//     if(numWrong==18){
//         ctx.fillRect(128, 138, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 180, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 175, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 175, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,188);
//             ctx.lineTo(160,188);
//             ctx.stroke();
//     }
//     if(numWrong==19){
//         ctx.fillRect(128, 158, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 200, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 195, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 195, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //sad mouth
//             ctx.arc(150, 213, 9, 0, Math.PI, true);
//             ctx.stroke();
//     }
//     if(numWrong==20){
//         ctx.fillRect(128, 178, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 220, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 215, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 215, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //sad mouth
//             ctx.arc(150, 233, 9, 0, Math.PI, true);
//             ctx.stroke();
//     }
//     if(numWrong==21){
//         ctx.fillRect(128, 198, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 240, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.arc(143, 235, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.arc(157, 235, 3.5, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //sad mouth
//             ctx.arc(150, 253, 9, 0, Math.PI, true);
//             ctx.stroke();
//     }
//     if(numWrong==22){
//         ctx.fillRect(128, 218, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(150, 243, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.moveTo(140,234);
//             ctx.lineTo(146,239);
//             ctx.stroke();
//             ctx.moveTo(140,239);
//             ctx.lineTo(146,234);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.moveTo(154,234);
//             ctx.lineTo(160,239);
//             ctx.stroke(); 
//             ctx.moveTo(154,239);
//             ctx.lineTo(160,234);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(140,250);
//             ctx.lineTo(160,250);
//             ctx.stroke();
//     }
//     if(numWrong==23){
//         ctx.fillRect(128, 220, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(129, 246, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.moveTo(115,245);
//             ctx.lineTo(121,250);
//             ctx.stroke();
//             ctx.moveTo(115,250);
//             ctx.lineTo(121,245);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.moveTo(120,234);
//             ctx.lineTo(126,239);
//             ctx.stroke(); 
//             ctx.moveTo(120,239);
//             ctx.lineTo(126,234);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(129,257);
//             ctx.lineTo(138,240);
//             ctx.stroke();
//     }
//     if(numWrong==24){
//         ctx.fillRect(106, 218, 45, 45); //cover head
//         ctx.fillRect(120, 261, 25, 5); //cover rest of head
//         ctx.beginPath(); //head
//             ctx.arc(108, 247, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.moveTo(105,257);
//             ctx.lineTo(111,262);
//             ctx.stroke();
//             ctx.moveTo(105,262);
//             ctx.lineTo(111,257);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.moveTo(94,248);
//             ctx.lineTo(100,253);
//             ctx.stroke(); 
//             ctx.moveTo(94,253);
//             ctx.lineTo(100,248);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(121,248);
//             ctx.lineTo(101,235);
//             ctx.stroke();
//     }
//     if(numWrong==25){
//         ctx.fillRect(86, 220, 45, 45); //cover head
//         ctx.beginPath(); //head
//             ctx.arc(87, 248, 20, 0, 2*Math.PI);
//             ctx.stroke();
//         ctx.beginPath(); //left eye
//             ctx.moveTo(78,250);
//             ctx.lineTo(84,256);
//             ctx.stroke();
//             ctx.moveTo(78,256);
//             ctx.lineTo(84,250);
//             ctx.stroke();
//         ctx.beginPath(); //right eye
//             ctx.moveTo(91,250);
//             ctx.lineTo(97,256);
//             ctx.stroke(); 
//             ctx.moveTo(91,256);
//             ctx.lineTo(97,250);
//             ctx.stroke();
//         ctx.beginPath(); //straight mouth
//             ctx.moveTo(77,240);
//             ctx.lineTo(97,240);
//             ctx.stroke();
//     }
// }
