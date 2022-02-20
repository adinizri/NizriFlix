import React, { useEffect, useState } from "react";
import Styles from './Carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Content from "./Content/Content";
import 'swiper/scss';

import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
const Carousel = (props) => {
    const [data, setData] = useState(props.genres);

    // useEffect(() => {
    //     fetch('/movies/GetMovies').then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(jsonResponse => {
    //         setData(jsonResponse);


    //     });
    // }, []);


    return (
        data ?
            (data.map((videoGenre) => (
                <div className={ "CarouselDiv" }>
                    <h1 className="genreTitle">{ videoGenre.genre }</h1>
                    <Swiper

                        // install Swiper modules
                        modules={ [Navigation, Pagination, Scrollbar, A11y] }
                        spaceBetween={ 50 }
                        slidesPerView={ 5 }
                        autoHeight={ true }
                        // zoom={ { maxRatio: 5 } }
                        navigation={ { allowTouchMove: true } }
                        grabCursor={ true }
                        pagination={ { clickable: true } }
                        scrollbar={ { draggable: true } }
                        onSwiper={ (swiper) => console.log(swiper) }
                        onSlideChange={ () => console.log('slide change') }
                        observer={ true }
                        observeParents={ true }
                    >

                        { videoGenre.List.map(obj => <SwiperSlide >
                            <Content data={ obj }></Content>
                        </SwiperSlide>) }





                    </Swiper>
                </div >)
            ))
            : null
    );


};
export default Carousel;