var player1, player2, player3, player4;
var count = 0;
var user;
var characterNames = ['JediMan', 'SithMan', 'StormMan', 'CountMan']
var characters = {
	'JediMan':
	{	name : 'JediMan',
	healthPoints : 150,
	attackPower : 6,
	counterPower: 6,
	img1 : 'assets/css/images/characters/luke0.png'
	},
	'SithMan':{
	name : 'SithMan',
	healthPoints : 120,
	attackPower : 6,
	counterPower: 12,
	img1 : 'assets/css/images/characters/anakin0.png'
	}
	,
	'StormMan': {
	name : 'StormMan',
	healthPoints : 130,
	attackPower : 6,
	counterPower: 10,
	img1 : 'assets/css/images/characters/st0.png'
	}
	,
	'CountMan':{
	name : 'CountMan',
	healthPoints : 150,
	attackPower : 6,
	counterPower: 10,
	img1 : 'assets/css/images/characters/dooku0.png'
}
};
//character render
var render = function(selectedPlayer){

	player1= selectedPlayer.id;
	var playerDiv=$('<div>');
	var playerImg=$('<img src="'+characters[selectedPlayer.id].img1+'" height=100>');

	if(!user){
		var playerHPSpan = $('<span>');
		playerHPSpan.text('HP: ' + selectedPlayer.dataset.healthpoints);
		playerHPSpan.attr('id', 'userHPSpan');
		playerHPSpan.attr('data-HPName','user');
		playerHPSpan.addClass('charHP');

		playerImg.attr('id', 'userPlayer');
		playerImg.attr('data-spriteAtt', selectedPlayer.dataset.attackpower);
		playerImg.addClass('userCharacter');

		playerDiv.append(playerHPSpan);
		playerDiv.append(playerImg);
		$("#userContainer").fadeIn(1000);
		$("#player1").append(playerDiv);

		var html = $('<audio>');
		html.attr('src', 'assets/css/sounds/Teleport.wav')
		html.attr('id', '#teleportSound');
		html.attr('type','audio/wav');
		html.attr('autoplay','');
		$('#fullSiteWrapper').append(html);

		$("#player1").fadeIn(1000);
		// player1=true;
		$('#'+ selectedPlayer.id).fadeOut(1000);
		$('#'+ selectedPlayer.id + 'DivLabel').remove();
		count++;
	}
	else{
		var playerHPSpan = $('<span>');
		playerHPSpan.text('HP: ' + selectedPlayer.dataset.healthpoints);
		playerHPSpan.attr('id', 'comp' + selectedPlayer.id +'HPSpan');
		playerHPSpan.attr('data-HPName', selectedPlayer.id);
		playerHPSpan.addClass('charHP');

		playerImg.attr('id', 'comp'+ selectedPlayer.id);
		playerImg.attr('data-spritecounter', selectedPlayer.dataset.counterpower);
		playerImg.attr('data-imgName', selectedPlayer.id);
		playerImg.addClass('compCharacters');

		var attackButton = $('<button>');
		attackButton.text('Attack');
		attackButton.attr('id', selectedPlayer.id + 'attackButton');
		attackButton.attr('data-ABName', selectedPlayer.id);
		attackButton.addClass('btn btn-default attackButtons');

		var html = $('<audio>');
		html.attr('src', 'assets/css/sounds/Teleport.wav')
		html.attr('id', '#teleportSound');
		html.attr('type','audio/wav');
		html.attr('autoplay','');
		$('#fullSiteWrapper').append(html);

		playerDiv.append(playerHPSpan);
		playerDiv.append(playerImg);
		playerDiv.append(attackButton);
		$("#compContainer").fadeIn(1000);
		count++;

		console.log($('#player' + count));
		$("#player" + count).fadeIn(1000);
		$("#player" + count).append(playerDiv);


		$('#'+ selectedPlayer.id).fadeOut(1000);
		$('#'+ selectedPlayer.id + 'DivLabel').remove();
	}

	playerImg.attr('data-spriteName', selectedPlayer.id);
	playerImg.attr('data-spriteHP', selectedPlayer.dataset.healthpoints);
	
	user=true
}

var gameplayAttacks = function(){
	$( ".attackButtons" ).click(function() {
		//get relavant values
		var compAttacker =  $(this)[0].dataset.abname;
		
		var html = $('<audio>');
		html.attr('src', 'assets/css/sounds/Blaster.wav')
		html.attr('id', '#teleportSound');
		html.attr('type','audio/wav');
		html.attr('autoplay','');
		$('#fullSiteWrapper').append(html);

		//update HPs
		$('#comp'+ compAttacker)[0].dataset.spritehp = parseInt($('#comp'+ compAttacker)[0].dataset.spritehp) - parseInt($('#userPlayer')[0].dataset.spriteatt);
		$('#userPlayer')[0].dataset.spritehp = parseInt($('#userPlayer')[0].dataset.spritehp) - parseInt($('#comp'+ compAttacker)[0].dataset.spritecounter);

		//increase user attack power
		$('#userPlayer')[0].dataset.spriteatt = parseInt($('#userPlayer')[0].dataset.spriteatt) + 8; 
		
		//update HP spans
		console.log(parseInt($('#comp'+ compAttacker)[0].dataset.spritehp));

		//check for zero HP
		if(parseInt($('#comp'+ compAttacker)[0].dataset.spritehp) <= 0){
			$('#comp'+ compAttacker)[0].dataset.spritehp = 0;
			$('#comp'+ compAttacker + "HPSpan").text('HP: 0');

			var html = $('<audio>');
			html.attr('src', 'assets/css/sounds/MM2Death.wav')
			html.attr('id', '#teleportSound');
			html.attr('type','audio/wav');
			html.attr('autoplay','');
			$('#fullSiteWrapper').append(html);
			
			$('#' + compAttacker +'attackButton').remove();
		}
		if(parseInt($('#userPlayer')[0].dataset.spritehp) <= 0){
			$('#userPlayer')[0].dataset.spritehp = 0;
			$('#userHPSpan').text('HP: 0');
			$('.attackButtons').remove();

			var html = $('<audio>');
			html.attr('src', 'assets/css/sounds/MM2Death.wav')
			html.attr('id', '#teleportSound');
			html.attr('type','audio/wav');
			html.attr('autoplay','');
			$('#fullSiteWrapper').append(html);

			alert('You lose!');
		}

		$('#userHPSpan').text('HP: ' + parseInt($('#userPlayer')[0].dataset.spritehp));
		$('#comp'+compAttacker+'HPSpan').text('HP: ' + parseInt($('#comp'+ compAttacker)[0].dataset.spritehp));

	});
}

$(document).ready(function() {
	//only click events
	//on click action to remove jumbotron div to start game

	window.setTimeout(function(){$('#mainStarWarsImage').fadeOut(1000)
			// var starWarsTheme = $('<audio>');
			// var starWarsThemeSource = $('<source>')
			// starWarsThemeSource.attr('src', 'assets/css/sounds/star-wars-theme-song.mp3')
			// starWarsThemeSource.attr('id', '#starWarsTheme');
			// starWarsThemeSource.attr('type','audio/mpeg');
			// starWarsTheme.attr('autoplay','autoplay');
			// starWarsTheme.append(starWarsThemeSource);
			// $('#fullSiteWrapper').append(starWarsTheme);
			// starWarsTheme.remove();
		

		}, 9000)
	

	// window.setTimeout(function(){
	// 	// 	var starWarsTheme = $('<audio>');
	// 	// 	var starWarsThemeSource = $('<source>')
	// 	// 	starWarsThemeSource.attr('src', 'assets/css/sounds/star-wars-theme-song.mp3')
	// 	// 	starWarsThemeSource.attr('id', '#starWarsTheme');
	// 	// 	starWarsThemeSource.attr('type','audio/mpeg');
	// 	// 	starWarsTheme.attr('autoplay','');
	// 	// 	starWarsTheme.append(starWarsThemeSource);
	// 	// 	$('#fullSiteWrapper').append(starWarsTheme);
	// 	// 	starWarsTheme.remove();
	// 	// $('#starWarsThemeSource').attr('src', '')
	// },1000)


	// $('#mainStarWarsImage').on('click',function(){
	// });

	var newDiv = $('<div>');
	newDiv.addClass('row');
	newDiv.attr('id','titleHeader')
	$('#frontSplash').append(newDiv);
	
	var newSpan = $('<span>');
	newSpan.addClass('title');
	newSpan.text('Select Your Fighters!');
	$('#titleHeader').append(newSpan);



	//create sprites on page
	for(i = 0; i < characterNames.length; i++){

		var target = characterNames[i];	

		console.log(target);

		var newDiv = $('<div>');
		newDiv.addClass('col-md-5 ' + target);
		newDiv.attr('id', target + 'DivLabel')
		newDiv.attr('data-spriteName', target);

		var newSprite = $('<img>');
		newSprite.attr('src',  characters[target].img1);
		newSprite.attr('id', target);
		newSprite.attr('data-spriteName', target);
		newSprite.attr('data-healthPoints', characters[target].healthPoints);
		newSprite.attr('data-attackPower', characters[target].attackPower);
		newSprite.attr('data-counterPower', characters[target].counterPower);
		newSprite.addClass('selectScreenSprites');


		var newSpan = $('<span>');
		newSpan.text(target);
		newSpan.addClass('selectScreenLabels')
		newSpan.attr('id', target + 'label');


		newDiv.append(newSprite);
		newSprite.after(newSpan);
		$('#frontSplash').append(newDiv);

	}

	//fighter selection
	for(i = 0; i < characterNames.length; i++){
		var newTarget=characterNames[i];
				console.log(newTarget);

		$('#' + newTarget).on('click', function(){

			var renderSprite = $(this)[0];
			render(renderSprite);

			/// only if we have all players can the game begin
			if(count == 4){
				//change song
						
						var drWilyTheme = $('<audio>');
						var drWilyThemeSource = $('<source>')
						drWilyThemeSource.attr('src', 'assets/css/sounds/dr-wily-mm2.mp3')
						drWilyThemeSource.attr('id', '#wilyTheme');
						drWilyThemeSource.attr('type','audio/mpeg');
						drWilyTheme.attr('autoplay','');
						drWilyTheme.append(drWilyThemeSource);
						$('#fullSiteWrapper').append(drWilyTheme);

			

				count++;
				$('#titleHeader').remove();
				gameplayAttacks();
			}
	});//end of on click function	
// else{
// 	alert("Select a player");
// }
	}//end of gameplay for loop
});

