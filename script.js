import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = 'learn'
// let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

const aslDictionary = {
    'a': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sign_language_A.svg/1200px-Sign_language_A.svg.png',
    'b': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sign_language_B.svg/452px-Sign_language_B.svg.png',
    'c': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Sign_language_C.svg',
    'd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Sign_language_D.svg/242px-Sign_language_D.svg.png',
    'e': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sign_language_E.svg/312px-Sign_language_E.svg.png',
    'f': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sign_language_F.svg/1009px-Sign_language_F.svg.png',
    'g': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Sign_language_G.svg',
    'h': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sign_language_H.svg/2560px-Sign_language_H.svg.png',
    'i': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Sign_language_I.svg',
    'j': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Sign_language_J.svg',
    'k': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sign_language_K.svg/640px-Sign_language_K.svg.png',
    'l': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Sign_language_L.svg',
    'm': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sign_language_M.svg',
    'n': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Sign_language_N.svg',
    'o': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Sign_language_O.svg',
    'p': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sign_language_P.svg/1024px-Sign_language_P.svg.png',
    'q': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Sign_language_Q.svg',
    'r': 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Sign_language_R.svg',
    's': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sign_language_S.svg/336px-Sign_language_S.svg.png',
    't': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Sign_language_T.svg',
    'u': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Sign_language_U.svg',
    'v': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sign_language_V.svg',
    'w': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sign_language_W.svg',
    'x': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Sign_language_X.svg/1200px-Sign_language_X.svg.png',
    'y': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sign_language_Y.svg/919px-Sign_language_Y.svg.png',
    'z': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Sign_language_Z.svg'

}
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'yellowgreen') {
                return
            } 

            if (oldColor === 'gold' && color !== 'yellowgreen') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'lightgrey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'yellowgreen'
            } else {
                // shade box gold
                letterColor = 'gold'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)

            // put in ASL sign
            box.textContent = ""
            var img = document.createElement('img');
            img.style.height = "80%";
            img.style.margin = '10px';
            
            img.src = aslDictionary[letter];
            box.appendChild(img)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard()