import React, { useEffect, useState } from "react";
import Styles from './Content.css';
// import images from '../../../../../public/Movies&Series/Movies/all';



const Content = (props) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content

    useEffect(() => {
        setImage(props.data);

        // setLocation(props.location);
        // setName(props.name);

    }, [props]);

    return (
        image ?
            <img src={ image.data } className={ "ConentImage" }></img> : null
        // <img src={ process.env.PUBLIC_URL + location + '/' + image } className={ "ConentImage" }></img>
    );
};
export default Content;