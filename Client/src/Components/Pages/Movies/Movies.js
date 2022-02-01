import CarouselContainer from '../../SharedComponents/CarouselContainer/CarouselContainer';
import Player from '../../SharedComponents/Player/Player';
import { videoData } from '../../../Contexts/Contexts';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
const Movies = () => {
    const [playing, setPlaying] = useState(false);
    const [data, setData] = useState();
    return (
        <>
            { playing ? <Player data={ data }></Player > :
                <videoData.Provider value={ { setPlaying: setPlaying, setData: setData } }><CarouselContainer ></CarouselContainer> </videoData.Provider> }
        </>


    );
};
export default Movies;
