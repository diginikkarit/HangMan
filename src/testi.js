let word = "Sarvikuono"
let toGuessChars = word.split('')
let guessedChars = ['a','k','t','S']
let chars = word.split('')

let currentString = "";
toGuessChars.forEach(element => {
    let x = guessedChars.find(e => e == element)
    if(x != undefined){
        currentString += x
    }
    else{
        currentString += '*'
    }
});

console.log(currentString)


