import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styles from './EpisodeSelection.module.scss';
import { ReactComponent as PlaySvg } from '../../../../SVG/PlaySvg.svg';

const EpisodeSelection = (props) => {
    const [episodeName, setEpisodeName] = useState();
    const [episodeNumber, setEpisodeNumber] = useState();
    const [episodeTitle, setEpisodeTitle] = useState();
    const [location, setLocation] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        setEpisodeName(props.data.episodeName);
        setEpisodeNumber(props.data.episode);
        setEpisodeTitle(props.data.episodeTitle);
        setLocation(props.data.location);
    });

    const handleClick = () => {

        navigate("/Player/" + episodeName.replaceAll(" ", "%20"), {
            state: {
                name: episodeName, location: location, isMovie: false
            }
        });
    };

    return (
        episodeTitle && episodeNumber ?
            <div className={ styles.containerDiv }>
                <span className={ styles.textColorAndSize }>{ episodeNumber }</span>
                <button className={ styles.playIcon } onClick={ handleClick }><PlaySvg></PlaySvg></button>
                <span className={ styles.textColorAndSize }>{ episodeTitle }</span>
            </div> : null
    );

};
export default EpisodeSelection;