
    /* Linked JavaScript files to create Hangman game */
       
       
       /* Set up the array of words the computer can choose from. */
    var wildWestArray = [
    "REVOLVER",
    "SADDLE",
    "SALOON",
    "STAGECOACH",
    "WHISKEY",
    "SARSAPARILLA",
    "SHOTGUN",
    "STICKUP",
    "OUTLAW",
    "SHERIFF",
    "DEPUTY",
    "COWHERD",
    "BANDIT",
    "BRANDED",
    "REMINGTON",
    "RANCHER",
    "BRONCO",
    "BUFFALO", 
    ]

    var alphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    var word = {
        display: [],
        initial: "",
        array: [],
        finalArray: []
    }

    var wildWildGuesses = {
        initial: "",
        correctArray: [],
        missedArray: [],
    }

    var scoreWins = 0;
    

        /* Places an "s" in the score counter unless the score is singular (1). */
    function insertS() {
        if (scoreWins == 0) {
            document.getElementById("missingS").innerHTML = "s";
        } else if (scoreWins == 1) {
            document.getElementById("missingS").innerHTML = "";
        } else {
            document.getElementById("missingS").innerHTML = "s";
        }
    }

    function populateBoard(letterType) {
            for (i = 0; i < word.initial.length; i++) {
                word.display.push("_")
            }
            word.finalArray = word.initial.split("");
            document.getElementById("wildWestWord").innerHTML = word.display.join("");
            console.log(word.finalArray + " final array " + typeof word.finalArray);
    }

        /* Capitalizes the input so it's correctly compared to the capital word. */
    function capitalize(x) {
        y = x.toUpperCase();
        return y;
    }
        /* Splits the word into letters, alphabetizes them, deletes repeats, and creates an array. */
    function absoluteValueOf(x) {
        y = Array.from(new Set(x.split("").sort()));
        z = y.join("");
        return z;
    }

        /* If the length pf the correct guesses is the same as the word, player wins and game restarts. */
    function winCase() {
        if (word.initial.indexOf(wildWildGuesses.initial) > -1) {
            for (i = 0; i < word.display.length; i++) {
		        if (wildWildGuesses.initial.includes(word.finalArray[i])) {
			    word.display[i] = wildWildGuesses.initial
                document.getElementById("wildWestWord").textContent = word.display.join(" ");
                    }
                }
        if (word.array.length === wildWildGuesses.correctArray.length) {
                    resetWords()
                    scoreWins += 1;
                
            }
        }
    }

    function resetWords (){ 
        setTimeout(function() {
            alert("You win!");
        wildWildGuesses.correctArray = [];
        wildWildGuesses.missedArray = [];
        chooseWord();
        }, 300);
    }

    /* word.display.splice(word.initial.indexOf(wildWildGuesses.initial), 1, wildWildGuesses.initial); */

        /* If the player hangs themselves, reloads the page after a notification */
    function loseCase() {
        if ((wildWildGuesses.missedArray).length == 1) {
            document.getElementById("gallowsImage").src="assets/images/gallows1.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 2) {
            document.getElementById("gallowsImage").src="assets/images/gallows2.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 3) {
            document.getElementById("gallowsImage").src="assets/images/gallows3.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 4) {
            document.getElementById("gallowsImage").src="assets/images/gallows4.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 5) {
            document.getElementById("gallowsImage").src="assets/images/gallows5.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 6) {
            document.getElementById("gallowsImage").src="assets/images/gallows6.jpg";
        }
        else if ((wildWildGuesses.missedArray).length == 7) {
            alert("You lose!");
            location.reload();
        }
    }

        /* The primary function. Chooses a word and creates all components from that choice. */
    function chooseWord() {

        /* Creates the scoreboard */
        document.getElementById("scoreBoard").innerHTML = scoreWins;

            /* Places an "s" in the score counter unless the score is singular (1). */
        insertS();

            /* If the array has been exhausted by the player repeatedly winning, closes the window. */
        if (wildWestArray.length == 0) {
            alert("Looks like you got away this time!")
            window.close();

        } else {

            word.display = [];
                /* Set a random number generator that chooses which word comes from the array. */
            function randomNum() {
                x = [Math.floor(Math.random() * (wildWestArray.length - 0))]
                return x;
            }
                /* Uses the random number to choose a word, and kicks that word from the array. */
            var indexOfWord = randomNum();
            word.initial = wildWestArray[indexOfWord];
            wildWestArray.splice(indexOfWord, 1);
            console.log(word.initial + " Initial word")

            populateBoard();

                /* Creates an absolute array for comparison to guesses. */
            word.array = absoluteValueOf(word.initial);
            console.log(word.array + " word array");

        }
    }

        /* Checks the guess against various conditions to determine veracity. */
    function validGuess() {
        /* If the space is empty, rejects the guess */
        if (wildWildGuesses.initial.length == 0) {
            alert("No wild cards in this deck, boy. Enter a guess.")
        } else {
                
                /* If the player enters two letters, rejects the guess */
            if (wildWildGuesses.initial.length > 1) {
                alert("Are you cheatin', partner? One letter at a time!")

                /* If the guess has already been resistered guess, alerts the user. */
            } else if (wildWildGuesses.correctArray.includes(wildWildGuesses.initial) || 
                        wildWildGuesses.missedArray.includes(wildWildGuesses.initial)) {
                alert("Hold yer horses! " + wildWildGuesses.initial + 
                        " has already been guessed, cowboy.")
            }
        }
    }
    

        /* Processes the guess as valid, correct, or incorrect */
    function wildWestDraw() {
        wildWildGuesses.initial = String(document.getElementById("letterGuess").value);
        wildWildGuesses.initial = capitalize(wildWildGuesses.initial);
        console.log(wildWildGuesses.initial);
        document.getElementById("letterGuess").value = "";

        validGuess();

            /* If the word includes the guess, registers a hit! */
        if (word.array.includes(wildWildGuesses.initial)) {
            wildWildGuesses.correctArray += wildWildGuesses.initial;
            console.log(wildWildGuesses.correctArray + " Correct array");
            winCase();

            return wildWildGuesses.correctArray;

        } else {
               /* Checks to see if the guess is a valid letter. */
            if (alphabet.includes(wildWildGuesses.initial)) {

                    /* Logs if the guess was a miss, and adds it to the miss array. */
                document.getElementById("misses").innerHTML = 
                wildWildGuesses.missedArray += wildWildGuesses.initial;
                loseCase();
            } else {
                alert("That's not a letter! You ever played this game before?")
            }    
        }
    }
    