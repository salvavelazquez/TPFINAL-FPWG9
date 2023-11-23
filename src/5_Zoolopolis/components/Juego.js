import React, { useState, useEffect } from 'react';
import '../Juego.css';
import data from './data.json';
import BackgroundSound from './BackgroundSound.js';
import correctSound from './correct.mp3';
import incorrectSound from './incorrect.mp3';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, rondaJuego }) {
    const [correctSoundAudio] = useState(new Audio(correctSound));
    const [incorrectSoundAudio] = useState(new Audio(incorrectSound));
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);
    const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(1);

    /*cargar datos iniciales, se utiliza para que el efecto se ejecute una sola vez después de que el componente se monte.*/
    useEffect(() => {
        obtenerOpcionesAleatorias();
        //
        setRondasTotales(rondaJuego);
        console.log("Ronda:" + rondaJuego);
    }, []);

    const obtenerAnimalAleatorio = () => {
        // Obtiene un animal aleatorio del archivo JSON
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        return data[indiceAleatorio];
    };

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.some((animal) => animal.id === opcion.id)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };

    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo.id) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
            correctSoundAudio.play();
        } else {
            setEsCorrecto(false);
            incorrectSoundAudio.play();
        }
        setPuedeHacerClic(false);
    };

    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {
            setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
        } else {
            alTerminar(puntaje, rondaJuego);
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    const eliminarRespuestaIncorrecta = () => {
        if (respuestasIncorrectas > 0) {
            // Filtrar las opciones para mantener solo las respuestas incorrectas
            const opcionesIncorrectas = opciones.filter(animal => animal.id !== animalObjetivo.id);

            // Seleccionar una respuesta incorrecta al azar para eliminar
            const indiceEliminar = Math.floor(Math.random() * 2);

            // Actualizar las opciones eliminando una respuesta incorrecta
            const nuevasOpciones = opciones.filter((_, index) => opciones[index].name !== opcionesIncorrectas[indiceEliminar].name);
            setOpciones(nuevasOpciones);

            // Actualizar el contador de respuestas incorrectas restantes
            setRespuestasIncorrectas(respuestasIncorrectas - 1,);
        }
    };

    return (
        <div className="centrar-contenido2">
            <BackgroundSound />
            <h1>{nombreJugador}, ¿What is this animal?</h1>
            <p>Current round: {rondaActual}</p>
            <div className="imagen-y-botones">
                <img src={animalObjetivo.url} alt={animalObjetivo.name} className="animal-img" />
                <div className="botones-container">
                    {opciones.map((animal) => (
                        <button
                            key={animal.id}
                            onClick={() => verificarRespuesta(animal.id)}
                            disabled={!puedeHacerClic || opcionesDeshabilitadas}
                            className={`button-original ${esCorrecto !== null ? 'disabled' : ''}`}
                            onMouseEnter={(e) => e.target.classList.add('button-hovered')}
                            onMouseLeave={(e) => e.target.classList.remove('button-hovered')}
                        >
                            {animal.name}
                        </button>
                    ))}

                    <button
                        className='botEliminarRespuesta'
                        onClick={eliminarRespuestaIncorrecta}
                        disabled={respuestasIncorrectas == 0 || esCorrecto !== null}
                    >
                        wilcard :D
                    </button>
                </div>
            </div>

            {esCorrecto === true && <p>¡Correct!</p>}
            {esCorrecto === false && <p>¡Incorrect!</p>}
            <button className='botNext' onClick={siguienteRonda}>Next</button>
        </div>
    );
}

export default Juego;
