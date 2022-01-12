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
    let board = [ ["", "", ""], ["", "", ""], ["", "", ""] ];

    const add = (symbol, position) => {
        position = Number(position);
        const row = Math.floor(position / 3) - 1;
        const col = position % 3;

        board[row][col] = symbol;
        
    };

    const checkForWin = () => {

        let a = board[0][0];
        let b = board[0][1];
        let c = board[0][2];
        let d = board[1][0];
        let e = board[2][0];
        let f = board[1][1];
        let g = board[2][2];

        if( (new Set([a,b,c])).size === 1 || (new Set([a,d,e])).size === 1 || (new Set([a, f ,g])).size === 1) {
            return a;
        }


        a = board[1][0];
        b = board[1][1];
        c = board[1][2];
        d = board[0][1];
        e = board[2][1];

        if( (new Set([a, b, c])).size === 1 || (new Set([b,d,e])).size === 1){
            return b;
        }

        a = board[2][0];
        b = board[2][1];
        c = board[2][2];
        d = board[1][2];
        e = board[0][2];

        if( (new Set([a, b, c])).size === 1 || (new Set([c, d, e])).size === 1){
            return c;
        }

        f = board[1][1];

        if( (new Set([a, f, e])).size === 1){
            return a;
        }

        return "";

    }

    const reset = () =>{
        board = [ ["", "", ""], ["", "", ""], ["", "", ""] ];
    }

    return{add, checkForWin, reset}
})();


const displayController = ( () => {

    let board = document.querySelector("#board");

    const setUpBoard = () => {
        board.textContent = "";
        for(let i = 0; i < 9; i++){
            let square = document.createElement('div');
            square.classList.add("square");
            square.id = i;
        }
    }


} )();