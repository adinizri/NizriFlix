import React, { useEffect, useState } from "react";
import Styles from './Content.css';
// import images from '../../../../../public/Movies&Series/Movies/all';



const Content = (props) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content

    useEffect(() => {
        setImage(props.image);

        setLocation(props.location);
        setName(props.name);

    }, [props]);

    return (

        <img src={ process.env.PUBLIC_URL + location + '/' + image } className={ "ConentImage" }></img>
    );
};
export default Content;