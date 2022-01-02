import React, { useEffect, useState } from "react";
import Styles from './Carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Content from "./Content/Content";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Carousel = () => {
    return (
        <div className={ "CarouselDiv" }>
            <Swiper
                // install Swiper modules
                modules={ [Navigation, Pagination, Scrollbar, A11y] }
                spaceBetween={ 50 }
                slidesPerView={ 3 }
                navigation={ { allowTouchMove: true } }

                pagination={ { clickable: true } }
                scrollbar={ { draggable: true } }
                onSwiper={ (swiper) => console.log(swiper) }
                onSlideChange={ () => console.log('slide change') }
            >
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                <SwiperSlide><Content></Content></SwiperSlide>
                ...
            </Swiper>
        </div>
    );
};
export default Carousel;