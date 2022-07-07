const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')

const xClass = 'x';
const oClass = 'o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let oTurn;


startGame()
restartButton.addEventListener('click', startGame)
// Adds event listener to every cell but will only fire once. 
// Once clicked you cannot trigger event again. 
// Runs function to set class on the board
function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {
            once: true
        })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerHTML = `${oTurn ? "O's" : "X's"} Win!`
    }
    winningMessageElement.classList.add('show')
}

//checking if every cell has been filled by checking if cell has either or classlist of X or O
//if every cell has a classlist then we want to return true, naturally 
//cellElements doesn't actually have a .every() method so you can use destructuring as we did below
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

// This simply adds the marker in the game by adding the currentClass to the cell
// In this case it would be either x or o
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// What this does is simply set oTurn to the opposite which in this case is True
// By doing this, the currentClass is changed from X to O
function swapTurns() {
    oTurn = !oTurn;
}

//What this does is first ensure both x and o classes are not on the board
//After it looks at who's turn it is and sets the board classList to either x or o
function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (oTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}


function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}