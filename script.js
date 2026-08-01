const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",play);
});

restart.addEventListener("click",resetGame);

function play(){

    const index=this.dataset.index;

    if(board[index]!="" || gameOver)
        return;

    board[index]=currentPlayer;
    this.textContent=currentPlayer;

    if(checkWinner()){

        status.textContent=`🎉 Player ${currentPlayer} Wins!`;
        gameOver=true;
        return;

    }

    if(board.every(cell=>cell!="")){

        status.textContent="🤝 Draw!";
        gameOver=true;
        return;

    }

    currentPlayer=currentPlayer==="X"?"O":"X";

    status.textContent=`Player ${currentPlayer}'s Turn`;

}

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c]=pattern;

        if(
            board[a]!="" &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){
            return true;
        }

    }

    return false;

}

function resetGame(){

    board=["","","","","","","","",""];

    currentPlayer="X";

    gameOver=false;

    status.textContent="Player X's Turn";

    cells.forEach(cell=>{

        cell.textContent="";

    });

}