import React from 'react';
import '../Congratulation.css';

function Felicitaciones({ nombreJugador, puntaje, users }) {
    return (
        <div className="center-content2">
            
            <h1> {users[0].score === users[1].score ? "¡¡ IS A TIE !!" : "¡¡ WINNER !!"}</h1>
            <h1>
                {users[0].score === users[1].score ? 
                    "" :
                    (`¡Congratulations ${users[0].score > users[1].score ? users[0].name : users[1].name}!`)
                }
            </h1>
            

            {users.map((user) => (
                
                <div key={user.id}>
                    <p>{user.name} your total score is: {user.score}</p>
                    
                </div>
            ))}
        </div>
    );
}

export default Felicitaciones;
