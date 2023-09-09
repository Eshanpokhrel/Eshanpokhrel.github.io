const cells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alertBox = document.querySelector(".alertBox");
const container = document.querySelector(".container");
const turnAlert = document.querySelector(".turnAlert");

let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `Player Red: ${currentPlayer}*`;
player2.textContent = `Player Blue: ${nextPlayer}`;

const startGame = () => {
    // showTurnAlert(`Red's Turn `)
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};

const handleClick = (e) => {
  if (e.target.textContent === "")
    // console.log(e.target);
    e.target.textContent = playerTurn;
  if (checkWin()) {
    // console.log(`${playerTurn} wins`);
    // showAlert(`${playerTurn} wins`)
    disableCells();
    // console.log(playerTurn);
    if(playerTurn=='X'){
        container.style.background ='rgb(214, 8, 8)';
    }
    else{
        container.style.background='blue';
    }
    // alertBox.style.display = 'flex';

  } else if (checkTie()) {
    // console.log("Tie");
    showAlert(`DRAW`);
    disableCells();
    // alertBox.style.display = 'flex';

  } else {
      changeTurn();
      if(playerTurn==="X"){
        player1.textContent = `Player Red: ${currentPlayer}*`;
        player2.textContent=`Player Blue:${nextPlayer}`
        // showTurnAlert(`Red's Turn `)
        // turnAlert.style.color = 'rgb(214, 8, 8)'
      }
      else{
        player2.textContent=`Player Blue:${nextPlayer}*`
        player1.textContent = `Player Red: ${currentPlayer}`;
    //     showTurnAlert('Blue\'s Turn ')
    //     turnAlert.style.color= '#03a9f4'
       }
  }
};

const changeTurn = () => {
  // if (playerTurn === currentPlayer){
  //     playerTurn = nextPlayer;
  // }
  // else{
  //     playerTurn = currentPlayer;
  // }
  playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

const checkWin = () => {
  //check rows for winning combination
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCondition.length; i++) {
    const [pos1, pos2, pos3] = winCondition[i];
    //   console.log(`${pos1}${pos2}${pos3}`);
    if (
      cells[pos1].textContent != "" &&
      cells[pos1].textContent === cells[pos2].textContent &&
      cells[pos2].textContent === cells[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
};

const checkTie = () => {
  let emptyCellsCount = 0;
  cells.forEach((cell) => {
    if (!cell.textContent) {
      emptyCellsCount++;
    }
  });
  return emptyCellsCount === 0 && !checkWin();
};

const disableCells = ()=>{
    cells.forEach(cell =>{
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled')
        cell.style.cursor = "no-drop"
    })
}

const restartGame = () =>{
    cells.forEach(cell =>{
        cell.style.cursor = "pointer"
        container.style.background ='none';
        alertBox.style.display = 'none';
        cell.textContent = ""
        cell.classList.remove('disabled');
    })
    startGame();
}

const showAlert = (msg) => {
    alertBox.style.display = 'flex';
    alertBox.textContent = msg;
}

// const showTurnAlert = (msg) => {
//     turnAlert.style.display = 'flex';
//     turnAlert.textContent= msg ;
//     setTimeout(()=>{
//         turnAlert.style.display='none'
//     },1500)
//     clearTimeout()
// }

restartBtn.addEventListener('click',restartGame)

startGame();
