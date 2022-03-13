import React from 'react';


function HomeSlider() {
    return (
        <>
            <section className="hero__slider--section">
                <div className="hero__slider--inner hero__slider--activation swiper">
                    <div className="hero__slider--wrapper swiper-wrapper">
                        <div className="swiper-slide ">
                            <div className="hero__slider--items hero__slider--bg slider1">
                                <div className="container-fluid">
                                    <div className="hero__slider--items__inner">
                                        <div className="row row-cols-1">
                                            <div className="col">
                                                <div className="slider__content">
                                                    <p className="slider__content--desc desc1 text-white mb-15">Discover
                                                        our best furniture collection from home</p>
                                                    <h2 className="slider__content--maintitle text-white h1">Stylish
                                                        Furniture <br/> 
                                                            Bring Beauti</h2>
                                                    <p className="slider__content--desc text-white mb-35 d-sm-2-none">Great
                                                        furniture can bring beauty at your home, So buy our popular <br/>
                                                            and stylish furniture. Now you get up to 100 % discount now.
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
                        <div className="swiper-slide ">
                            <div className="hero__slider--items hero__slider--bg slider2">
                                <div className="container-fluid">
                                    <div className="hero__slider--items__inner">
                                        <div className="row">
                                            <div className="col-lg-6 offset-lg-6">
                                                <div className="slider__content text-center">
                                                    <p className="slider__content--desc desc1 right text-white mb-15">Discover
                                                        our best furniture collection from home</p>
                                                    <h2 className="slider__content--maintitle text-white h1">Stylish
                                                        Furniture <br/>
                                                            Bring Beauti</h2>
                                                    <p className="slider__content--desc text-white mb-35 d-sm-2-none">Great
                                                        furniture can bring beauty at your home, So buy our popular <br/>
                                                            and stylish furniture. Now you get up to 100 % discount now.
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
                        <div className="swiper-slide ">
                            <div className="hero__slider--items hero__slider--bg slider3">
                                <div className="container-fluid">
                                    <div className="hero__slider--items__inner">
                                        <div className="row row-cols-1">
                                            <div className="col">
                                                <div className="slider__content">
                                                    <p className="slider__content--desc desc1 text-white mb-15">Discover
                                                        our best furniture collection from home</p>
                                                    <h2 className="slider__content--maintitle text-white h1">Stylish
                                                        Furniture <br/>
                                                            Bring Beauti</h2>
                                                    <p className="slider__content--desc text-white mb-35 d-sm-2-none">Great
                                                        furniture can bring beauty at your home, So buy our popular <br/>
                                                            and stylish furniture. Now you get up to 100 % discount now.
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
                    </div>
                    <div className="swiper__nav--btn swiper-button-next"></div>
                    <div className="swiper__nav--btn swiper-button-prev"></div>
                </div>
            </section>
        </>
    );
}

export default HomeSlider;