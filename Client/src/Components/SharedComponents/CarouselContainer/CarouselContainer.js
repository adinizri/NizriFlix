import React, { useEffect, useState } from "react";
import Content from "./Carousel/Content/Content";
import Carousel from "./Carousel/Carousel";
import Styles from './CarouselContainer.scss';


const HomePage = (props) => {

    return (
        <div className={ "HomePageDiv" }>

            <Carousel genres={ props.genres }></Carousel>
        </div>
    );
};
export default HomePage;