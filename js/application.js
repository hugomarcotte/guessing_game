
var randomNumber, numberOfGuess, maxNumberOfGuess, guesses;

var init = function (){

	// Set initial values
	maxNumberOfGuess = 5;
	numberOfGuess = 0;
	randomNumber = Math.floor((Math.random() * 100) + 1);
	guesses = [];

	// Reset state of txtbox
	var $txtNumber = $('#txtNumber');
	$txtNumber.val('');
	$txtNumber.removeAttr("disabled", "disabled"); 

	// Set current max nb of try
	$('#nbOfTry').text(maxNumberOfGuess);
	
	// Reset state of buttons
	$('#btnGuess').prop('disabled', false);
	$('#btnHint').prop('disabled', false);

	var $btnPlayAgain = $('#btnPlayAgain');
	$btnPlayAgain.removeClass('btn-primary');	
	$btnPlayAgain.addClass('btn-default');
	$btnPlayAgain.text('Reset');

	$('#frmGuess').show();
	$('#imgThumb').hide();

	$('#hintsDiv').empty();

};

var endGame = function(userWon){

	if(userWon){
		$('#frmGuess').hide();
		$('#spnAnswer').text(randomNumber);
		$('#imgThumb').show('slow');
	}
	
	// Disable buttons and txt box
	$('#btnGuess').prop('disabled', true);
	$('#btnHint').prop('disabled', true);
	$('#txtNumber').attr("disabled", "disabled"); 

	// Highlight the play again button and change text
	var $btnPlayAgain = $('#btnPlayAgain')
	$btnPlayAgain.removeClass('btn-default');
	$btnPlayAgain.addClass('btn-primary');
	$btnPlayAgain.text('Play Again!');
}

var guess = function (){

	var $inputTxt =  $('#txtNumber').val();
	var validationStatus = validateInteger1to100($inputTxt);

	// If input is valid
	if(validationStatus[0]){

		var inputNumber = Number($inputTxt);

		// Check if the guess is a repeat
		if(guesses.indexOf($inputTxt) < 0){
			guesses.push($inputTxt);
			numberOfGuess++;	

			// If User guess right
			if(inputNumber === randomNumber){
				endGame(true);
			}
			else{

				// If the user is out of guesses
				if(numberOfGuess === maxNumberOfGuess){
					showStatusMessage("Game Over! You're out of guesses.",'black');
					endGame(false);
				}
				else{

					var gap = randomNumber - inputNumber;
					var absGap = Math.abs(gap);
					var hintMsg = '';

					// Define hint message (Guess lower or higher)
					if (gap < 0){
						hintMsg = 'Guess lower.';
					}
					else{
						hintMsg = 'Guess higher.';
					}

					// On the first guess
					if(guesses.length === 1){

						// Show ice cold, cold, warm, hot or super hot message depending on the guess
						if(absGap >= 80){
							addHintToList(inputNumber, 'You are ice cold! ' + hintMsg, 'blue');	
						}
						else if(absGap >= 60 && absGap < 80 ){
							addHintToList(inputNumber, 'You are cold! ' + hintMsg, 'blue');
						}
						else if(absGap >= 40 && absGap < 60 ){
							addHintToList(inputNumber, 'You are warm! ' + hintMsg, 'orange');
						}
						else if(absGap >= 20 && absGap < 40 ){
							addHintToList(inputNumber, 'You are hot! ' + hintMsg, 'red');
						}
						else if(absGap >= 1 && absGap < 20 ){
							addHintToList(inputNumber, 'You are super hot! ' + hintMsg, 'red');
						}
						else{
							console.log("Something's wrong with validation in this program.")
						}
					}
					// On subsequent guesses
					else{
						// Caculate diff between previous guess and the answer
						var prevAbsGap = Math.abs(randomNumber - guesses[guesses.length-2]);

						// If the diff between new value and answer is lower than diff between prev value and answer
						if(absGap < prevAbsGap) { 
							addHintToList(inputNumber, 'You are getting warmer! ' + hintMsg, 'orange'); 
						}
						else { 
							addHintToList(inputNumber, 'You are getting colder! ' + hintMsg, 'blue'); 
						}

					}
				}
							
			}
		}
		// If it is a repeat guess		
		else
		{
			showStatusMessage("You already tried this number. We'll be nice and not count it.",'black');
		}

	}
	// If input is invalid
	else{
		showStatusMessage(validationStatus[1], 'red');
	}
};

// Show a status message to the user
// message: string {the message to display}
// color: string {color to show the message in}
var showStatusMessage = function(message, color) {
	var $statusDiv = $('#statusDiv');
	var $statusSpan = $statusDiv.find('span');

	$statusSpan.css('color', color);
	$statusSpan.text(message);

	$statusDiv.show();
}

// Function that takes a text input and return an array cotaining
// whether the input is an integer between 1 and 100 and an error message
// input: string
// return: [boolean,string]
var validateInteger1to100 = function(input){
	
	if(!input.match(/^\d+$/) || input < 0 || input > 100){
		return [false,'ERROR: The value entered is not an integer between 1 and 100. Try again.'];		
	}
	else{
		return [true,''];
	}
};

var addHintToList = function(input, hint, color){

	$('#hintsDiv').prepend('<h5 style="color:'+color+';font-weight:bold">'+ input +' : '+ hint +'</h5>');	
}

// Main on page load
$(function(){

	init();
	$('#statusDiv').hide();

	$('#btnGuess').on('click', guess);

	$('#txtNumber').on('focus', function(){

		$(this).val('');
		$('#statusDiv').hide('slow');
		
	});

	$('#txtNumber').on('keydown', function(e){
		$('#statusDiv').hide('slow');
	});
		

	$('#btnPlayAgain').on('click', function(){
		showStatusMessage('The game has been reset.', 'black')
		init();
	});

	$('#btnHint').on('click', function(){
		showStatusMessage('The answer was '+ randomNumber +'. Play again!', 'black');
		endGame(false);
	});

	$('#frmGuess').on('submit', function(event){
		event.preventDefault();
		$('#btnGuess').click();
	});

});