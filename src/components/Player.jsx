import { useState } from "react"

export default function Player({ initialName , symbol, isActive , onChangeName }) {
    const [ playerName, setPlayerName ] = useState(initialName)
    const [ isEditing, setIsEditing] = useState(false)

    function handleEditClick() {
        setIsEditing((isEditing) => !isEditing)

        if(isEditing) {
            onChangeName(symbol, playerName)
        }
        

    }

    function handleNameChange(event) {
        setPlayerName(event.target.value)

    }

    let editiblePlayerName = <span className="player-name">{playerName}</span>
    
    if(isEditing) {
        editiblePlayerName = <input type="text" required value={playerName} onChange={handleNameChange} />
        
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editiblePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    )
}