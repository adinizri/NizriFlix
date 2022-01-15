import React, { useEffect, useState } from "react";
import Styles from './Content.css';
// import images from '../../../../../public/Movies&Series/Movies/all';


const Content = (props) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content

    useEffect(() => {
        setImage("data:image/jfif;base64," + props.data);

        // setLocation(props.location);
        // setName(props.name);

    }, [props]);

    function toBase64 (arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')

        );
        console.log(arr);
    }
    return (
        image ?
            <img src={ (image) } className={ "ConentImage" }></img> : null
        // <img src={ process.env.PUBLIC_URL + location + '/' + image } className={ "ConentImage" }></img>
    );
};
export default Content;