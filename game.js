var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").prop("disabled", true);

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColours[randomNumber];
	gamePattern.push(randomChosenColor);
	level++;
	$("#level-title").text("Level " + level);
	$("#" + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(sound) {
	var audio = new Audio("./sounds/" + sound + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function startOver() {
	gamePattern = [];
	userClickedPattern = [];
	gameStarted = false;
	level = 0;
	$(".btn").prop("disabled", true);
}

function checkAnswer(level) {
	debugger;
	var currentPos = userClickedPattern.length - 1;
	if (gamePattern[currentPos] === userClickedPattern[currentPos]) {
		if (currentPos === level - 1) {
			$(".btn").prop("disabled", true);
			setTimeout(() => {
				nextSequence();
				userClickedPattern = [];
				$(".btn").prop("disabled", false);
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

$(document).keypress(() => {
	if (!gameStarted) {
		gameStarted = true;
		$(".btn").prop("disabled", false);
		$("#level-title").text("Level 0");
		nextSequence();
	}
});

$(".btn").click(function () {
	var userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(level);
});
