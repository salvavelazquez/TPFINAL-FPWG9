import React, { useEffect } from 'react';
import backgroundSoundFile from './kawaiisong.mp3';

const BackgroundSound = () => {
    useEffect(() => {
        const audio = new Audio(backgroundSoundFile);
        audio.loop = true;
        audio.play();

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return null; // o puedes devolver un div u otro componente si es necesario
};

export default BackgroundSound;
