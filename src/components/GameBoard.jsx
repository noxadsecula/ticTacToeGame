
// State that linked to objects and arrays should be updated in immutable way.

export default function GameBoard({ onSelectSquare , board }) {

    
    
    // const [ gameBoard , setgameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setgameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])]
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare();
    // }


    return (
        <ol id='game-board'>
            {board.map((row,rowIndex) => (
            <li 
            key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (
                        <li key={colIndex}>
                            <button onClick = {() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    )

                    )}

                </ol>
            </li>)
            )

            }
        </ol>
    )

}