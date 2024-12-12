import React from 'react'
import Player from './player'

const Warning: React.FC = () => {
    if (Player.length < 11) {
        return (
            <div style={{ border: '1px solid black', padding: '0.5rem', background: 'red', borderRadius: '5px', width: '200px' }}>
                <h3>Warning!!!</h3>
                <p>Team has less than 11 players</p>
            </div>
        )
    }
   
}
export default Warning