var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$( document ).ready(function() {
  console.log("ready!")
  if (started = true) {
    $(".btn").addClass("disabledbutton");
  }else if (started = false) {
    $(".btn").removeClass("disabledbutton");
  }
});

$(".start-btn").on("click",function() {
  if (started = true) {
    $("h1").text("Level " + level);
    $(".btn").removeClass("disabledbutton");
    nextSequence();
    started = true;
    $(".start-btn").css("display", "none");
    $(".restart-icon").css("display", "inline");
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(".restart-icon").on("click", function(){
  $("h1").text("Welcome to Simon Game!");
  $(".start-btn").css("display", "inline");
  $(".restart-icon").css("display", "none");
  $(".btn").addClass("disabledbutton");
  startOver();
});

$(".instruction-btn").on("click", function(){
  if ($(".instruction").is(":hidden")){
    $(".instruction").css("display", "inline");
  }else{
    $(".instruction").css("display", "none");
  }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").css("margin", "2%");
      $("h1").text("Game Over, Press RESTART to restart");
      $(".container").css("margin-top", "10px");


      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
};

function previousSequence(){
  if (gamePattern.length >1){
    $("#" + gamePattern[0]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[0]);
    for (let i = 1 ; i < (gamePattern.length -1) ; i ++){
      setTimeout(() => {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
      }, 300*i)
     
    };
  }else{
    for (let i = 1 ; i < (gamePattern.length -1) ; i ++){
      setTimeout(() => {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
      }, 300*i)
     
    };
  };
  
};


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  previousSequence();
  setTimeout(() => {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }, (300 * gamePattern.length-1))
};



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

