import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import { Keyboard, Pagination, Navigation } from "swiper";
import  img1 from  '../../assets/img/slider/home1-slider1.webp';
import  img2 from  '../../assets/img/slider/home1-slider2.webp';
import  img3 from  '../../assets/img/slider/home1-slider3.webp';

const loop =[1,2,3,4,5]

const slider=[
    {
        title:'Slider 1 Title loremipsum',
        description:'Great furniture can bring beauty at your home, So buy our popular',
        imageUrl:`${img1}`
    },
    {
        title:'Slider 2 Title loremipsum',
        description:'Great furniture can bring beauty at your home, So buy our popular',
        imageUrl:`${img2}`
    },
    {
        title:'Slider 3 Title loremipsum',
        description:'Great furniture can bring beauty at your home, So buy our popular',
        imageUrl:`${img3}`
    }
]

function HomeSlider() {
    return (
        <>
            <Swiper
                loop={true}
                className="mySwiper"
                slidesPerView={1}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
               >
                {slider.map(({title,description,imageUrl})=>(
                    <SwiperSlide key={title}>
                        <div className="swiper-slide ">
                            <div className="hero__slider--items slider1"  style={{
                                backgroundImage: `url(${imageUrl})`
                            }}>
                                <div className="container-fluid">
                                    <div className="hero__slider--items__inner">
                                        <div className="row row-cols-1">
                                            <div className="col">
                                                <div className="slider__content">
                                                    <h2 className="slider__content--maintitle text-white h1">
                                                        {title}
                                                    </h2>
                                                    <p className="slider__content--desc text-white mb-35 d-sm-2-none">
                                                        {description}
                                                    </p>
                                                    <a className="slider__content--btn primary__btn" href="shop.html">Start
                                                        to Buying</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper__nav--btn swiper-button-next"></div>
                <div className="swiper__nav--btn swiper-button-prev"></div>
            </Swiper>
        </>
    );
}
export default HomeSlider;