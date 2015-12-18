$(document).ready(function(){


	var cards = [
		'trunk',
		'trunk',
		'coin10',
		'coin10',
		'coin20',
		'coin20',
		'feather',
		'feather',
		'fireflower',
		'fireflower',
		'leaf',
		'leaf',
		'mushroom',
		'mushroom',
		'star',
		'star'
	];



	// shuffles the array
	function shuffunction(cards) {

		var tempCards = [];
		var cardCt = cards.length; //16 cards

		while (cardCt > 0) {

			// gets a random number
			var randomCard = Math.floor(Math.random() * cards.length);

			// see if that number card is still in the array
			if ( randomCard in cards ) {

				// if it is still in the cards array
				// add it to the new array
				tempCards.push( cards[randomCard] );

				// delete from the old array so it doesnt get used again
				delete cards[randomCard];

				// update our card count
				cardCt--;
			}
		}
		return tempCards;
	}


	var cardsShuffd = shuffunction(cards);


	// assign a class using the random array
	$( ".cards" ).each(function( cardNumber ) {
		var randomClass =  cardsShuffd[ cardNumber ]
		$(this).addClass("cards " + randomClass);
	});



	// toggle the card images on click
	$( ".cards" ).click(function() {
		$( this ).toggleClass("flipped");

		checkWinner();
	});


	
	// button to reset the game
	// fixes the empty array bug

	$( ".newgame" ).hover(function() {
		$( this ).toggleClass("refresh");
	});

	$( ".newgame" ).click(function() {
	    location.reload();
	});


});