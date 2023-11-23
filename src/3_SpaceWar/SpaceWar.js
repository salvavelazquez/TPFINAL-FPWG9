import Phaser from "phaser";
import Escena1 from "./components/Escena1.js";
import Escena2 from "./components/Escena2.js";
import GameOver from "./components/GameOver.js";
import Booyah from "./components/Booyah.js";
import Menu from "./components/Menu.js";
import { useEffect, useState } from "react";

function SpaceWar(){

    const Escenas =  [Menu,Escena1,Escena2,GameOver,Booyah];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);

    const[listo,setListo] = useState(false);
    
    useEffect(() => {

        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT, // Escala para ajustar el juego a la ventana
                autoCenter: Phaser.Scale.CENTER_BOTH // Centra automáticamente el juego en la ventana
            },
            physics:{
                default: 'arcade',
                arcade: {
                    gravity: {y:0},
                    debug: false
                }
            },
            scene:iniciarEscena()
        };
        //arranca el juego
        let game = new Phaser.Game(config)
        //trigger cuando el juego esta completamente listo
        game.events.on("LISTO",setListo)
        
        //si no se pone esto, se acumulan duplicados del lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        } 
    },[listo]);
    
}
export default SpaceWar;

