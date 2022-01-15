import React, { useEffect, useState } from "react";
import Styles from './Player.scss';
import ReactPlayer from 'react-player';


const Player = () => {
    const [data, setData] = useState();
    const [source, setSource] = useState("");

    useEffect(() => {
        const path = 'G:/Movies&Series/Movies/all/Aladdin/Aladdin 1992 .mp4';
        fetch('/movies/movie/' + new URLSearchParams({
            location: path
        }), { method: 'GET' }).then(res => {
            //, { method: 'GET', body: JSON.stringify(path) }
            if (res.ok) {
                setData("Exists");
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