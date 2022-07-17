import React from 'react'

function Die({ value, handleDice }) {

    const styles = {
        backgroundColor: value.isHeld && '#59e391',
        color: value.isHeld ? 'white' : 'black'
    }

    return (
        <div
            style={styles}
            className="die"
            onClick={() => handleDice(value.id)}
        >
            <h2>{value.value}</h2>
        </div>
    )
}

export default Die