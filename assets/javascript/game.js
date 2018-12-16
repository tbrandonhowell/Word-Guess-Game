// Create the list of answers
var transformers = [
"Megatron",
"Optimus Prime",
"Shockwave",
"Bumblebee",
"Ironhide",
"Starscream",
"Wheeljack",
"Prowl",
"Ultra Magnus",
"Arcee",
"Powerglide",
"Omega Supreme",
"Grimlock",
"Wreck-Gar",
"Soundwave",
"Skywarp",
"Thundercracker",
"Cyclonus",
"Unicron",
"Scourge",
"Galvatron",
"Blitzwing",
"Triggerhappy",
"Slugslinger"
];

console.log(transformers);

var min = 0; // set floor for random integer
var max = transformers.length; // set max for random integer
var ranNum; // initiate the variable we will use to store the random number
var answer; // initiate the holder for the transformer name
var answerArray = []; // initiate the holder array for exploding the name
var gameWon; // we'll use this later to see if all the right answers have been given and end the game. it's starting as undefined on purpose

// need to study this more so I understand the syntax:
ranNum = Math.floor(Math.random() * (+max - +min)) + +min; // select our random number

// logging ------------------- logging 
console.log(min); 
console.log(max); 
console.log(ranNum); 
// logging ------------------- logging

answer = transformers[ranNum]; // set our answer using the random number referenced against our name array

// logging ------------------- logging
console.log(answer);
// logging ------------------- logging

answerArray = (answer.toUpperCase().split("")); // explode the answer into an array

// logging ------------------- logging
console.log(answerArray);
// logging ------------------- logging

var gameArray = []; // create a new array that will be two dimension and include the answer + underscores

// fill the gameArray
for(n=0;n<answerArray.length;n++) {
    if(answerArray[n] === " ") {
        pushData = [answerArray[n]," "];
        gameArray.push(pushData);
    } else {
        pushData = [answerArray[n],"_"];
        gameArray.push(pushData);
    }
}

// logging ------------------- logging
console.log(gameArray);
// logging ------------------- logging

var guess; // create the "guess" var that will hold the current guess
var badGuess = []; // create the array that will hold the bad guesses
var guessesAllowed = 6; // we'll give the user six wrong guesses
var guessesLeft = guessesAllowed; // this will be our active variable for the count as it decreases

// logging ------------------- logging
if (gameArray[0].includes("M")) { console.log("Included"); }
// logging ------------------- logging

document.onkeyup = function(event) {
	var keyPressed = event.key.toUpperCase();
	console.log("Key Press: " + keyPressed);
    if(badGuess.includes(keyPressed)){
        console.log("Already in badGuess");
        // stop. do nothing.
    } /* else if ( 0 = 1 ) {
// need to check against correct answers as well
    } */ else {
        // loop through the gameArray to look for a match
        for (i=0;i<answerArray.length;i++) {
            if(keyPressed === gameArray[i][1]) {
                // do nothing.
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
                console.log("Already correctly guessed this letter.");
            } else if(keyPressed === gameArray[i][0]) {
                // write the guessed letter to the second dimension of that array entry
                // console.log("You've got a match!");
                gameArray[i][1] = gameArray[i][0];
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
            }
        }
        if(!rightAnswer) { // if not a correct guess
            guessesLeft = guessesLeft - 1; // decrement the guess counter 
            badGuess.push(keyPressed); // add entry to badGuess
            console.log("Bad Guess");
        }
        // loop through the array one last time; if no second dimension values are set to "_", then you've won the game
        // feels like there's got to be a cleaner way to do this check
        for (x=0;x<gameArray.length;x++) {
            if(gameArray[x][1] === "_") {
                var gameWon = false; // set this value to use in later logic that checks status of game
            }
            if(gameWon !== false) {
                gameWon = true;
            }
        }
        console.log(gameArray);
        console.log(guessesLeft);
        console.log(badGuess);
        console.log("Game won: " + gameWon);
        
        // something needs to check to make sure the 
    }

    if(guessesLeft <= 0){ // now we need the logic to end the game if you got too many wrong
        console.log("Game over. You lost.");
    }
    if(gameWon === true) { // logic to end the game if you get them all right
        console.log("You won! Great job!");
    }
    
    
    // needs to be some sort of command to update some data on the screen
}

