// $("h1").text("bye");

/* INDEX:
wrong = 0
green = 1
red = 2
yellow = 3
blue = 4
*/

var userPressedOrder = []
var orderOfLevel = []
var colorToNumber = ["wrong", "green", "red", "yellow", "blue"]
var countPressedA = 0
var levelCount = 1
var isGameFinish = false

// Start Game by press A key
$(document).keydown(function(event){
    if (event.key === "a" && countPressedA === 0) {
        $("h1").text("Level " + levelCount);
        startGame();
        countPressedA += 1
    }
})

// Restart Game by press N key
$(document).keydown(function(event){
    if (event.key === "n") {
        $("h1").text("Press A Key to start");
        countPressedA = 0 
        levelCount = 1
        userPressedOrder = []
        orderOfLevel = []
        $("h2").text("Last Game Level:");
    }
})

// Start game initial Level
function startGame() {
    randomPick = addLevel() 
    makeSound(randomPick)
    makeButtonBlink(randomPick)
}

// Add level each turn
function addLevel() {
    var randomPick = Math.floor(Math.random()*4+1)
    orderOfLevel.push(colorToNumber[randomPick])
    return randomPick
}

// Sound
function makeSound(number) {
    var soundMe = new Audio(src="sounds/"+colorToNumber[number]+".mp3") 
    soundMe.play();
    soundMe.volume = 0.4;
}

// Blink
function makeButtonBlink(number) {
    $("."+colorToNumber[number]).fadeOut(250);
    $("."+colorToNumber[number]).fadeIn(250);
}

// Next Level
function showNextLevel() {
    $("h1").text("Level " + levelCount);
    tranlateToNum = translateTextToNumber(orderOfLevel[orderOfLevel.length-1])
    makeSound(tranlateToNum)
    makeButtonBlink(tranlateToNum)
}

// Button Pressed by user
$(".button").click( function(event) {
    userPressedOrder.push(event.target.classList[1])
    console.log(userPressedOrder)
    levelLogic()
});

// Translate color to bumber
function translateTextToNumber(NameOfColor) {
    if (NameOfColor === "green") {
        return 1
    } else if (NameOfColor === "red") {
        return 2
    } else if (NameOfColor === "yellow") {
        return 3
    } else if (NameOfColor === "blue") {
        return 4
    }
}

// Main Logic
function levelLogic () {
    var lastPressedByUser = userPressedOrder.length-1
    if (orderOfLevel[lastPressedByUser] === userPressedOrder[lastPressedByUser]) {
        console.log("Good")
        tranlateToNum = translateTextToNumber(userPressedOrder[lastPressedByUser])
        console.log("lastPressedByUser: " + lastPressedByUser)
        console.log("tranlateToNum: " + tranlateToNum)
        console.log("lastPressedByUser: " + userPressedOrder[lastPressedByUser])

        makeButtonBlink(tranlateToNum)
        makeSound(tranlateToNum)

    }  else {
        console.log("Bad")
        makeSound(0)
        $("h1").html("Game Over, Press N Key to Restart");
        $("h2").text("Last Game Level: " + levelCount);
        isGameFinish = true
    }

    if (userPressedOrder.length === orderOfLevel.length && isGameFinish !== true) {
        levelCount += 1
        addLevel()
        userPressedOrder = []
        console.log(orderOfLevel)
        setTimeout(showNextLevel, 1500);
    }
}
