import React from 'react';
import HomeSlider from "../sliders/HomeSlider";
import PopularItems from "./most-popular-items/PopularItems";
import WoodenFurniture from "./wooden-furniture/WoodenFurniture";
import Subscribe from "../subscribe/Subscribe";
import BlogList from "../blog/BlogList";
import InstagramSlider from "./instagram-slider/InstagramSlider";
import BlogListSliderHome from "./blog-list-slider-home/BlogListSliderHome";

function HomePage() {
    return (
        <>
            <HomeSlider/>
            <PopularItems/>
            <WoodenFurniture/>
            <Subscribe/>
            <BlogListSliderHome/>
            <InstagramSlider/>
        </>
    );
}
export default HomePage;