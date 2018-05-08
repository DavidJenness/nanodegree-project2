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

    /*
     * Create a list that holds all of your cards
     */
    let myDeck = shuffle(["fa fa-diamond",
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
    console.log("Clicked " + this.className);

    if (this.className == "card open show") {
        this.className = "card";
    }
    else if (this.className == "card") {
        this.className = "card open show";
    }
});

// Handle the restart button to reinitialize the game board
$(".restart").click(function () {
    startNewGame();
});