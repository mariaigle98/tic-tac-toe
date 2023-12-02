import "./App.css";
import Square from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";

import { TURNS } from "./constants";
import { checkWinner, checkEndGame, computerTurn } from "./logic/board";
import { useState } from "react";
import confetti from "canvas-confetti";

//Componente App
function App() {
  //Definimos  el tablero, turno y ganador
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("winner");
    return winnerFromStorage ? winnerFromStorage : null;
  });

  //Función para cambiar de turno y actualizar el tablero
  const updateBoard = (index) => {
    //Si ya hay algo en la casilla o hay un ganador no hacer nada
    if (board[index] || winner) return null;

    //Usuario marca
    const newBoard = [...board];
    newBoard[index] = TURNS.X;

    //Chequeamos si hay ganador
    let newWinner = null;
    //Si hay ganador es el jugador
    if (checkWinner(newBoard)) {
      confetti();
      newWinner=TURNS.X
    } 
    //Si no, chequear si hay empate
    else if (checkEndGame(newBoard)) {
      newWinner="Empate"
    } 
    //Si no ha ganado el jugador ni hay empate, que juegue la máquina
    else {
      //Turno de la máquina
      const computerChoice = computerTurn(newBoard);
      newBoard[computerChoice] = TURNS.O;
      //Chequear si la máquina gana 
      if (checkWinner(newBoard) == TURNS.O) {
        newWinner=TURNS.O
      }
    }

    //Estado del tablero
    setBoard(newBoard);

    //Estado del ganador
    setWinner(newWinner);

    //Guardamos partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));

    //Guardamos el ganador si es que lo hay
    if (newWinner!==null){
      window.localStorage.setItem("winner", newWinner);
    }
    
  };

  //Función para resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("winner");
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset</button>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              isSelected={board[index]}
            >
              <div className="square-text">{board[index]}</div>
            </Square>
          );
        })}
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
