let myDeck = [];
let matchList = [];
let openList = [];
let moveCount = 0;
let waitForNextClick = false;

$(document).ready(function () {
    startNewGame();
});

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

function startNewGame() {
    // This function is called whenever the page is loaded, 
    // or the refresh button is pressed

    //reset Moves
    moveCount = 0;
    $(".moves").text(moveCount);
    /*
     * Create a list that holds all of your cards
     */
    myDeck = shuffle(["fa fa-diamond",
        "fa fa-paper-plane-o",
        "fa fa-anchor",
        "fa fa-bolt",
        "fa fa-cube",
        "fa fa-anchor",
        "fa fa-leaf",
        "fa fa-bicycle",
        "fa fa-diamond",
        "fa fa-bomb",
        "fa fa-leaf",
        "fa fa-bomb",
        "fa fa-bolt",
        "fa fa-bicycle",
        "fa fa-paper-plane-o",
        "fa fa-cube"
    ]);

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    let myCounter = 1;
    myDeck.forEach(function (element) {
        let myLocationID = "#" + "location" + myCounter.toString();

        //Temp to show all values
        let myParent = $(myLocationID).parent();
        $(myParent).removeClass();
        $(myParent).addClass("card");

        $(myLocationID).removeClass();
        $(myLocationID).addClass(element);

        myCounter += 1;
    })
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

$(".card").click(function () {
    if (waitForNextClick) return; //Waiting on the animation to complete
    console.log("--------------------------------");
    console.log("Clicked a :" + this.className);
    if (this.className != "card") {
        return;
    } else {
        console.log("openList =" + openList);
        console.log("matchList =" + matchList);

        console.log("Setting " + this + " class name to card open show");
        this.className = "card open show";

        //Check to see if there are any cards opened, if not, then add one
        if (openList.length == 0) {
            //push an object that has the location and description
            const desc = jQuery(this).children("i:first").attr("class");
            const location = jQuery(this).children("i:first").attr("id");
            const myGuess = {
                "desc": desc,
                "location": location
            };
            openList.push(myGuess);
        } else {
            //increase the move count
            moveCount += 1;
            $(".moves").text(moveCount);
            //Have to see if we have a match
            const secondPick = jQuery(this).children("i:first").attr("class");

            //const foundIndex = openList.indexOf(secondPick);
            var foundIndex = openList.filter(function (e) {
                return e.desc == secondPick;
            });

            console.log("Found Index = " + foundIndex);
            const locToPass = "#" + openList[0].location;
            const secondObject = this;
            if (foundIndex.length == 0) {
                waitForNextClick = true;
                setTimeout(function () {
                    secondObject.className = "card";
                    const locOfFirstGuess = locToPass;
                    $(locOfFirstGuess).parent("li").removeClass();
                    $(locOfFirstGuess).parent("li").addClass("card");
                    console.log("setTimeout complete")
                    waitForNextClick = false;
                }, 1500, locToPass, secondObject);
                
            } else {
                matchList.push(secondPick);
                this.className = "card match";
                const locOfFirstGuess = "#" + openList[0].location;
                $(locOfFirstGuess).parent("li").removeClass();
                $(locOfFirstGuess).parent("li").addClass("card match");

            }
            openList.length = 0;
        }
    }
});

// Handle the restart button to reinitialize the game board
$(".restart").click(function () {
    startNewGame();
});