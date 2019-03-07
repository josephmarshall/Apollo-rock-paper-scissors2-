$(document).ready( function() {

  var playerShip = $('#player-ship');
  var computerShip = $('#computer-ship');
  var playerScore = 0;
  var computerScore = 0;
  var playerCharge;
  var computerCharge;
  var playerShields;
  var computerShields;
  var userDisplay;
  var computerDisplay;
  var gameOver;

  function resetGame(){
  playerCharge = 0;
  computerCharge = 0;
  playerShields = true;
  computerShields = true;
  gameOver = false;
  userDisplay = "ship.png"
  computerDisplay = "ship_comp.png"
  showUserOptions()
  }

  resetGame()

  function showUserOptions() {
    if (playerCharge > 0) {
    $('#fire').show()
    } else {
    $('#fire').hide()
    }

    if (playerCharge > 1) {
    $('#super').show()
    } else {
    $('#super').hide()
    }

    if (playerShields === false) {
    $('#shields').hide()
    } else {
    $('#shields').show()
    }
  }
  


  $('button').on("click", function(){
    outcome(userChoice(this.id), computerChoice())
    showUserOptions()
    $(playerShip).attr("src", userDisplay)
    $(computerShip).attr("src", computerDisplay)
    var playerWeaponBar = 25*playerCharge + "px"
    var computerWeaponBar = 25*computerCharge + "px"
    $('#player-weapon-status').css("width", playerWeaponBar)
    $('#computer-weapon-status').css("width", computerWeaponBar)
    var playerShieldBar = $('#player-shield-status')
    var computerShieldBar = $('#computer-shield-status')
      if (playerShields === false){
      $(playerShieldBar).css("color", "red")
      $(playerShieldBar).text("Shields Failed")
      } else {
      $(playerShieldBar).css("color", "white")
      $(playerShieldBar).text("Shields Ready")
      }

      if (computerShields === false){
      $(computerShieldBar).css("color", "red")
      $(computerShieldBar).text("Shields Failed")
      } else {
      $(computerShieldBar).css("color", "white")
      $(computerShieldBar).text("Shields Ready")
      }

      $('#player-score').text("Player Score: " + playerScore)
      $('#computer-score').text("Computer Score: " + computerScore)

    if (gameOver === true) {
      resetGame()
    }
  })

  
function userChoice(choice) {

  switch (choice) {
    case "charge":
    userDisplay = "ship.png"
    break;
    case "fire":
    userDisplay = "fire.png"
    break;
    case "shields":
    userDisplay = "shield.png"////////////
    break;
    case "super":
    userDisplay = "super.png"
    break;
}
return choice
}

function computerChoice() {
  var choices = ["charge"]
  if (computerShields === true){
    choices.push("shields")
  }
  if (computerCharge >= 1){
    choices.push("fire")
  }
  if (computerCharge >= 2){
    choices.push("super")
  }

  var computerChoice = choices[Math.floor(Math.random() * choices.length)] 
  
  switch (computerChoice) {
    case "charge":
    computerDisplay = "ship_comp.png"
    break;
    case "fire":
    computerDisplay = "fire_comp.png"
    break;
    case "shields":
    computerDisplay = "shield_comp.png"
    break;
    case "super":
    computerDisplay = "super_comp.png"
    break;
  }
  return computerChoice;  
}

function outcome(userSelect, compSelect) {
  if (userSelect === "fire" && compSelect === "fire") {
  userLose()
  computerLose()
  userResetCharge1()
  } else if (userSelect === "fire" && compSelect === "charge") {
  userWin()
  computerLose()
  userResetCharge1()
  } else if (userSelect === "fire" && compSelect === "super") {
  userLose()
  computerWin()
  userResetCharge1()
  computerResetCharge2()
  } else if (userSelect === "fire" && compSelect === "shields") {
  userResetCharge1()
    //computerNone()
  } else if (userSelect === "super" && compSelect === "fire") {
  userWin()
  computerLose()
  userResetCharge2()
  computerResetCharge1()
  } else if (userSelect === "super" && compSelect === "charge") {
  userWin()
  computerLose()
  userResetCharge2()
  } else if (userSelect === "super" && compSelect === "super") {
  userLose()
  computerLose() 
  userResetCharge2()
  computerResetCharge2()
  } else if (userSelect === "super" && compSelect === "shields") {
  userResetCharge2()
  computerShieldsDown()
  } else if (userSelect === "charge" && compSelect === "fire") {
  userLose()
  computerWin()
  computerResetCharge1()
  } else if (userSelect === "charge" && compSelect === "charge") {
  userCharge()
  compCharge()
  } else if (userSelect === "charge" && compSelect === "super") {
  userLose()
  computerWin()
  computerResetCharge2()
  } else if (userSelect === "charge" && compSelect === "shields") {
  userCharge()
  //computerNone()
  } else if (userSelect === "shields" && compSelect === "fire") {
  //userNone()
  computerResetCharge1()
  } else if (userSelect === "shields" && compSelect === "charge") {
  //userNone()
  compCharge()
  } else if (userSelect === "shields" && compSelect === "super") {
  userShieldsDown()
  computerResetCharge2()
  } else {
  }
}

function userWin(){
console.log("user Win")
computerDisplay = "explode.png"
playerScore += 1;
gameOver = true;
}

function userLose(){
console.log("user Lose")
userDisplay = "explode.png"
gameOver = true;
}

function computerWin(){
console.log("comp win")
computerScore += 1;
}

function computerLose(){
console.log("comp lose")
computerDisplay = "explode.png"
}

function userCharge() {
playerCharge += 1;
console.log("playerCharge:" + playerCharge)
}

function compCharge() {
computerCharge += 1
console.group("computerCharge:" + computerCharge)
}

function userShieldsDown(){
playerShields = false;
userDisplay = "shieldsDown.png"
console.log("playerShields:" + playerShields)
}

function computerShieldsDown(){
computerShields = false;
computerDisplay = "shieldsDown_comp.png"
console.log("computerShields" + computerShields)
}

function userResetCharge1(){
playerCharge -= 1;
console.log("playerCharge:" + playerCharge)
}

function computerResetCharge1(){
computerCharge -= 1;
console.log("computerCharge:" + computerCharge)
}

function userResetCharge2(){
playerCharge -= 2;
console.log("playerCharge:" + playerCharge)
}

function computerResetCharge2(){
computerCharge -= 2;
console.log("computerCharge:" + computerCharge)
}

});