import React, { useEffect, useState } from "react";
import Styles from './Player.scss';
import ReactPlayer from 'react-player';


const Player = (props) => {
    //  const [data, setData] = useState();
    const [source, setSource] = useState("");

    useEffect(() => {
        const path = props.data.location + "/" + props.data.name + ".mp4"; //making the video relativ path
        fetch('/movies/movie/' + new URLSearchParams({
            location: path
        }), { method: 'GET' }).then(res => {
            //, { method: 'GET', body: JSON.stringify(path) }
            if (res.ok) {

                setSource('/movies/movie/' + new URLSearchParams({ location: path }));
            }
        }).then(jsonResponse => {



        });
    }, []);
    return (
        source != "" ?
            <ReactPlayer url={ source } width="60%" height="60%" controls={ true } /> : null
    );
};
export default Player;