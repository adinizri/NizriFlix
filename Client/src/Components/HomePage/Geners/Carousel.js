import React, { useEffect, useState } from "react";
import Styles from './Carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Content from "./Content/Content";
import 'swiper/scss';

import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
const Carousel = () => {
    const [data, setData] = useState();
    const [renderData, setRenderData] = useState(3);
    useEffect(() => {
        fetch('/movies/moviesData').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setData(jsonResponse);


        });
    }, []);
    useEffect(() => {

    }, []);



    return (
        data ?
            <div className={ "CarouselDiv" }>
                <p className="Title">Watch Again</p>
                <Swiper
                    // install Swiper modules
                    modules={ [Navigation, Pagination, Scrollbar, A11y] }
                    spaceBetween={ 50 }
                    slidesPerView={ 5 }

                    navigation={ { allowTouchMove: true } }

                    pagination={ { clickable: true } }
                    scrollbar={ { draggable: true } }
                    onSwiper={ (swiper) => console.log(swiper) }
                    onSlideChange={ () => console.log('slide change') }
                >



                    { data.map(obj => <SwiperSlide><Content image={ obj.image } location={ obj.location } name={ obj.name }></Content></SwiperSlide>
                        // name={ obj.name } image={ obj.image } location={ obj.location 
                    ) }





                </Swiper>
            </div> : null
    );
};
export default Carousel;