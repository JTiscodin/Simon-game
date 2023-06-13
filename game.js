var buttonColours = ["green", "red","yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;
$(document).on("keydown", function(){
    if(started){
        $("h1").text("Level " + level);
        nextSequence();
        
        started = false;
    }
})
$(".btn").on("click", function(e){
        
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game-over. Press any key to rest");
        started = true;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        playSound("wrong");
    }
}
function nextSequence(){
    userClickedPattern =[];
    level++;
    $("h1").text("Level " + level);
    var randomNumber =  Math.floor((Math.random()*4));
    randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
