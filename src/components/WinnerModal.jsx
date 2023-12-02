import Square from "./Square";

export function WinnerModal({winner, resetGame}) {
  {
    if (winner==null) return null;

    else{
      return (
        <section className="winner">
          <div className="text">
            
            <header >{winner !== "Empate" && <Square><div className="square-text square-winner">{winner}</div></Square>}</header>
            <h2>{winner!=="Empate" ? "WINS" : "TAILS"}</h2>
            <footer>
              <button onClick={resetGame}>RESET</button>
            </footer>
          </div>
        </section>
      );
    }

    
  }
}
