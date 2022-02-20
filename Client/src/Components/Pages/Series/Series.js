import CarouselContainer from '../../SharedComponents/CarouselContainer/CarouselContainer';
import Player from '../../SharedComponents/Player/Player';
import { videoData } from '../../../Contexts/Contexts';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
const Series = () => {
    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState();
    const [genres, setGenres] = useState();
    useEffect(() => {
        fetch('/Series/GetSeries').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setGenres(jsonResponse);


        });
    }, []);


    return (
        (genres ?
            <videoData.Provider value={ { setPlaying: setPlaying } }><CarouselContainer genres={ genres } ></CarouselContainer> </videoData.Provider>
            : null)
    );
};
export default Series;
