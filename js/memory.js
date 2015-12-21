$(document).ready(function(){

	var backgroundAudio = new Audio("sound/background.mp3");
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

      var randomCardNumber = Math.floor( Math.random() * ((cards.length -1) - 0) + 0);
      //console.log(randomCardNumber);
      
      tempCards.push( cards[randomCardNumber] );
	  //console.log(tempCards);
      cards.splice( randomCardNumber, 1);
      //console.log(cards);

      cardCount--;
      
		}
    
		return tempCards;
	}

	var cardsShuffd = shuffunction(cards);
	//console.log(cardsShuffd);


// assign a class using the new random array

	$( ".cards" ).each(function( cardNumber ) {
		
		var randomClass =  cardsShuffd[ cardNumber ]
		
		$(this).addClass("cards " + randomClass);
	
	});

// new game button

	$( ".newgame" ).hover(function() {
		$( this ).toggleClass("refresh");
	});

	$( ".newgame" ).click(function() {
	    location.reload();
	});




	var numberofFlipped = 0;
	var firstChoice;
	var firstChoiceImg;
	var secondchoice;
	var secondchoiceimg;
	var flipAudio = new Audio("sound/select.wav");
	var matchAudio = new Audio("sound/match.wav");
	var noMatchAudio = new Audio("sound/no_match.wav");



	//this is where cards get flipped
	$( ".cards" ).click(function() {

		flipAudio.play();

		numberofFlipped++
		//console.log('number of flipped cards: '+numberofFlipped);
		//while in cards, toggle to flipped		
		$( this ).toggleClass("flipped");
		// if number of "clicks" is equal to 1, var firstchoice = where
		// you clicked first, var firstchoiceimg = the background image
		//of what was clicked - log that image name
		if (numberofFlipped === 1){
			firstChoice = $(this);
			firstChoiceImg = $(this).css('background-image');
			//console.log(firstChoiceImg)
		}

		// if number of "clicks" is equal to 2, var secondchoice = where
		// you clicked next, var secondchoiceimg = the background image
		// of what was clicked - log that image name		


		if (numberofFlipped === 2){
			secondChoice = $(this);
			secondChoiceImg = $(this).css('background-image');
			//console.log(secondChoiceImg)


			// this looks at the class of both clicked images and if they are
			// equal, log match. (it doesn't log the match)
			// and add the class of "found" to the matching cards
			if ( firstChoiceImg === secondChoiceImg ){
				console.log('match');
				firstChoice.addClass('found');
				secondChoice.addClass('found');
				numberofFlipped = 0;
				
				setTimeout( function(){
					matchAudio.play();
				},500 );


			} else {
				console.log("didnt match");
				//if you've clicked twice....um? set numberofflipped back to 0
				//not sure what the settimeout does
				//for all of my cards in my card div that have been flipped and
				numberofFlipped = 0 
				setTimeout(function(){
					$('.cards').each(function(card){
						if ( this.classList.contains('found') === false ){
							$('.cards').removeClass('flipped')
						}
					})
					noMatchAudio.play();
				},1000);
			}
		}
	});
});