import React from 'react';
import HomeSlider from "../sliders/HomeSlider";
import PopularItems from "./most-popular-items/PopularItems";
import Subscribe from "../subscribe/Subscribe";
import InstagramSlider from "./instagram-slider/InstagramSlider";
import BlogListSliderHome from "./blog-list-slider-home/BlogListSliderHome";

function HomePage() {
    return (
        <>
            <HomeSlider/>
            <PopularItems/>
            <Subscribe/>
            <BlogListSliderHome/>
            <InstagramSlider/>
        </>
    );
}
export default HomePage;