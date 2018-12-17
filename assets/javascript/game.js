window.onload = function() {

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

// logging ------------------- logging 
console.log(transformers);
// logging ------------------- logging 

var min = 0; // set floor for random integer
var max = transformers.length; // set max for random integer
var ranNum; // initiate the variable we will use to store the random number
var answer; // initiate the holder for the transformer name
var answerArray = []; // initiate the holder array for exploding the name
var gameWon; // we'll use this later to see if all the right answers have been given and end the game. it's starting as undefined on purpose
var wins = 0; // count of wins
var losses; // count of losses
var printAnswer = ""; // we'll use this to house to real-time output
var guess; // create the "guess" var that will hold the current guess
var badGuess = []; // create the array that will hold the bad guesses
var guessesAllowed = 6; // we'll give the user six wrong guesses
var guessesLeft = guessesAllowed; // this will be our active variable for the count as it decreases
var gameArray = []; // create a new array that will be two dimension and include the answer + underscores

function curAnswer() { // create function that can be called at any time to update the screen with the current contents of the secondary dimension of gameArray
    printAnswer = "";
    for(f=0;f<gameArray.length;f++) {
        printAnswer = printAnswer + gameArray[f][1]; // fill up the printAnswer string
    }
    document.getElementById("answer").innerHTML = printAnswer; // send it to the DOM
}

function updateStats() { // function to update remaining guesses count, and update incorrectly guessed letters
    document.getElementById("remaining").innerHTML = guessesLeft; // update guesses left
    document.getElementById("badguess").innerHTML = badGuess.join(", ");
}

// All the stuff needed to get a round started:
// (I need to study this Math.random stuff more so I understand the syntax):
function newRound() {
    gameArray = []; //reset gameArray
    guessesLeft = guessesAllowed; // reset guessesLeft
    ranNum = Math.floor(Math.random() * (+max - +min)) + +min; // select our random number
    answer = transformers[ranNum]; // set our answer using the random number referenced against our name array
    answerArray = (answer.toUpperCase().split("")); // explode the answer into an array
    // fill the gameArray with underscores, except for spaces
    for(n=0;n<answerArray.length;n++) {
        if(answerArray[n] === " ") {
            pushData = [answerArray[n]," "];
            gameArray.push(pushData);
        } else {
            pushData = [answerArray[n],"_"];
            gameArray.push(pushData);
        }
    }
    badGuess = []; // reset the badGues array
    curAnswer(); // update the answer on the screen
    updateStats(); // update remaining guesses and incorrect guess list
}

newRound();



// logging ------------------- logging 
console.log(min); 
console.log(max); 
console.log(ranNum); 
console.log(answer);
console.log(answerArray);
// logging ------------------- logging




curAnswer();



updateStats();

// logging ------------------- logging
console.log(gameArray);
// logging ------------------- logging



// logging ------------------- logging
// if (gameArray[0].includes("M")) { console.log("Included"); }
// logging ------------------- logging

document.onkeyup = function(event) {
	var keyPressed = event.key.toUpperCase();
	console.log("Key Press: " + keyPressed);
    if(badGuess.includes(keyPressed)){ // if the letter selected has already been picked once and is not part of the answer
        console.log("Already in badGuess");
        // stop. do nothing.
    } /* else if ( 0 = 1 ) {
// need to check against correct answers as well
    } */ else {
        // loop through the gameArray to look for a match
        for (i=0;i<answerArray.length;i++) {
            if(keyPressed === gameArray[i][1]) { // if the letter selected is already in the second dimension
                // do nothing.
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
                console.log("Already correctly guessed this letter.");
            } else if(keyPressed === gameArray[i][0]) { // if the letter selected is in the primary dimension (i.e. we have a match)
                gameArray[i][1] = gameArray[i][0]; // write the guessed letter to the second dimension of that array entry
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
                curAnswer(); // run the update function
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
    updateStats(); // print # guesses and incorrect guesses to html
    if(guessesLeft <= 0){ // now we need the logic to end the game if you got too many wrong
        console.log("Game over. You lost.");
    }
    if(gameWon === true) { // logic to end the game if you get them all right
        console.log("You won! Great job!");
        wins = wins + 1;
        document.getElementById("wins").innerHTML = wins; 
        document.getElementById("botName").innerHTML = answer;
        // document.getElementById("botFaction").innerHTML = 
        // document.getElementById("botImage").innerHTML = 
        // document.getElementById("botQuote").innerHTML = 
        newRound(); // reset for the next round
        updateStats(); 
    }
    
    
    // needs to be some sort of command to update some data on the screen
}

} // close onload