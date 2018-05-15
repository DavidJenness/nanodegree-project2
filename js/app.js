let myDeck = [];
let matchList = [];
let openList = [];
let moveCount = 0;
let waitForNextClick = false;
let timerOn = false;
let numStars = 5;

let numSecondsElapsed = 0;
let myTimer = setInterval(setMyTimer, 1000);

$(document).ready(function () {
    showDialog();
});

function showDialog() {
    //Shows the final score
    document.getElementById("dialogBox").showModal();
}

function playAgain() {
    //Ask the player if they want to start the game
    document.getElementById("dialogBox").close();
    startNewGame();
}

function setMyTimer() {
    if (timerOn) {
        $("#timer").text("Timer: " + numSecondsElapsed);
        numSecondsElapsed += 1;
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function drawStars() {
    //Delete the the children of class="stars"
    let myList = $(".stars").children();
    myList.remove();

    //Now draw either a full or half star depending on the score
    let redrawStars = numStars;
    if (numStars % 1 != 0) redrawStars = redrawStars - 1;
    for (let i = 0; i < redrawStars; i++) {
        let myDiff = redrawStars - i;
        $(".stars").append(" <li> <i class=\"fa fa-star\"></i> </li>");
    }
    if (numStars % 1 != 0) {
        $(".stars").append(" <li> <i class=\"fa fa-star-half\"></i> </li>");
    }
}

function startNewGame() {
    // This function is called whenever the page is loaded, 
    // or the refresh button is pressed

    //reset Moves
    moveCount = 0;
    numSecondsElapsed = 0;
    numStars = 5;
    drawStars();
    timerOn = true;
    numberOfMatches = 0;
    matchList = [];
    openList = [];
    $(".moves").text("Moves:" + moveCount);
    /*
     * Create a list that holds all of your cards
     */
    myDeck = shuffle(["far fa-gem",
        "fa far fa-paper-plane",
        "fa fa-anchor",
        "fa fa-bolt",
        "fas fa-space-shuttle",
        "fa fa-anchor",
        "fas fa-dove",
        "fa fa-bicycle",
        "far fa-gem",
        "fa fa-bomb",
        "fas fa-dove",
        "fa fa-bomb",
        "fa fa-bolt",
        "fa fa-bicycle",
        "fa far fa-paper-plane",
        "fas fa-space-shuttle"
    ]);

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    $(".deck").children().hide();
    let myCounter = 1;
    myDeck.forEach(function (element) {
        let myLocationID = "#" + "location" + myCounter.toString();
        let myParent = $(myLocationID).parent();
        $(myParent).removeClass();
        $(myParent).addClass("card");
        $(myLocationID).removeClass();
        $(myLocationID).addClass(element);
        myCounter += 1;
    })
    $(".deck").children().show();
}

// Handle a card when it is clicked
$(".card").click(function () {
    if (waitForNextClick) return; //Waiting on the animation to complete
    if (this.className != "card") {
        return;
    } else {

        this.className = "card open show";

        //Check to see if there are any cards opened, if not, then add one
        if (openList.length == 0) {
            //push an object that has the location and description
            const desc = $(this).children("i:first").attr("class");
            const location = $(this).children("i:first").attr("id");
            const myGuess = {
                "desc": desc,
                "location": location
            };
            openList.push(myGuess);
        } else {
            moveCount += 1;
            $(".moves").text("Moves:" + moveCount);
            //Calculating the number of stars to display
            if (moveCount < 10) {
                numStars = 5;
            } else if (moveCount < 13) {
                numStars = 4.5;
            } else if (moveCount < 16) {
                numStars = 4;
            } else if (moveCount < 19) {
                numStars = 3.5;
            } else if (moveCount < 22) {
                numStars = 3;
            } else if (moveCount < 25) {
                numStars = 2.5;
            } else if (moveCount < 28) {
                numStars = 2;
            } else if (moveCount < 31) {
                numStars = 1.5;
            } else {
                numStars = 1;
            }
            drawStars();

            //Have to see if we have a match
            const secondPick = $(this).children("i:first").attr("class");

            //const foundIndex = openList.indexOf(secondPick);
            var foundIndex = openList.filter(function (e) {
                return e.desc == secondPick;
            });

            const locToPass = "#" + openList[0].location;
            const secondObject = this;
            if (foundIndex.length == 0) {
                waitForNextClick = true;
                setTimeout(function () {
                    secondObject.className = "card";
                    const locOfFirstGuess = locToPass;
                    $(locOfFirstGuess).parent("li").removeClass();
                    $(locOfFirstGuess).parent("li").addClass("card");
                    waitForNextClick = false;
                }, 1500, locToPass, secondObject);

            } else {
                console.log("push " + secondPick + " to matchList");
                matchList.push(secondPick);
                this.className = "card match";
                const locOfFirstGuess = "#" + openList[0].location;
                $(locOfFirstGuess).parent("li").removeClass();
                $(locOfFirstGuess).parent("li").addClass("card match");

                //Check if you have won the game
                if (matchList.length == 8) {
                    timerOn = false;
                    const victoryMessage = "You Win with a score of " + numStars + " stars and a time of " + numSecondsElapsed + " seconds.";
                    $("#timer").text("Timer: " + numSecondsElapsed);
                    $("#dialogText").text(victoryMessage);
                    $(".deck").children().hide();
                    showDialog();
                }
            }
            openList.length = 0;
        }
    }
});

// Handle the restart button to reinitialize the game board
$(".restart").click(function () {
    const resetMessage = "Your job is to match pairs of symbols";
    $("#dialogText").text(resetMessage);
    $(".deck").children().hide();
    showDialog();
});