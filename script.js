//allocate variables for the html tags
//allocate variable for tile
const tile = document.querySelectorAll('.tile');
//allocate variable for reset 
const resetBtn = document.querySelector('#reset');
//allocate variable for status
const statusText = document.querySelector('#status');
//create winningCondition for the board
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//sets the board
let board = ['', '', '', '', '', '', '', '', '']
//sets the string for current player
let currentPlayer = 'X'
//sets boalean to check if the game is still running
let active = false;
startGame()
//Below we set the functions
//this function to start the game
function startGame(){
    tile.forEach(tile=>tile.addEventListener('click', tileClicked))
    resetBtn.addEventListener('click', resetGame)
    statusText.textContent = `${currentPlayer}'s turn`;
    active = true;
}
//this function to make a tile active from a click
function tileClicked(){
    const tileIndex = this.getAttribute("tileIndex");

    if(board[tileIndex] != "" || !active){
        return;
}

updateTile(this, tileIndex);
checkWinner();
}
//function to update the tiles
function updateTile(tile,index){
    board[index] = currentPlayer
    tile.textContent = currentPlayer
}
//function to change players turn
function playerChange(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statusText.textContent = `${currentPlayer}'s turn`
}
//function to check winner
function checkWinner(){
    let roundWon = false

    for(let i = 0; i < winningCondition.length; i++){
        const condition = winningCondition[i];
        const tileA = board[condition[0]];
        const tileB = board[condition[1]];
        const tileC = board[condition[2]];

        if(tileA == "" || tileB == "" || tileC == ""){
            continue;
        }
        if(tileA == tileB && tileB == tileC){
            roundWon = true;
            break
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        active = false;
    }
    else if(!board.includes("")){
        statusText.textContent = `Draw!`
        active = false
    }
    else{
        playerChange()
    }
}
//function to restart game
    function resetGame(){
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `${currentPlayer}'s turn`
        tile.forEach(tile => tile.textContent = "")
        active = true
}
