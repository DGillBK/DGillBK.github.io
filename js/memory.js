$(document).ready(function() {
	

	var backgroundAudio = new Audio("sound/background_loop2.mp3");
	backgroundAudio.loop = true;
	backgroundAudio.play();
	backgroundAudio.volume = 0.2;
	
	var cards = [
		'trunk',
		'trunk',
		'poison',
		'poison',
		'green',
		'green',
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
	// shuffle my classes array
	function shuffunction(cards) {
		var tempCards = [];
		var cardCount = cards.length; //16
		while (cardCount > 0) {
			var randomCardNumber = Math.floor(Math.random() * ((cards.length - 1) - 0) + 0);
			//console.log(randomCardNumber);
			tempCards.push(cards[randomCardNumber]);
			//console.log(tempCards);
			cards.splice(randomCardNumber, 1);
			//console.log(cards);
			cardCount--;
		}
		return tempCards;
	}
	var cardsShuffd = shuffunction(cards);
	//console.log(cardsShuffd);
	// assign a class using the new random array
	$(".cards").each(function(cardNumber) {
		var randomClass = cardsShuffd[cardNumber]
		$(this).addClass("cards " + randomClass);
	});
	
	// new game button
	$(".newgame").hover(function() {
		$(this).toggleClass("refresh");
	});
	$(".newgame").click(function() {
		location.reload();
	});
	
	// define any variables that need to exist outside the click
	var numberofFlipped = 0;
	var firstChoice;
	var firstChoiceImg;
	var secondchoice;
	var secondchoiceimg;

	// define audio 
	var flipAudio = new Audio("sound/select.wav");
	var matchAudio = new Audio("sound/match.wav");
	var noMatchAudio = new Audio("sound/no_match.wav");
	var youWonAudio = new Audio("sound/you_won.wav");

	//this is where cards get flipped
	$(".cards").click(function() {
		
		flipAudio.play();
		
		// add 1 "Flipped" each time a card is clicked
		numberofFlipped++;

		// flip the card clicked
		$(this).toggleClass("flipped");

		// if number of "clicks" is equal to 1
		// var firstchoice = where you clicked first
		// var firstchoiceimg = the background image of what was clicked
		if (numberofFlipped === 1) {
			firstChoice = $(this);
			firstChoiceImg = $(this).css('background-image');
		}
		// if number of "clicks" is equal to 2
		// var secondchoice = where you clicked next
		// var secondchoiceimg = the background image of what was clicked
		if (numberofFlipped === 2) {
			secondChoice = $(this);
			secondChoiceImg = $(this).css('background-image');
			
			// this looks at the background-image of both clicked images
			// if they are equal
			// and add the class of "found" to the matching cards
			if (firstChoiceImg === secondChoiceImg) {
				// console.log('match');
				firstChoice.addClass('found');
				secondChoice.addClass('found');

				// reset flipped counter
				numberofFlipped = 0;

				// see if all cards have been found
				if ($(".found").length === 16){
					//console.log('you won');
					backgroundAudio.pause();
					youWonAudio.play();
				} else {
					// if not play match sound
					setTimeout(function() {
						matchAudio.play();
					}, 500);
				}

				
			} else {
				//console.log("didnt match");
				//if you've clicked twice...set numberofflipped back to 0
				//setTimeout waits 1 sec before flipping back
				numberofFlipped = 0
				setTimeout(function() {
					// find all flipped cards and unflip
					// "found" cards will stay flipped
					$('.flipped').removeClass('flipped');
					noMatchAudio.play();
				}, 1000);
			}
		}
	});
});