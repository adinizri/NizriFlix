import React, { useEffect, useState } from "react";
import Styles from './Content.css';
import images from 'G:/Movies&Series/Series/Friends/Friends-Img.png';

const Content = () => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content

    return (
        <img src={ images } className={ "ConentImage" }></img>
    );
};
export default Content;