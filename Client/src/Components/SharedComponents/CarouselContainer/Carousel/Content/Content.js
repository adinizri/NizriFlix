import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import Styles from './Content.css';
import { playerContext } from '../../../../../App';
// import images from '../../../../../public/Movies&Series/Movies/all';


const Content = (props) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content
    const setPlaying = useContext(playerContext);

    useEffect(() => {
        setImage("data:image/jfif;base64," + props.image);
        setName(props.name);
        setLocation(props.location);

        // setLocation(props.location);
        // setName(props.name);

    }, [props]);

    // function toBase64 (arr) {
    //     //arr = new Uint8Array(arr) if it's an ArrayBuffer
    //     return btoa(
    //         arr.reduce((data, byte) => data + String.fromCharCode(byte), '')

    //     );
    //     console.log(arr);
    // }

    const HandleClick = () => {
        props.getData({ name: name, location: location });
        //props.isPlaying();
        setPlaying(true);


    };
    return (
        image ?
            <div className="container"><img src={ (image) } onClick={ () => HandleClick() } className={ "ConentImage" }></img><div className="nameDiv">{ name }</div> </div> : null
        // <img src={ process.env.PUBLIC_URL + location + '/' + image } className={ "ConentImage" }></img>
    );
};
export default Content;;;