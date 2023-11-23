import Phaser from "phaser";
import Menu from "./components/menu.js";
import Escena1 from "./components/Escena1.js";
import Escena2 from "./components/Escena2.js";
import Escena3 from "./components/Escena3.js";
import GameO from "./components/GameO.js";
import winner from "./components/winner.js";
import { useEffect, useState } from "react";


function Dude (){

    const Escenas =  [Menu,Escena1,Escena2,Escena3,GameO,winner];
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
                    gravity: {y:300},
                    debug: false
                }
            },
            scene:iniciarEscena()
        };
        let game = new Phaser.Game(config);

        game.events.on("LISTO",setListo)
        
        //si no se pone esto, se acumulan duplicados del lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        } 
    },[listo]);
}
export default Dude;






