import React, { useEffect, useState } from "react";
import Content from "./Geners/Content/Content";
import Carousel from "./Geners/Carousel";
import Styles from './HomePage.scss';


const HomePage = () => {
    return (
        <div className={ "HomePageDiv" }>

            <Carousel></Carousel>
        </div>
    );
};
export default HomePage;