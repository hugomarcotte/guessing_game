
var randomNumber, numberOfGuess, maxNumberOfGuess;

var init = function (){
	maxNumberOfGuess = 5;
	numberOfGuess = 0;
	randomNumber = Math.floor((Math.random() * 100) + 1);

	$('#txtNumber').val('');
	$('#btnGuess').prop('disabled', false);
	$('#btnHint').prop('disabled', false);
	$('#btnPlayAgain').removeClass('btn-primary');
	$('#btnPlayAgain').addClass('btn-default');

};

var endGame = function(){
	$('#btnGuess').prop('disabled', true);
	$('#btnHint').prop('disabled', true);
	$('#btnPlayAgain').removeClass('btn-default');
	$('#btnPlayAgain').addClass('btn-primary');
}


var guess = function (){

	var inputTxt =  $('#txtNumber').val();

	var validationStatus = validateInteger1to100(inputTxt);

	if(validationStatus[0]){

		var inputNumber = Number(inputTxt);
		numberOfGuess++;

		// If User guess right
		if(inputNumber === randomNumber){
			showStatusMessage('Congratulation you won!','green');
			endGame();
		}
		else{

			// If no more guesses
			if(numberOfGuess === maxNumberOfGuess){
				showStatusMessage("Game Over! You're out of guesses...",'red');
				endGame();
			}
			else{

				var gap = randomNumber - inputNumber;
				var absGap = Math.abs(gap);
				var hintMsg = '';

				if (gap < 0){
					hintMsg = 'Guess lower.';
				}
				else{
					hintMsg = 'Guess higher.';
				}

				if(absGap >= 80){
					showStatusMessage('You are ice cold! ' + hintMsg, 'blue');	
				}
				else if(absGap >= 60 && absGap < 80 ){
					showStatusMessage('You are cold! ' + hintMsg, 'blue');	
				}
				else if(absGap >= 40 && absGap < 60 ){
					showStatusMessage('You are warm! ' + hintMsg, 'yellow');	
				}
				else if(absGap >= 20 && absGap < 40 ){
					showStatusMessage('You are hot! ' + hintMsg, 'orange');	
				}
				else if(absGap >= 1 && absGap < 20 ){
					showStatusMessage('You are super hot! ' + hintMsg, 'orange');
				}
				else{
					showStatusMessage('inputNumber:'+ numberOfGuess + " random number:"+randomNumber+ " gap:"+gap, 'green');
				}
			}
		}

	}
	else{
		showStatusMessage(validationStatus[1], 'red');
	}
};

// Show a status message to the user
// message: string {the message to display}
// color: string {color to show the message in}
var showStatusMessage = function(message, color) {
	var statusDiv = $('#statusDiv');
	var statusSpan = statusDiv.find('span');

	statusSpan.css('color', color);
	statusSpan.text(message);

	statusDiv.show();
}

// Function that takes a text input and return an array cotaining
// whether the input is an integer between 1 and 100 and an error message
// input: string
// return: [boolean,string]
var validateInteger1to100 = function(input){
	
	if(!input.match(/^\d+$/)){
		return [false,'The value entered is not an integer. Try again.'];		
	}
	else if(input < 0 || input > 100){
		return [false,'The number must be between 1 and 100. Try again.'];
	}
	else{
		return [true,''];
	}
};


// 
$(function(){

	init();
	$('#statusDiv').hide();

	$('#btnGuess').on('click', guess);

	$('#txtNumber').on('focus', function(){
		$(this).val('');
		$('#statusDiv').hide('slow');
	});

	$('#btnPlayAgain').on('click', function(event){
		event.preventDefault();
		showStatusMessage('The game has been reinitialized. Play again!', 'green')
		init();
	});

});