import React, { useEffect, useState } from "react";
import Styles from './Content.css';
import images from 'G:/Movies&Series/Series/How I Met Your Mother (2005) Season 1-9 S01-S09 (1080p MIXED x265 HEVC 10bit AAC 5.1 Silence)/How_I_Met_Your_Mother_IMG.jpg';

const Content = () => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content

    return (
        <img src={ images } className={ "ConentImage" }></img>
    );
};
export default Content;