var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstKeyPress = true;
var level = 0;

$(document).keydown(function(){
    if(firstKeyPress){
        $("#level-title").text("Level " + level);
        nextSequence();
        firstKeyPress =false;
        
    }
    console.log("firstKeyPress",  firstKeyPress);
});



function nextSequence() {

    userClickedPattern = [];
    
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    //alert(randomNumber)
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomNumber);

    var selectedButton = $("#" + randomChosenColour);

    selectedButton.fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

  

}

function handleButtonClick() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    console.log("userClickedPattern:", userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}

$(".btn").click(handleButtonClick);

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){

    for (var i = 0; i <= currentLevel; i++) {
        if (userClickedPattern[i] !== buttonColours[gamePattern[i]]) {
            

            console.log("Wrong answer! Game over.");
            playSound("wrong.mp3");
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
            return;
        }
    }

    if (userClickedPattern[currentLevel] === buttonColours[gamePattern[currentLevel]]) {
        console.log("Success!");

        if (userClickedPattern.length === gamePattern.length) {
            console.log("Sequence completed! Proceed to the next level.");
            setTimeout(function() {
                nextSequence();
            }, 1000); 
        }
    } else {
        console.log("Wrong!");
        playSound("sounds/wrong.mp3");
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    firstKeyPress = true;
    userClickedPattern = [];
}
