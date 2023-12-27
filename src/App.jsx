import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log" 
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]


// Derivers **

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X'

      if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = 'O';
      }

      return currentPlayer;
}


function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for(const turn of gameTurns) {
        const {square, player} = turn;
        const {row,col} = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(players, gameBoard) {
  let winner;

    for(const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
      }
    }

    return winner;

}

function App() {
  const [ gameTurns, setGameTurns ] = useState([])
  const [ players, setPlayer] = useState(PLAYERS)


  // Derived variables
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  const winnerWinnerChickenDinner = deriveWinner(players,gameBoard)
  const hasDraw = gameTurns.length === 9 && !winnerWinnerChickenDinner;

  // Event listeners and handlers **


  function handleActivePlayer(rowIndex, colIndex) {
    //setActivePlayer((currActivePlayer) =>  currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns)



      const updatedTurns = [
        {square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...prevTurns
      ]

      return updatedTurns;
    })
  }

  function handleNamePlayerChange ( symbol, newName ) {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })

  }

  function handleRematch () {
    setGameTurns([])
  }
  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initialName={PLAYERS.X} 
          symbol='X' 
          isActive={activePlayer === 'X'}
          onChangeName={handleNamePlayerChange}/>

          <Player 
          initialName={PLAYERS.O}  
          symbol='O' 
          isActive={activePlayer === 'O'}
          onChangeName={handleNamePlayerChange}/>

        </ol>
        {(winnerWinnerChickenDinner || hasDraw ) && <GameOver winner = {winnerWinnerChickenDinner} onRestart = {handleRematch} /> }
        <GameBoard onSelectSquare={handleActivePlayer} board = {gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
