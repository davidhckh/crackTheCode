var twoCorrect
var oneCorrectAndWellPlaced
var oneCorrectButWrongPlaced1
var oneCorrectButWrongPlaced2
var nothingIsCorrect

var correctCode


function generateNew() {
    //Reset
    twoCorrect = [-1, -1, -1]
    oneCorrectAndWellPlaced = [-1, -1, -1]
    oneCorrectButWrongPlaced1 = [-1, -1, -1]
    oneCorrectButWrongPlaced2 = [-1, -1, -1]
    nothingIsCorrect = [-1, -1, -1]
    correctCode = [0, 0, 0]

    answerLabel.innerHTML = "Reveal Answer"

    headerLabel.innerHTML = "CAN YOU CRACK THE CODE?"
    headerLabel.style.color = ("white")

    lockAnimation.style.backgroundPosition = "0px 0px"

    guess1.disabled = false
    guess2.disabled = false
    guess3.disabled = false

    continueButton.disabled = true
    continueButton.style.opacity = 0.0

    guess1.value = ""
    guess2.value = ""
    guess3.value = ""

    
    //Generate Correct Code
    correctCode[0] = returnNumberNotInArrays("", "", "")
    correctCode[1] = returnNumberNotInArrays(correctCode, "", "")
    correctCode[2] = returnNumberNotInArrays(correctCode, "", "")

    //Generate Hint 1
    var number1 = returnCorrectNumberNotEqual(-1, -1)
    var number2 = returnCorrectNumberNotEqual(number1, -1)
    var index1 = returnIndexNotEqual(correctCode.indexOf(number1), -1)
    var index2 = returnIndexNotEqual(correctCode.indexOf(number2), index1)
    twoCorrect[index1] = number1
    twoCorrect[index2] = number2

    //Generate Number For Hint 2,3,4
    hint2number = returnCorrectNumberNotEqual(-1, -1)
    hint3number = returnCorrectNumberNotEqual(hint2number, -1)
    hint4number = returnCorrectNumberNotEqual(hint2number, hint3number)

    //Generate Hint 2
    oneCorrectAndWellPlaced[correctCode.indexOf(hint2number)] = hint2number

    //Generate Hint 3
    if (twoCorrect.includes(hint3number)) {
        oneCorrectButWrongPlaced1[returnIndexNotEqual(correctCode.indexOf(hint3number), twoCorrect.indexOf(hint3number))] = hint3number
    } else {
        oneCorrectButWrongPlaced1[returnIndexNotEqual(correctCode.indexOf(hint3number))] = hint3number
    }


    //Generate Hint 4
    if (twoCorrect.includes(hint4number)) {
        oneCorrectButWrongPlaced2[returnIndexNotEqual(correctCode.indexOf(hint4number), twoCorrect.indexOf(hint4number))] = hint4number
    } else {
        oneCorrectButWrongPlaced2[returnIndexNotEqual(correctCode.indexOf(hint4number))] = hint4number
    }

    //Generate Nothing Is Correct
    nothingIsCorrect[0] = returnNumberNotInArrays(correctCode, "", "")
    nothingIsCorrect[1] = returnNumberNotInArrays(correctCode, nothingIsCorrect, "")
    nothingIsCorrect[2] = returnNumberNotInArrays(correctCode, nothingIsCorrect, "")

    //Replace All Empty -1
    var allEmptyPlaces = [];
    twoCorrect.forEach(function (item, index, array) { if (item == -1) { allEmptyPlaces.push(["hint1", index]) } })
    oneCorrectAndWellPlaced.forEach(function (item, index, array) { if (item == -1) { allEmptyPlaces.push(["hint2", index]) } })
    oneCorrectButWrongPlaced1.forEach(function (item, index, array) { if (item == -1) { allEmptyPlaces.push(["hint3", index]) } })
    oneCorrectButWrongPlaced2.forEach(function (item, index, array) { if (item == -1) { allEmptyPlaces.push(["hint4", index]) } })

    for (i = 0; i < randomIntFrom(5,5); i++) {
        var emptyToReplace = allEmptyPlaces[Math.floor(Math.random() * allEmptyPlaces.length)]
        var arrayToReplaceFrom = emptyToReplace[0]
        var indexToReplace = emptyToReplace[1]
        allEmptyPlaces.splice(allEmptyPlaces.indexOf(emptyToReplace), 1)


        if (arrayToReplaceFrom == "hint1") {
            twoCorrect[indexToReplace] = returnWrongNumberNotInArray(twoCorrect)
        } else if (arrayToReplaceFrom == "hint2") {
            oneCorrectAndWellPlaced[indexToReplace] = returnWrongNumberNotInArray(oneCorrectAndWellPlaced)
        } else if (arrayToReplaceFrom == "hint3") {
            oneCorrectButWrongPlaced1[indexToReplace] = returnWrongNumberNotInArray(oneCorrectButWrongPlaced1)
        } else if (arrayToReplaceFrom == "hint4") {
            oneCorrectButWrongPlaced2[indexToReplace] = returnWrongNumberNotInArray(oneCorrectButWrongPlaced2)
        }
    }

    for (i = 0; i < allEmptyPlaces.length+2; i++) {
        var emptyToReplace = allEmptyPlaces[Math.floor(Math.random() * allEmptyPlaces.length)]
        var arrayToReplaceFrom = emptyToReplace[0]
        var indexToReplace = emptyToReplace[1]
        allEmptyPlaces.splice(allEmptyPlaces.indexOf(emptyToReplace), 1)


        if (arrayToReplaceFrom == "hint1") {
            twoCorrect[indexToReplace] = returnNumberNotInArrays(correctCode, nothingIsCorrect, twoCorrect)
        } else if (arrayToReplaceFrom == "hint2") {
            oneCorrectAndWellPlaced[indexToReplace] = returnNumberNotInArrays(correctCode, nothingIsCorrect, oneCorrectAndWellPlaced)
        } else if (arrayToReplaceFrom == "hint3") {
            oneCorrectButWrongPlaced1[indexToReplace] = returnNumberNotInArrays(correctCode, nothingIsCorrect, oneCorrectButWrongPlaced1)
        } else if (arrayToReplaceFrom == "hint4") {
            oneCorrectButWrongPlaced2[indexToReplace] = returnNumberNotInArrays(correctCode, nothingIsCorrect, oneCorrectButWrongPlaced2)
        }
    }

   




    //Set Labels
    hint1.innerHTML = twoCorrect[0] + " " + twoCorrect[1] + " " + twoCorrect[2]
    hint2.innerHTML = oneCorrectAndWellPlaced[0] + " " + oneCorrectAndWellPlaced[1] + " " + oneCorrectAndWellPlaced[2]
    hint3.innerHTML = oneCorrectButWrongPlaced1[0] + " " + oneCorrectButWrongPlaced1[1] + " " + oneCorrectButWrongPlaced1[2]
    hint4.innerHTML = oneCorrectButWrongPlaced2[0] + " " + oneCorrectButWrongPlaced2[1] + " " + oneCorrectButWrongPlaced2[2]
    hint5.innerHTML = nothingIsCorrect[0] + " " + nothingIsCorrect[1] + " " + nothingIsCorrect[2]
}







//Required Functions For Generation

function returnNumberNotInArrays(array1, array2, array3) {
    while (true) {
        var randomInt = Math.floor(Math.random() * 10)
        if (!array1.includes(randomInt) && !array2.includes(randomInt) && !array3.includes(randomInt)) {
            return randomInt
        }
    }
}

function returnIndexNotEqual(index1,index2) {
    while (true) {
        var randomInt = Math.floor(Math.random() * 3)
        if (index1 != randomInt && index2 != randomInt) {
            return randomInt
        }
    }
}

function returnWrongNumberNotInArray(array) {
    while (true) {
        var randomInt = nothingIsCorrect[Math.floor(Math.random() * 3)]
        if (!array.includes(randomInt)) {
            return randomInt
        }
    }
}

function returnCorrectNumberNotEqual(number1, number2) {
    while (true) {
        var randomInt = correctCode[Math.floor(Math.random() * 3)]
        if (number1 != randomInt && number2 != randomInt) {
            return randomInt
        }
    }
}

function returnNumberNotEqual(number) {
    while (true) {
        var randomInt = Math.floor(Math.random() * 10);
        if (number != randomInt) {
            return randomInt
        }
    }
}

function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}