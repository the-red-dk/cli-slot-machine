//1, deposit money
//2, determine number of lines to bet on   
//3. collect bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings 
//7. play again

// function deposit() {
//     return 1
// }

const prompt = require("prompt-sync")();

//global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

//newway huh, anyway here is #1
const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const intdepositAmount = parseFloat(depositAmount);

    if (isNaN(intdepositAmount) || intdepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
        }
    else {
        return intdepositAmount;
        }
    }
};   
// here goes 2nd function to collect lines to bet on
const getNumberofLines = () => {
    while (true) {
    const lines = prompt("Enter the number of lines to bet on(1-3): ")
    const numberlines = parseFloat(lines);

    if (isNaN(numberlines) || numberlines > 3 || numberlines <= 0) {
        console.log("Invalid input, please enter number 1-3.")
        }
    else {
        return numberlines;
        }
    }
};
// 3rd function to collect bet amount
const getBet = (balance, lines) => {
    while (true) {
    const Bet = prompt("Enter the bet per line: ");
    const BetAmount = parseFloat(Bet);
    
    if (isNaN(BetAmount) || BetAmount > (balance / lines) || BetAmount <= 0) {
        console.log("Bet exceeds your balance, try a lesser amount.")
    }
    else {
        return BetAmount;
        }
    }
}


//4th?
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, BetAmount, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

            if (allSame) {
                winnings += BetAmount * SYMBOLS_VALUE[symbols[0]];
            } 
        }

        return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
    console.log("Your balance is $" + balance);
    const numberoflines = getNumberofLines();
    const BetAmount = getBet(balance, numberoflines);
    balance -= BetAmount * numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, BetAmount, numberoflines);
    balance += winnings;
    console.log("You won $" + winnings.toString())
    
    if (balance <= 0) {
        console.log("You ran out of money!")
        break;
    }

    const playAgain = prompt("Do you want to play again?: (y/n)");
    
    if (playAgain != "y") {
        break;
    }
    }
};

game();

// console.log(balance);
// console.log(numberoflines);
// console.log(BetAmount);
// console.log(reels);
// console.log(reels);
// console.log(rows);  
