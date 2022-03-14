import React from 'react';
import BlogCart from "../../blog/BlogCart";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {Container, Grid} from "@mui/material";
import { Navigation } from "swiper";


function BlogListSliderHome() {
    return (
        <>
            <Container  maxWidth="xl">
                <Grid>
                    <Swiper
                        spaceBetween={40}
                        slidesPerView={3}
                        scrollbar={{ draggable: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Navigation]}
                        loop={true}
                    >
                        <div className="swiper-slide">
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        <SwiperSlide><BlogCart/></SwiperSlide>
                        </div>
                    </Swiper>
                </Grid>
            </Container>
        </>
    );
}

export default BlogListSliderHome;