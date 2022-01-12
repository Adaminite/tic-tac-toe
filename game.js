function Player(name, symbol){

    const getName = () => {
        return name;
    }

    const getSymbol = () => {
        return symbol;
    }
    return {getName, getSymbol};
}


const p1 = Player("Omar", "X");
const p2 = Player("Zheng", "O");


const gameBoard = ( () => {
    let gameBoard = [ ["", "", ""], ["", "", ""], ["", "", ""] ];

    const add = (symbol, position) => {
        position = Number(position);
        const row = Math.floor(position / 3) - 1;
        const col = position % 3;

        gameBoard[row][col] = symbol;
    }
})();