import {
    Grid ,
    Typography ,
    Divider ,
    TableContainer,
    Table,TableBody,
    TableRow,
    TableCell,
    TextField,
    Button
   } from '@mui/material';
import React, {useEffect, useState} from 'react';
import './productDetail.css'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperClass,{Navigation,Thumbs} from "swiper";

function ProductDetail() {
    const [activeThump,setActiveThumb] = useState<SwiperClass>()
    return (
        <div className="productDetailContainer">
            <Grid container spacing={6}>
                <Grid item xs={6}>
                <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation,Thumbs]}
                thumbs={{swiper: activeThump}}
                grabCursor={true}
                className="product--image-slider"
                >
               <SwiperSlide key='1234'>
                      <img alt='product name' src='https://res.cloudinary.com/dj3wmuy3l/image/upload/v1648040227/d9wxt9xfuqqz9zxkwpme.jpg'/>
               </SwiperSlide>
                <SwiperSlide  key='12345'>
                    <img alt='product name' src='https://cdn.corporatefinanceinstitute.com/assets/products-and-services.jpeg'/>
                </SwiperSlide>
                <SwiperSlide  key='123456'>
                    <img alt='product name' src='https://i0.wp.com/epthinktank.eu/wp-content/uploads/2021/09/EPRS-Briefing-698028-General-product-safety-regulation-FINAL.png?fit=1000%2C666&ssl=1'/>
                </SwiperSlide>

                </Swiper>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        onSwiper={setActiveThumb}
                        slidesPerView={4}
                        modules={[Navigation,Thumbs]}
                        className="product--image-slider-thumbs"
                    >
                        <SwiperSlide key='1234'>
                            <div className="product--image-slider-thumbs-wrapper">
                            <img alt='product name' src='https://res.cloudinary.com/dj3wmuy3l/image/upload/v1648040227/d9wxt9xfuqqz9zxkwpme.jpg'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide  key='12345'>
                            <div className="product--image-slider-thumbs-wrapper">
                            <img alt='product name' src='https://cdn.corporatefinanceinstitute.com/assets/products-and-services.jpeg'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide  key='123456'>
                            <div className="product--image-slider-thumbs-wrapper">
                            <img alt='product name' src='https://i0.wp.com/epthinktank.eu/wp-content/uploads/2021/09/EPRS-Briefing-698028-General-product-safety-regulation-FINAL.png?fit=1000%2C666&ssl=1'/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Grid>
                <Grid item xs={6}>
                    <div className="product__details--info">
                        <form action="#">
                            <h2 className="product__details--info__title mb-15">Fashion Plastic Chair</h2>
                            <div className="product__details--info__price mb-10">
                                <span className="current__price">$299.00</span>
                                <span className="old__price">$320.00</span>
                            </div>
                            <p className="product__details--info__desc mb-20">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aut numquam ullam is recusandae laborum explicabo id sequi quisquam,
                                ab sunt deleniti quidem ea animi facilis quod nostrum odit! Repellendus voluptas
                                suscipit.</p>
                            <div className="product__variant">
                                <div className="product__variant--list mb-20">
                                    <fieldset className="variant__input--fieldset">
                                        <legend className="product__variant--title mb-8">Color :</legend>
                                        <div className="variant__color d-flex">
                                            <div className="variant__color--list">
                                                color 1
                                            </div>
                                            <div className="variant__color--list">
                                              color 2
                                            </div>
                                            <div className="variant__color--list">
                                                color 3
                                            </div>
                                            <div className="variant__color--list">
                                                color 4
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="product__variant--list quantity d-flex align-items-center mb-20">
                                    <div className="quantity__box">
                                        <button type="button"
                                                className="quantity__value quickview__value--quantity decrease"
                                                aria-label="quantity value" value="Decrease Value">-
                                        </button>
                                        <label>
                                            <input type="number" className="quantity__number quickview__value--number"
                                                   value="1"/>
                                        </label>
                                        <button type="button"
                                                className="quantity__value quickview__value--quantity increase"
                                                aria-label="quantity value" value="Increase Value">+
                                        </button>
                                    </div>
                                    <button className="quickview__cart--btn primary__btn" type="submit">Add To Cart
                                    </button>
                                </div>
                                <div className="product__variant--list mb-15">
                                    <a className="variant__wishlist--icon mb-15" href="wishlist.html"
                                       title="Add to wishlist">
                                        <svg className="quickview__variant--wishlist__svg"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path
                                                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                                fill="none" stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="32"/>
                                        </svg>
                                        Add to Wishlist
                                    </a>
                                    <button className="variant__buy--now__btn primary__btn" type="submit">Buy it now
                                    </button>
                                </div>
                                <div className="product__variant--list mb-15">
                                    <div className="product__details--info__meta">
                                        <p className="product__details--info__meta--list"><strong>Type:</strong>
                                            <span>Sofa</span></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <div className='product__details--tab__section section--padding'></div>
            <div id="reviews">
                <div className="product__reviews">
                    <div className="product__reviews--header">
                        <h3 className="product__reviews--header__title mb-20">Customer Reviews</h3>
                        <div className="reviews__ratting d-flex align-items-center">
                            <span className="reviews__summary--caption">Based on 2 reviews</span>
                        </div>
                        <a className="actions__newreviews--btn primary__btn" href="#writereview">Write A Review</a>
                    </div>
                    <div className="reviews__comment--area">
                        <div className="reviews__comment--list d-flex">
                            <div className="reviews__comment--thumbnail">
                                <img src="assets/img/other/comment-thumb1.webp" alt="comment-thumbnail"/>
                            </div>
                            <div className="reviews__comment--content">
                                <h4 className="reviews__comment--content__title">Richard Smith</h4>
                                <p className="reviews__comment--content__desc">Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Eos ex repellat officiis neque. Veniam, rem nesciunt. Assumenda
                                    distinctio, autem error repellat eveniet ratione dolor facilis accusantium amet
                                    pariatur, non eius!</p>
                                <span className="reviews__comment--content__date">January 11, 2022</span>
                            </div>
                        </div>

                        <div className="reviews__comment--list d-flex">
                            <div className="reviews__comment--thumbnail">
                                <img src="assets/img/other/comment-thumb3.webp" alt="comment-thumbnail"/>
                            </div>
                            <div className="reviews__comment--content">
                                <h4 className="reviews__comment--content__title">Richard Smith</h4>
                                <p className="reviews__comment--content__desc">Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Eos ex repellat officiis neque. Veniam, rem nesciunt. Assumenda
                                    distinctio, autem error repellat eveniet ratione dolor facilis accusantium amet
                                    pariatur, non eius!</p>
                                <span className="reviews__comment--content__date">January 11, 2022</span>
                            </div>
                        </div>
                    </div>
                    <div id="writereview" className="reviews__comment--reply__area">
                        <form action="#">
                            <h3 className="reviews__comment--reply__title mb-15">Add a review </h3>
                            <div className="row">
                                <div className="col-12 mb-10">
                                    <textarea className="reviews__comment--reply__textarea"
                                              placeholder="Your Comments...."></textarea>
                                </div>
                            </div>
                            <button className="text-white primary__btn" data-hover="Submit" type="submit">SUBMIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;