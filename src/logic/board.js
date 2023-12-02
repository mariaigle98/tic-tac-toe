import random from "random";
import { WINNER_COMBOS } from "../constants";


//Función para chequear ganador
export const checkWinner = (boardToCheck) => {
  //Loop en las combinaciones ganadoras
  for (const combo in WINNER_COMBOS) {
    const [a, b, c] = WINNER_COMBOS[combo];
    if (
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[b] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

//Chequeamos si se ha acabado el juego
export const checkEndGame = (boardToCheck) => {
  //Si todos los items son distintos de null, return true
  return boardToCheck.every((square) => {
    return square !== null;
  });
};

//Turno de la máquina
export const computerTurn = (currentBoard) =>{
  let randomChoice=random.int(0,currentBoard.length)
  while (currentBoard[randomChoice]!==null){
    randomChoice=random.int(0,currentBoard.length)
  }
  return randomChoice
}

