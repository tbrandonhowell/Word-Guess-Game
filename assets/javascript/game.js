window.onload = function() {

// Create the list of answers
var transformers = [
    ["Megatron","Die, Autobots!","https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/transformers-main.jpeg?itok=uirXM5Fw"],
    ["Optimus Prime","Freedom is the right of all sentient beings.","https://www.comingsoon.net/assets/uploads/2018/08/Transformers_The_Movie_-_Optimus_Prime.jpg"],
    ["Springer","I've got better things to do tonight than die!","https://2.bp.blogspot.com/-z2pEnf9F6HM/WHOK99BJwTI/AAAAAAAActQ/j-4jZ07xJMckpCjjIpLdBMbIs8-RHVOtgCK4B/s320/2.jpg"],
    ["Shockwave","Decepticons, we're under attack! Scramble!","http://1.bp.blogspot.com/-flFXZwk_jsI/URYdyPMjIuI/AAAAAAAAAUE/qjO8WDhRXYM/s1600/PDVD_037.BMP"],
    ["Starscream","Pathetic Fools! There's no escape!","http://www.cornel1801.com/animated/Transformers-The-Movie-1986/pictures/35.jpg"],
    ["Ultra Magnus","I can't deal with that right now.","https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/ultra-magnus-transformers-1.23.jpg"],
    ["Arcee","Then you probably didn't understand the situation.","http://bwtf.com/toyreview-images/generations/arcee/cartoon-blaster.jpg"],
    ["Grimlock","Me Grimlock not \"nice dino\". Me mash brains!","http://tfarchive.com/fandom/features/thirtieth-anniversary/thirty-greatest-characters/characters/06_Grimlock_2.jpg"],
    ["Wreck-Gar","Offer expires while you wait, operators are standing by.","http://www.cornel1801.com/animated/Transformers-The-Movie-1986/pictures/75.jpg"],
    ["Soundwave","As you command, Megatron.","https://tfwiki.net/mediawiki/images2/thumb/b/b6/Soundwave_and_company.jpg/350px-Soundwave_and_company.jpg"],
    ["Cyclonus","You want me to gut Ultra Magnus?","https://tfwiki.net/mediawiki/images2/thumb/5/50/Cyclonus_toon.jpg/244px-Cyclonus_toon.jpg"],
    ["Unicron","For a time, I considered sparing your wretched little planet.","https://img.purch.com/o/aHR0cDovL3d3dy5uZXdzYXJhbWEuY29tL2ltYWdlcy9pLzAwMC8yMDMvOTI0L2kwMi9Vbmljcm9uLmpwZw=="],
    ["Galvatron","I'll rip open Ultra Magnus, and every other Autobot, until the Matrix has been destroyed!","http://basementrejects.com/wp-content/uploads/2013/03/transformers-the-movie-galvatron-versus-hot-rod.jpg"],
    ["Perceptor","Ultra Magnus, a cursory evaluation of Decepticon capability indicates a distinct tactical deficiency!","https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/perceptor-transformers-the-movie-2.93.jpg"],
    ["Kup","Experience, lad. You should learn to appreciate it.","https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/kup-transformers-the-movie-4.96.jpg"],
    ["Hot Rod","Hey, I wasn't worried for a microsecond.","https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/hot-rod-transformers-the-movie-4.98.jpg"],
    ["Ratchet",".....","https://images.vice.com/vice/images/articles/meta/2015/03/11/the-transformers-the-movie-death-mike-diver-1426088093.jpg"],
    ["Blaster","Optimus Prime, do you read me? The Decepticons are blitzing Autobot City, we're really taking a pounding. Don't know how much longer we can hold out.","http://1.bp.blogspot.com/-OfZPZrpVijE/U8Yy_iIeQFI/AAAAAAAAAZA/PHD4oyzZLu0/s1600/PDVD_000.BMP"]
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
// ^^ did I ever use this?
var wins = 0; // count of wins
var losses = 0; // count of losses
var printAnswer = ""; // we'll use this to house to real-time output
var guess; // create the "guess" var that will hold the current guess
// ^^ did I ever use this?
var badGuess = []; // create the array that will hold the bad guesses
var guessesAllowed = 6; // we'll give the user six wrong guesses
var guessesLeft = guessesAllowed; // this will be our active variable for the count as it decreases
var gameArray = []; // create a new array that will be two dimension and include the answer + underscores
var lastAnswer; // will hold the previous answer so we can keep it in memory for the alert
// ^^ many eliminate this later

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
    document.getElementById("losses").innerHTML = losses; // update # of losses
    document.getElementById("wins").innerHTML = wins; // update # of wins
}

// All the stuff needed to get a round started:
// (I need to study this Math.random stuff more so I understand the syntax):
function newRound() {
    gameArray = []; //reset gameArray
    guessesLeft = guessesAllowed; // reset guessesLeft
    ranNum = Math.floor(Math.random() * (+max - +min)) + +min; // select our random number
    answer = transformers[ranNum][0]; // set our answer using the random number referenced against our name array
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
	var keyPressed = event.key.toUpperCase();
	console.log("Key Press: " + keyPressed);
    if(badGuess.includes(keyPressed)){ // if the letter selected has already been picked once and is not part of the answer
        console.log("Already in badGuess");
        // stop. do nothing.
    } else {
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
        // logging ------------------- logging 
        console.log(gameArray);
        console.log(guessesLeft);
        console.log(badGuess);
        console.log("Game won: " + gameWon);
        // logging ------------------- logging 
    }
    updateStats(); // print # guesses and incorrect guesses to html
    if(guessesLeft <= 0){ // now we need the logic to end the game if you got too many wrong
        console.log("Game over. You lost.");
        losses = losses + 1;
        lastAnswer = answer;
        // document.getElementById("botName").innerHTML = answer;
        newRound(); // reset for the next round
        updateStats();
        alert("Sorry, you guessed too many incorrect letters. The answer was \"" + lastAnswer + "\".");
    }
    if(gameWon === true) { // logic to end the game if you get them all right
        console.log("You won! Great job!");
        wins = wins + 1;
        lastAnswer = answer;
        document.getElementById("wins").innerHTML = wins; // ??? is this redundant?
        document.getElementById("botName").innerHTML = answer;
        // document.getElementById("botFaction").innerHTML = 
        document.getElementById("botImage").innerHTML = "<img src=\"" + transformers[ranNum][2] + "\" class=\"img-fluid\">";
        document.getElementById("botQuote").innerHTML = "\"" + transformers[ranNum][1] + "\"";
        newRound(); // reset for the next round
        updateStats(); 
        alert("Congrats! You correctly guessed \"" + lastAnswer +"\"!");
    }

} // close event watching

} // close onload