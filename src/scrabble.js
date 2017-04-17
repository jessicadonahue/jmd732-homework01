/* *
 * scrabble.js 
 * @author Jessica Donahue <here@foo.bar.baz>
 */ 

//Point values for each letter stored in this object 
var letterValues = { 
        "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1, 
        "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4, 
        "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10 
};

var readline = require('readline');
var fs = require('fs');

var fileName = '../data/enable1.txt';


//Set up a readline object that can be used for reading data from a file
//ine by line
fileInput = readline.createInterface({ 
    input: fs.createReadStream(fileName)
});

//Array that holds all the words from the word list 
var words = [];

//Pushs every word from the word list onto the array "words"
fileInput.on('line', function (line) {

	words.push(line);


});


//Use readline to ask user for input
var userPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});


//ask a question
userPrompt.question("Please enter some letters: " , handleUserInput);


//create array that will store winning word objects (word/score)
var winningWords = [];

//the callback function that's run when the readline object recieves input
function handleUserInput(userWord) {
    
    userPrompt.close();
    
    //make a copy of the user input --> turn into array of its characters 
    var copy = userWord;
    copy = userWord.split("");
    

    //go through every word in the word list
    for (var i = 0; i < words.length; i++) {

    	// word from word list 
    	var word = words[i];


    	//make a copy of the user input --> turn into array of its characters 
    	var copy = userWord;
    	copy = userWord.split("");


    	var exists = true;
    	//go through every letter in the word from the word list 
    	for (var j = 0; j < word.length; j++) {
    		var currentLetter = word[j];
    	
    		//if the letter from word exists in copy, remove it from copy 
    		if (copy.indexOf(currentLetter) !== -1) {

    			var index = copy.indexOf(currentLetter);
    			
    			//remove letter at index found in copy
    			copy.splice(index, 1);

    		}
    		//if the letter is not found in copy, then we know that the word cannot 
    		//be found from the user's word 
    		else {
    			
    			exists = false;
    		}

    	}//endFor
    	if (exists == true) {

    		//figure out word's score
    		var score = 0;
    		for (var k = 0; k < word.length; k++) {
    			var letter = word[k];
    			letter = letter.toUpperCase();

    			score += letterValues[letter];
    		}

    		//create word object with word and score
        	var good = {"word": word, "score": score};
        	//console.log(good.word);

       		//push word object into array holding winning words 
        	winningWords.push(good);
    	}//endif

    }//end for loop through every word in word list 


    //sort winning words from highest to lowest 
	winningWords.sort(function(a, b) {
	    // if a is less than b, then a should be after b 
	    if(a.score < b.score) {
	        return 1;
	    } else if(a.score > b.score) {
	        return -1;
	    } else {
	        return 0;
	    }
	});

	//now that is sorted from highest to lowest, print out top 5 scores 
	//so print out the first 5 elements of the array 
	console.log("");
	console.log("The top scoring words are: ");
	if (winningWords.length < 5 ) {

		for (var i = 0; i < winningWords.length; i++) {
			console.log(winningWords[i].score + " - " + winningWords[i].word);
		}
	}

	else {
		for (var i = 0; i < 5; i++) {
			console.log(winningWords[i].score + " - " + winningWords[i].word);
		}

	}

}


//Last edit: 9/15 5:40





























