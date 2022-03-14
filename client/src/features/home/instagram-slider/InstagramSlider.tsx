import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {Container, Grid} from "@mui/material";
import { Navigation } from "swiper";
import BlogCart from "../../blog/BlogCart";
import InstagramSingle from "./InstagramSingle";

function InstagramSlider() {
    return (
        <>
            <Container  maxWidth="xl">
                <Grid  mt={10} mb={10}>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={6}
                        scrollbar={{ draggable: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Navigation]}
                        loop={true}
                    >
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                        <SwiperSlide><InstagramSingle/></SwiperSlide>
                    </Swiper>
                </Grid>
            </Container>
        </>
    );
}

export default InstagramSlider;