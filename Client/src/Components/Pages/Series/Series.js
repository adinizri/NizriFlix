import CarouselContainer from '../../SharedComponents/CarouselContainer/CarouselContainer';
import Player from '../../SharedComponents/Player/Player';
import { videoData } from '../../../Contexts/Contexts';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import SeriesModal from '../../SharedComponents/SeriesModal/SeriesModal';
const Series = () => {

    const [genres, setGenres] = useState();
    const [modalData, setmodalData] = useState();
    const [isModalOpen, setIsModalOpen] = useState();

    const setData = (data) => {
        setmodalData(data);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
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
            <>
                <videoData.Provider value={ { openModal, setData } }><CarouselContainer genres={ genres } ></CarouselContainer> </videoData.Provider>
                { isModalOpen ? <SeriesModal show={ isModalOpen } handleClose={ closeModal } data={ modalData } ></SeriesModal> : null }
            </>
            : null)
    );
};
export default Series;
