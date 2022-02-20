import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import Styles from '../ContentVideoModel/ContentVideoModel.scss';
import { videoData } from '../../../../../../Contexts/Contexts';

const ContentVideoModel = (props) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();//location of the content
    const [seasons, setSeasons] = useState();//location of the content
    const [isMiniModelOpen, setIsMiniModelOpen] = useState(false);
    const [isBigModelOpen, setIsBigModelOpen] = useState(false);
    console.log(videoData);
    const { setPlaying, setVideo } = useContext(videoData);

    useEffect(() => {
        setImage("data:image/jfif;base64," + props.data.image);
        props.data.name ? setName(props.name) : setName(props.data.seriesName);//if movie get name if series get series name
        props.data.seasons ? setSeasons(props.data.seasons) : setLocation(props.location);//if series get seasons if Movie get movie location
    }, [props]);
    return (
        <div className={ "ContentVideoModelContainer" } >
            <img src={ (image) } className={ "ConentImage" }></img><div className="nameDiv">{ name }</div>
            {/* <button className='modelButton'>+
            </button> */}
        </div>
    );



};
export default ContentVideoModel;