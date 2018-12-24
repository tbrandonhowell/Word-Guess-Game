window.onload = function() {

// Create the list of answers
var transformers = [
    ["Megatron","Die, Autobots!","assets/images/megatron.jpeg"],
    ["Optimus Prime","Freedom is the right of all sentient beings.","assets/images/optimus_prime.jpg"],
    ["Springer","I've got better things to do tonight than die!","assets/images/springer.jpg"],
    ["Shockwave","Decepticons, we're under attack! Scramble!","assets/images/shockwave.jpg"],
    ["Starscream","Pathetic Fools! There's no escape!","assets/images/starscream.jpg"],
    ["Ultra Magnus","I can't deal with that right now.","assets/images/ultra_magnus.jpg"],
    ["Arcee","Then you probably didn't understand the situation.","assets/images/arcee.jpg"],
    ["Grimlock","Me Grimlock not \"nice dino\". Me mash brains!","assets/images/grimlock.jpg"],
    ["Wreck-Gar","Offer expires while you wait, operators are standing by.","assets/images/wreck-gar.jpg"],
    ["Soundwave","As you command, Megatron.","assets/images/soundwave.jpg"],
    ["Cyclonus","You want me to gut Ultra Magnus?","assets/images/cyclonus.jpg"],
    ["Unicron","For a time, I considered sparing your wretched little planet.","assets/images/unicron.jpeg"],
    ["Galvatron","I'll rip open Ultra Magnus, and every other Autobot, until the Matrix has been destroyed!","assets/images/galvatron.jpg"],
    ["Perceptor","Ultra Magnus, a cursory evaluation of Decepticon capability indicates a distinct tactical deficiency!","assets/images/perceptor.jpg"],
    ["Kup","Experience, lad. You should learn to appreciate it.","assets/images/kup.jpg"],
    ["Hot Rod","Hey, I wasn't worried for a microsecond.","assets/images/hot_rod.jpg"],
    ["Ratchet",".....","assets/images/ratchet.jpg"],
    ["Blaster","Optimus Prime, do you read me? The Decepticons are blitzing Autobot City, we're really taking a pounding. Don't know how much longer we can hold out.","assets/images/blaster.jpg"]
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
var losses = 0; // count of losses
var printAnswer = ""; // we'll use this to house the real-time output
var badGuess = []; // create the array that will hold the bad guesses
var guessesAllowed = 6; // we'll give the user six wrong guesses
var guessesLeft = guessesAllowed; // this will be our active variable for the count as it decreases
var gameArray = []; // create a new array that will be two dimension and include the answer + underscores
var lastAnswer; // will hold the previous answer so we can keep it in memory for the alert

function curAnswer() { // create function that can be called at any time to update the screen with the current contents of the secondary dimension of gameArray
    printAnswer = "";
    for(f=0;f<gameArray.length;f++) {
        printAnswer = printAnswer + gameArray[f][1]; // fill up the printAnswer string
    }
    document.getElementById("answer").innerHTML = printAnswer; // send it to the DOM
}

function updateStats() { // function to update remaining guesses count, and update incorrectly guessed letters
    document.getElementById("remaining").innerHTML = guessesLeft; // update guesses left
    document.getElementById("badguess").innerHTML = badGuess.join(", "); // add incorrect guesses to the badGuess array
    document.getElementById("losses").innerHTML = losses; // update # of losses
    document.getElementById("wins").innerHTML = wins; // update # of wins
}

// All the stuff needed to get a round started:
function newRound() {
    gameArray = []; //reset gameArray
    guessesLeft = guessesAllowed; // reset guessesLeft
    ranNum = Math.floor(Math.random() * (+max - +min)) + +min; // select our random number (need to study this a little more)
    answer = transformers[ranNum][0]; // set our answer using the random number referenced against our name array
    answerArray = (answer.toUpperCase().split("")); // explode the answer into an array
    // fill the gameArray with correct letter in the first field, and in the second field put underscores, except for spaces
    for(n=0;n<answerArray.length;n++) {
        if(answerArray[n] === " ") {
            pushData = [answerArray[n]," "];
            gameArray.push(pushData);
        } else {
            pushData = [answerArray[n],"_"];
            gameArray.push(pushData);
        }
    }
    badGuess = []; // reset the badGuess array
    curAnswer(); // update the answer on the screen
    updateStats(); // update remaining guesses and incorrect guess list
}

newRound(); // trigger once at the beginning to start the game
curAnswer(); // trigger once at the beginning to start the game
updateStats(); // trigger once at the beginning to start the game

// logging ------------------- logging 
console.log(min); 
console.log(max); 
console.log(ranNum); 
console.log(answer);
console.log(answerArray);
console.log(gameArray);
// logging ------------------- logging 

// look for the key press
document.onkeyup = function(event) {
	var keyPressed = event.key.toUpperCase(); // force to uppercase for matching
    console.log("Key Press: " + keyPressed);
    if( ($("#winnerModal").data('bs.modal') || {})._isShown === true || ($("#loserModal").data('bs.modal') || {})._isShown === true ) { // if the win/lose modal is live, use the keypress to clear the modal before accepting more input. I swiped this from https://stackoverflow.com/questions/19506672/how-to-check-if-bootstrap-modal-is-open-so-i-can-use-jquery-validate and don't quite understand how it works with the || operator
        console.log("modal is live");
        $("#winnerModal").modal("hide"); // close the modal
        $("#loserModal").modal("hide"); // close the modal
        // do nothing else
    } else if(badGuess.includes(keyPressed)){ // if the letter selected has already been picked once and is not part of the answer
        console.log("Already in badGuess");
        // stop. do nothing.
    } else { // so it's not already a bad guess, nor is the modal live, so continue on
        // loop through the gameArray to look for matches
        for (i=0;i<answerArray.length;i++) {
            if(keyPressed === gameArray[i][1]) { // if the letter selected is already in the second dimension
                // do nothing else
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
                console.log("Already correctly guessed this letter.");
            } else if(keyPressed === gameArray[i][0]) { // if the letter selected is in the primary dimension (i.e. we have a match)
                gameArray[i][1] = gameArray[i][0]; // write the guessed letter to the second dimension of that array entry
                var rightAnswer = true; // so the "not right answer" logic doesn't fire
                curAnswer(); // run the update function
            }
        }
        if(!rightAnswer) { //  so we've looped through the gameArray and no matches have been found (i.e. rightAnswer never got set to "true"
            if (keyPressed.match(/^[A-Z]$/)) { // if the keypress is one of the allowed characters, then
                guessesLeft = guessesLeft - 1; // decrement the guess counter 
                badGuess.push(keyPressed); // add entry to badGuess array
            }
            console.log("Bad Guess");
        }
        // loop through the array one last time; if no second dimension values are set to "_", then you know you've won the game
        for (x=0;x<gameArray.length;x++) {
            if(gameArray[x][1] === "_") { // if any underscores still exist, then
                var gameWon = false; // set this value to use in later logic that checks status of game
            } 
            if(gameWon !== false) { // this probably should have been done with an if/else
                gameWon = true;
            }
        }
        // logging ------------------- logging 
        console.log(gameArray);
        console.log(guessesLeft);
        // logging ------------------- logging 
    }
    updateStats(); // print # guesses and incorrect guesses to html
    if(guessesLeft <= 0){ // now we need the logic to end the game if you got too many wrong
        console.log("Game over. You lost.");
        losses = losses + 1;
        lastAnswer = answer;
        document.getElementById("wrongAnswer").innerHTML = answer;
        // document.getElementById("botName").innerHTML = answer;
        newRound(); // reset for the next round
        updateStats();
        $("#loserModal").modal(); // trigger the loser modal
    }
    if(gameWon === true) { // logic to end the game if you get them all right
        console.log("You won! Great job!");
        wins = wins + 1;
        lastAnswer = answer;
        document.getElementById("wins").innerHTML = wins; // update wins count in DOM
        document.getElementById("botName").innerHTML = answer;
        document.getElementById("botImage").innerHTML = "<img src=\"" + transformers[ranNum][2] + "\" class=\"img-fluid\">"; // update the image
        document.getElementById("botQuote").innerHTML = "\"" + transformers[ranNum][1] + "\""; // update the quote
        document.getElementById("rightAnswer").innerHTML = answer;
        newRound(); // reset for the next round
        updateStats(); $("#winnerModal").modal(); // trigger the winner modal
    }

} // close event watching

} // close onload