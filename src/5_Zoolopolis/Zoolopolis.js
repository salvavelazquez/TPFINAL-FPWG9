import React, { useState } from 'react';
import Juego from './components/Juego';


import '../5_Zoolopolis/Zoolopolis.css';

import Felicitaciones from './components/Felicitaciones.js';

function Zoolopolis() {
    /************** */
    const [users, setUsers] = useState([]);
    const [turn,setTurn] = useState(1);
    //ronda DEL JUEGO PARA AMBOS USER
    const [numeroAleatorio, setNumeroAleatorio] = useState(Math.floor(Math.random() * (10 - 5 + 1)) + 5);

    /*************** */
    const [nombreJugador, setNombreJugador] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);
    
    const manejarClickJugar = (nombre) => {
        setNombreJugador(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setMostrarFelicitaciones(false);

        const newUser = { id: turn, name: nombre, score: 0 };
        setUsers([...users, newUser]);
    };

    const alTerminar = (puntaje,numeroAleatorio) => {
        setPuntaje(puntaje);
        setNumeroAleatorio(numeroAleatorio);
        users[turn-1].score = puntaje;
        setRondaActual(1);
        setTurn(turn+1);
        if(turn <= 1){
            setMostrarJuego(false);
            setMostrarFelicitaciones(false);
        }else{
            setMostrarJuego(false);
            setMostrarFelicitaciones(true);
        }
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div className="centrar-contenido1">
                <h1 className="title1">Enter your Name</h1>
                <input
                    type="text"
                    placeholder={`Player ${turn}`}
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button className="button-init" onClick={() => manejarClickJugar(nombreJugador)}>Play</button>
            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
            
                <Juego
                    nombreJugador={nombreJugador}
                    puntaje={puntaje}
                    setPuntaje={setPuntaje}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                    rondaJuego={numeroAleatorio}
                />
            
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            
            <div>
                <section className='Animacion'>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                    <div className='Decoracion'></div>
                </section>
                <Felicitaciones nombreJugador={nombreJugador} puntaje={puntaje} users={users} />
            </div>
        );
    }
}

export default Zoolopolis;
