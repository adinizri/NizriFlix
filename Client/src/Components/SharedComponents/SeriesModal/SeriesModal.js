import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import App from '../../../App';
import './SeriesModal.scss';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



const SeriesModal = ({ handleClose, show, data }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [seasons, setSeasons] = useState();
    const [image, setImage] = useState();
    const [seriesName, setSeriesName] = useState();

    useEffect(() => {
        setSeasons(data.seasons);
        setImage(data.image);
        setSeriesName(data.seriesName);

    }, [data]);

    return (
        <div className={ showHideClassName }>

            <Modal
                isOpen={ show }
                // onAfterOpen={ afterOpenModal }
                // onRequestClose={ handleClose }
                //  style={ customStyles }
                className={ "modal" }
                contentLabel="Example Modal"
            >

                <button className='close-btn' onClick={ handleClose }>X</button>
                <img src={ image } ></img>
                <h1>seriesName</h1>


            </Modal>

        </div>
    );
};

// const SeriesModal = () => {
//     const [isOpen, setIsOpen] = useState();

//     return (
//         <div>

//             <Modal>
//                 <div>Hi</div>
//             </Modal>
//         </div>
//     );


// };
export default SeriesModal; 