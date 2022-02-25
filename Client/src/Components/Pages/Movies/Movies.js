import CarouselContainer from '../../SharedComponents/CarouselContainer/CarouselContainer';
import Player from '../../SharedComponents/Player/Player';
import { videoData } from '../../../Contexts/Contexts';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


const Movies = () => {


    // const [video, setVideo] = useState();
    const [genres, setGenres] = useState();

    useEffect(() => {
        fetch('/movies/GetMovies').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setGenres(jsonResponse);


        });
    }, []);



    return (
        (genres ?
            <videoData.Provider value={ { openModal: null, setData: null } }> <CarouselContainer genres={ genres } ></CarouselContainer></videoData.Provider>
            : null)
    );
};
export default Movies;
