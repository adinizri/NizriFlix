import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { useModel, createStore, Model } from 'react-model';
import Styles from './Content.css';
import { videoData } from '../../../../../Contexts/Contexts';
import ContentVideoModel from './ContentVideoModel/ContentVideoModel';
// import images from '../../../../../public/Movies&Series/Movies/all';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Player from '../../../Player/Player';

const Content = (props) => {
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content
    const [seasons, setSeasons] = useState();//location of the content
    const [isMiniModelOpen, setIsMiniModelOpen] = useState(false);
    const [isBigModelOpen, setIsBigModelOpen] = useState(false);
    const [video, setVideo] = useState();
    const { setPlaying } = useContext(videoData);

    useEffect(() => {
        setImage("data:image/jfif;base64," + props.data.image);
        props.data.name ? setName(props.data.name) : setName(props.data.seriesName);
        props.data.seasons ? setSeasons(props.data.seasons) : setLocation(props.data.location);



    }, [props]);

    const OpenMiniModel = () => {
        setIsMiniModelOpen(true);
    };
    // function toBase64 (arr) {
    //     //arr = new Uint8Array(arr) if it's an ArrayBuffer
    //     return btoa(
    //         arr.reduce((data, byte) => data + String.fromCharCode(byte), '')

    //     );
    //     console.log(arr);
    // }

    const HandleClick = () => {


        setVideo({ name: name, location: location });
        if (location) {
            // replace space in name for url name
            navigate("/Player/" + name.replaceAll(" ", "%20"), {
                state: {
                    name: name, location: location, isMovie: true
                }
            });
        }
        else {
            navigate("/Player/" + name.replaceAll(" ", "%20"), {
                state: {
                    name: seasons[0]['episodes'][0][1]['episodeName'], location: seasons[0]['episodes'][0][1]['location'], isMovie: false
                }
            });
        };


    };
    return (
        image ?

            <div className="container"
            // onMouseOver={ () => setIsMiniModelOpen(true) } onMouseOut={ () => setIsMiniModelOpen(false) }
            >
                {/* { isMiniModelOpen ? <ContentVideoModel data={ props.data }></ContentVideoModel> :*/ }
                <div className='contentWarrper'><img src={ (image) } onClick={ () => HandleClick() } className={ "ConentImage" }></img>   <div className="nameDiv">{ name }</div>
                </div>
            </div>

            : null
        // <img src={ process.env.PUBLIC_URL + location + '/' + image } className={ "ConentImage" }></img>
    );
};
export default Content;

