import React from 'react'
import Player from './player'

export const info: React.FC = () => {
    if (Player.length >= 11) 
        return (
        <div style={{ border: '1px solid green', padding: '0.5rem', borderRadius: '5px', width: '200px', background: 'red', color: 'white' }}>
            <h3>Information!</h3>
            <p>Team has enough players</p>
        </div>
    )
}  

export default info