import React, { useEffect, useState } from "react";
import Styles from './Player.scss';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from "react-router-dom";


const Player = (props) => {
    //  const [data, setData] = useState();
    const [source, setSource] = useState("");
    const location = useLocation();
    console.log(location);
    const { videolocation } = location.state.location;
    const { name } = location.state.name;


    useEffect(() => {
        if (location) {
            const path = location.state.location + "/" + location.state.name + ".mp4"; //making the video relativ path
            if (location.state.isMovie) {

                fetch('/movies/movie/' + new URLSearchParams({
                    location: path
                }), { method: 'GET' }).then(res => {
                    //, { method: 'GET', body: JSON.stringify(path) }
                    if (res.ok) {

                        setSource('/movies/movie/' + new URLSearchParams({ location: path }));
                    }
                }).then(jsonResponse => {



                });

            }
            else {

                fetch('/Series/episodes/' + new URLSearchParams({
                    location: path
                }), { method: 'GET' }).then(res => {
                    //, { method: 'GET', body: JSON.stringify(path) }
                    if (res.ok) {

                        setSource('/Series/episodes/' + new URLSearchParams({ location: path }));
                    }
                }).then(jsonResponse => {



                });
            }
        }
    }, []);
    return (
        source != "" ?
            //<video url={ source } ></video>
            <video src={ source } width="60%" height="60%" controls={ true } playIcon={ true } type="video/ogg" ></video>
            : null
    );
};
export default Player;