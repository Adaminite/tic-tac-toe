function Player(name, symbol){

    const getName = () => {
        return name;
    }

    const getSymbol = () => {
        return symbol;
    }
    return {getName, getSymbol};
}



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

    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener('click', (e) => {
        gameBoard.reset();
        setUpBoard();
        document.querySelector("#result").textContent = "";
    });

    let turn = "X";

    let numTurns = 0;
    let isOver = false;


    let p1;
    let p2;

    const setUpBoard = () => {
        board.textContent = "";
        for(let i = 0; i < 9; i++){
            let square = document.createElement('div');
            square.classList.add("square");
            square.id = i;
            square.addEventListener('click', makeMove)

            board.appendChild(square);

        }

        let p1Name = prompt("Please enter name of the X player:");
        let p2Name = prompt("Please enter name of the O player:");

        p1 = Player(p1Name, "X");
        p2 = Player(p2Name, "O");


    }

    const makeMove = (e) =>{
        if(e.target.textContent === "" && !isOver){
            e.target.textContent = turn;
            let id = e.target.id;
            gameBoard.add(turn, id);

            toggleTurn();

            if(numTurns > 4){
                checkIfOver();
            }


        }
        
    }

    const toggleTurn = () =>{
        (turn === "X") ? turn = "O": turn = "X";
        numTurns++;
    }

    const checkIfOver = () => {
        let result = gameBoard.checkForWin();

        if(result !== ""){
            isOver = true;

            let winner = p1.getName() === result ? p1.getName(): p2.getName();
            displayResults(winner);

        }
    }

    const displayResults = (winner) => {
        let h2 = document.querySelector("#result");
        h2.textContent = `${winner} is the winner!`;
    }

    return {setUpBoard};

} )();



displayController.setUpBoard();