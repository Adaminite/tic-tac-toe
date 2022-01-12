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
        const row = Math.floor(position / 3);
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

    let resetButton = document.querySelector("#reset");
    resetButton.addEventListener('click', (e) => {
        gameBoard.reset();
        setUpBoard();
        document.querySelector("#result").textContent = "";
    });

    let turn;
    let isOver;

    let numTurns = 0;

    let p1;
    let p2;

    const setUpBoard = () => {
        board.textContent = "";
        isOver = false;
        turn = "X";

        for(let i = 0; i < 9; i++){
            let square = document.createElement('div');
            square.classList.add("square");
            square.id = i;
            square.addEventListener('click', makeMove)

            board.appendChild(square);

        }

        let p1Name;
        do{
            p1Name = prompt("Please enter name of the X player:");
        } while(p1Name === "" || p1Name === null);

        let p2Name;
        do{
            p2Name = prompt("Please enter name of the O player:");
        } while(p2Name === "" || p2Name === null);

        p1 = Player(p1Name, "X");
        p2 = Player(p2Name, "O");


    }

    const makeMove = (e) =>{
        if(e.target.textContent === "" && !isOver){
            e.target.textContent = turn;
            let id = e.target.id;
            gameBoard.add(turn, id);
            numTurns++;

            if(numTurns > 4){
                checkIfOver();
            }

            toggleTurn();

            if(numTurns === 9){
                displayResults("draw");
            }

        }
        
    }

    const toggleTurn = () =>{
        (turn === "X") ? turn = "O": turn = "X";
        
    }

    const checkIfOver = () => {
        let result = gameBoard.checkForWin();

        if(result !== ""){

            let winner = p1.getSymbol() === result ? p1.getName(): p2.getName();
            displayResults(winner);
        }
    }

    const displayResults = (winner) => {
        let h2 = document.querySelector("#result");

        if(winner === "draw"){
            h2.textContent = "It's a tie!"
        }
        else{
            h2.textContent = `${winner} is the winner!`;
        }

        isOver = true;
        
    }

    return {setUpBoard};

} )();



displayController.setUpBoard();