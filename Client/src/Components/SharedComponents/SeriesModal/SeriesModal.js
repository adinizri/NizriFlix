import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styles from './SeriesModal.module.scss';
import './ModalBackgroud.scss';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import EpisodeSelection from './EpisodeSelction/EpisodeSelection';
const { Option } = Select;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



const SeriesModal = ({ handleClose, show, data }) => {
    const showHideClassName = show ? styles["modal display-block"] : styles["modal display-none"];
    const [seasons, setSeasons] = useState();
    const [image, setImage] = useState();
    const [seriesName, setSeriesName] = useState();
    const [selectedSeason, setSelectedSeason] = useState();


    useEffect(() => {
        setSeasons(data.seasons);
        setImage(data.image);
        setSeriesName(data.seriesName);
        setSelectedSeason(data.seasons[0]);


    }, [data]);

    function handleChange (value) {
        setSelectedSeason(seasons[value - 1]);//the location of the series in the array is the series number -1
    }
    return (
        seasons ?

            <>
                <Modal
                    isOpen={ show }

                    className={ styles.modal }
                    contentLabel="Example Modal"
                >

                    <button className={ styles.closeBtn } onClick={ handleClose }>X</button>
                    <div className={ styles.dataContainer }>
                        <div className={ styles.headerContainer }>
                            <h1 className={ styles.header }>{ seriesName }</h1>
                            <div className={ styles.seriesSelectionContainer }>
                                <Select defaultValue={ "Season 1" } style={ { width: 120 } } onChange={ handleChange }>
                                    { seasons.map((season) => <Option value={ season.seasonNumber }> Season { season.seasonNumber }</Option>) }
                                </Select>
                            </div>
                        </div>
                        <div>
                            { selectedSeason.episodes[0].map(episode => <EpisodeSelection data={ episode }></EpisodeSelection>) }
                        </div>


                    </div>
                </Modal>
            </>
            : null
        // </div >
    );
};

// const SeriesModal = () => {
//     const [isOpen, setIsOpen] = useState();

//     return (
//         <div>

//             <Modal>
//                 <div>Hi</div>
//             </Modal>
//         </div>
//     );


// };
export default SeriesModal;;;