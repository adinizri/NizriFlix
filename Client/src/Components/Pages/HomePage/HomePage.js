import React, { useEffect, useState } from "react";
import Content from "./Geners/Content/Content";
import Carousel from "./Geners/Carousel";
import Styles from './HomePage.scss';


const HomePage = (props) => {
    const updateAppIsPlaying = () => {
        props.isPlaying();
    };
    return (
        <div className={ "HomePageDiv" }>

            <Carousel isPlaying={ updateAppIsPlaying } getData={ props.getData }></Carousel>
        </div>
    );
};
export default HomePage;