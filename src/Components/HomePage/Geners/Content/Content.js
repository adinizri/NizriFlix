import React, { useEffect, useState } from "react";
import Styles from './Content.css';
import images from '../../../../Images/Friends-Img.png';

const Content = () => {
    return (
        <img src={ images } className={ Styles.ConentImage }></img>
    );
};
export default Content;