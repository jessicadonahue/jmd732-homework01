/**
 * tic-tac-toe.js 
 * @author Jessica Donahue <here@foo.bar.baz>
 */ 


function repeat (value, n) {

	var arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(value);
	}

	return arr;

}


function generateBoard(rows, columns, initialCellValue) {
	var length = rows * columns;
	var arr = repeat(initialCellValue, length);

	return arr;

}


function rowColToIndex(board, rowNumber, columnNumber) {

	var length = Math.sqrt(board.length);
	var index = columnNumber + (rowNumber * length);

	return index;
}


function indexToRowCol(board, i) {


	var length = Math.sqrt(board.length);
	var row = Math.floor(i / length);

	if (row === 0 ) {
		var col = i;
	}
	else {
		var col = i % (length * row);
	}

	var rowCol = {row:row, col:col};
	return rowCol;
}


function setBoardCell(board, letter, row, col) {

	var index = rowColToIndex(board, row, col);
	var newBoard = board.slice(0);
	newBoard[index] = letter;

	return newBoard;
}



function algebraicToRowCol(algebraicNotation) {
	var good = true;
	//CHECKS: first check to see if every character is numeric 
	for (var i = 0; i < algebraicNotation.length; i++) {

		var character = algebraicNotation.charAt(i);

		// if the character is not a number 
		if ( isNaN( character ) ) {

			//if the character is a letter and its the first index - we are fine 
			if (algebraicNotation.charCodeAt(i) >= 65 || algebraicNotation <= 90) {

				//make sure its just the first index
				if (i !== 0) {
					good = false;
				}

			}

			
			//else this is bad
			else {
				good = false;
			}
			
		}	
		//it is a number! but we dont want the first index to be a number
		else {
			if (algebraicNotation.charCodeAt(i) == 32) {
				good = false;
			}
			else if (i == 0) {
				good = false;
			}
		}
	}
	//CHECK 2: check length
	if (algebraicNotation.length < 2 || algebraicNotation.length > 3) {
		good = false;
	}

	if (good == true) {
		//ROW: grab letter from first position of string
		var letter = algebraicNotation.charCodeAt(0);
		var row = letter - 65;

		//COL: grab number from position 1 to 2
		if (algebraicNotation.length == 2) {

			var col = algebraicNotation.charAt(1) - 1;

		}
		else if (algebraicNotation.length > 2) {

			var col = algebraicNotation.slice(1, 3) - 1;
		}

		var obj = {row: row, col: col};

		return obj;
	}
	else {
		return undefined;
	}
}


function placeLetter(board, letter, algebraicNotation) {

	//get object with row and col 
	var place = algebraicToRowCol(algebraicNotation);
	var arr = setBoardCell(board, letter, place.row, place.col);

	return arr;
}


function boardToString(board) {
	var rows = Math.sqrt(board.length);
	var cols = Math.sqrt(board.length);

	var drawing = "";

	// (1) draw the top row with column numbers
	drawing +="     ";
	for (var i = 0; i < cols; i++) {
		drawing += (i + 1) + "   ";	
	}
	drawing += "  \n   ";
	for (var i = 0; i < cols; i++) {
		drawing += "+---";	
	}
	drawing += "+\n ";

	//(2) draw rows that follow with row numbers 
	for (var i = 0; i < rows; i++) {

		//write the row character 
		var ch = String.fromCharCode(65 + i);
		drawing += ch + " ";

		//then add the contents of that row 
		for (var inner = 0; inner < rows; inner++) {
			//console.log(inner + (3 * i));
			drawing += "| " + board[inner + (rows * i)] + " ";
		}

		//drawing += "|\n   +---+---+---+\n ";
		drawing += "|\n   ";

		for (var inner = 0; inner < rows; inner++) {
			drawing += "+---";
		}
		drawing += "+\n ";	
	}

	return drawing;


}


function getWinnerRows(board) {
	var rows = Math.sqrt(board.length);

	//var hasWinner = true;
	//var current = "X";

	for (var row = 0; row < rows; row++) {
		var hasWinner = true;

		var current = board[rowColToIndex(board, row, 0)];

		for (var col = 0; col < rows; col++) {
			
			
			//if the two consecutive spaces arent the same 
			if (current !== board[ rowColToIndex(board, row, col)]) {
				hasWinner = false;
			}

			//if they are equal but they are both empty spaces, no winner 
			if (current == board[ rowColToIndex(board, row, col)]) {

				if (current !== "X" && current !== "O") {
					//console.log("here");
					hasWinner = false;
				}	

			}
		
		}
		if (hasWinner == true) {
			
			break;
		}
	}

	if (hasWinner == false) {
		//console.log("no winner");
		return undefined;
	}
	else {
		
		return current;
	}

}


function getWinnerCols(board) {
	var rows = Math.sqrt(board.length);


	for (var row = 0; row < rows; row++) {
		var hasWinner = true;

		var current = board[rowColToIndex(board, 0, row)];

		for (var col = 0; col < rows; col++) {
		
			
			//if the two consecutive spaces arent the same 
			if (current !== board[ rowColToIndex(board, col, row)]) {
				hasWinner = false;
			}

			//if they are equal but they are both empty spaces, no winner 
			if (current == board[ rowColToIndex(board, col, row)]) {

				if (current !== "X" && current !== "O") {
					hasWinner = false;
				}	

			}
		
		}
		if (hasWinner == true) {
			break;
		}
	}

	if (hasWinner == false) {
		return undefined;
	}
	else {
		
		return current;
	}
}

function getWinnerDiagonals(board) {

	// (1) Check upper left to lower right diagnol
	var rows = Math.sqrt(board.length);

	var hasWinner1 = true;
	var hasWinner2 = true;
	var current1 = board[rowColToIndex(board, 0, 0)];
	var current2 = board[rowColToIndex(board, 0, rows - 1)];
	//for loop goes through how many times of rows (3)
	for (var col = 0; col < rows; col++) {
		
		//if the two consecutive spaces arent the same 
		if (current1 !== board[ rowColToIndex(board, col, col)]) {
			hasWinner1 = false;
		}//endif
		
		if( current2 !== board[rowColToIndex(board, col, ((rows - 1) - col)   )]) {
			hasWinner2 = false;
		} 

		//if they are equal but they are both empty spaces, no winner 
		if (current1 == board[ rowColToIndex(board, col, col)]) {

			if (current1 !== "X" && current1 !== "O") {
				//console.log("here");
				hasWinner1 = false;
			}	

		}//endif
		
		//if they are equal but they are both empty spaces, no winner 
		if (current2 == board[ rowColToIndex(board, col, ((rows - 1) - col)   )]) {

			if (current2 !== "X" && current2 !== "O") {
				//console.log("here");
				hasWinner2 = false;
			}	

		}//endif 
		
	}//endfor

	if (hasWinner1 == true) {
		return current1;
	}
	else if (hasWinner2 == true) {
		return current2;
	}
	else {
		return undefined;
	}
	
}


function isBoardFull(board) {

	var full = true;

	for (var i = 0; i < board.length; i++) {
		if (board[i] !== "X" && board[i] !== "O") {
			full = false;
		}
	}

	if (full == true) {
		return true;
	}
	else {
		return false;
	}
}

function isValidMove(board, row, col) {
	var valid = true;
	var index = rowColToIndex(board, row, col);

	var width = Math.sqrt(board.length);

	//if there is already an X or O there - not valid
	if (board[index] == "X" || board[index] == "O") {
		valid = false;
	}

	if (row >= width || col >= width || row < 0 || col < 0) {
		valid = false;
	}

	if (valid == true) {
		return true;
	}
	else {
		return false;
	}

}

function isValidMoveAlgebraicNotation(board, algebraicNotation) {

	var object = algebraicToRowCol(algebraicNotation);
	var row = object.row;
	var col = object.col;

	var valid = isValidMove(board, row, col);

	if (valid == true) {
		return true;
	}
	else {
		return false;
	}
}

function getRandomEmptyCellIndex(board) {

	if (isBoardFull(board)) {
		return undefined;
	}
	else {
		var arr = [];

		for (var i = 0; i < board.length; i++) {
			if (board[i] !== "X" && board[i] !== "O") {
				arr.push(i);
			}

		}

		if (arr.length == 1) {
			return arr[0];
		}
		else {
			var rand = arr[Math.floor(Math.random() * arr.length)];
			return rand;
		}

	}


}


module.exports = {
	repeat: repeat,
	generateBoard: generateBoard,
	rowColToIndex: rowColToIndex, 
	indexToRowCol: indexToRowCol,
	setBoardCell: setBoardCell,
	algebraicToRowCol: algebraicToRowCol,
	placeLetter: placeLetter,
	boardToString: boardToString, 
	getWinnerRows: getWinnerRows,
	getWinnerCols: getWinnerCols,
	getWinnerDiagonals: getWinnerDiagonals,
	isBoardFull: isBoardFull, 
	isValidMove: isValidMove,
	isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
	getRandomEmptyCellIndex: getRandomEmptyCellIndex,
	
};



//Last edit: 9/15 5:40


























