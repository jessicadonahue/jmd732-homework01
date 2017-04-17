/**
 * game.js 
 * @author Jessica Donahue <here@foo.bar.baz>
 */ 

var tic = require('./tic-tac-toe.js');
var readlineSync = require('readline-sync');

var computerMoves = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;


//var answer = readlineSync.question("Would you like to play a game of TIC TAC TOE?! ");
console.log("Lets play a game of TIC-TAC-TOE!!");
console.log("");

var ask = true;
while (ask == true) {
	var width = readlineSync.question("How wide should the board be? (1-26)? ");

	width = parseInt(width);

	if (width >= 0 && width <= 26 ) {
		ask = false;
	}

}

var ask = true;
while (ask == true ) {
	var userLetter = readlineSync.question("Pick your letter: X or O ");

	if (userLetter == "X" || userLetter == "O") {
		ask = false;
	}
}

console.log("Player is " + userLetter);

var board = tic.generateBoard(width, width, " ");
var drawing = tic.boardToString(board);
console.log(drawing);

//letter is holding O
var turn = userLetter;

//lets alternate between computer and user 
var game = true;
if( userLetter == "O") {
	var compLetter = "X";
}
else {
	var compLetter = "O";
}

while (game == true) {


	//if the user picked O's, then the computer goes first
	if (turn == "O") {

		readlineSync.question("Press <ENTER> to show computer's move...");

		        
		// the move the computer will make
		var move; 

		// do we have an Array of scripted moves and are there moves left?
		if(computerMoves && computerMoves.length > 0) {
		    var arr = computerMoves.splice(0, 1)[0];
		    console.log("we have args");
		    // make sure it's a valid move!
		    if(tic.isValidMove(board, arr[0], arr[1])) {
		        move = {'row':arr[0], 'col':arr[1]};
		    }
			// if it's not valid, move remains undefined
			else {

				move = tic.indexToRowCol(board, tic.getRandomEmptyCellIndex(board));

			}
		}

		// if we still don't have a valid move, just get a random empty square
		else {
		    move = tic.indexToRowCol(board, tic.getRandomEmptyCellIndex(board));
		}

		board = tic.setBoardCell(board, compLetter, move.row, move.col);
		console.log(tic.boardToString(board));

		turn = "X";
	}

	//user picked X's 
	else {
		

		var ask = true;
		while (ask == true) {
			var userAlgNot = readlineSync.question("What's your move? ");
			//is it a valid algebraic notation
			if(tic.algebraicToRowCol(userAlgNot) == undefined || tic.isValidMoveAlgebraicNotation(board, userAlgNot) == false) {
				console.log("Your move must be in algebraic notation, and it must specity an existing cell!");
			}
			else {
				board = tic.placeLetter(board, userLetter, userAlgNot);

				console.log(tic.boardToString(board));
				ask = false;
			}
		}

		turn = "O";


	}


	//check if someone has won
	if(tic.getWinnerRows(board) == "X" || tic.getWinnerRows(board) == "O" ) {
		var winner = tic.getWinnerRows(board);
		if (winner == compLetter) {
			console.log("Computer won!!");
			game = false;
		}
		else {
			console.log("Player won!!");
			game = false;
		}
	}

	else if(tic.getWinnerCols(board) == "X" || tic.getWinnerCols(board) == "O" ) {
		var winner = tic.getWinnerCols(board);
		if (winner == compLetter) {
			console.log("Computer won!!");
			game = false;
		}
		else {
			console.log("Player won!!");
			game = false;
		}
	}

	else if(tic.getWinnerDiagonals(board) == "X" || tic.getWinnerDiagonals(board) == "O" ) {
		var winner = tic.getWinnerDiagonals(board);
		if (winner == compLetter) {
			console.log("Computer won!!");
			game = false;
		}
		else {
			console.log("Player won!!");
			game = false;
		}
	}

	//Check if it is full
	else if (tic.isBoardFull(board)) {
		console.log("It's a draw!");
		game = false;
	}


}

//Last edit: 9/15 5:40




















