import React from 'react';
import  cartPhoto from '../../assets/img/product/big-product1.webp';

function ProductCard() {
    return (
        <>
            <div className="col mb-30">
                <div className="product__items ">
                    <div className="product__items--thumbnail">
                        <a className="product__items--link" href="product-details.html">
                            <img className="product__items--img product__primary--img"
                                 src={cartPhoto} alt="product-img"/>
                                <img className="product__items--img product__secondary--img"
                                     src={cartPhoto} alt="product-img"/>
                        </a>
                        <div className="product__badge">
                            <span className="product__badge--items sale">New</span>
                        </div>
                        <ul className="product__items--action d-flex justify-content-center">
                            <li className="product__items--action__list">
                                <a className="product__items--action__btn" data-open="modal1" href="javascript:void(0)">
                                    <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg"
                                         width="20.51" height="19.443" viewBox="0 0 512 512">
                                        <path
                                            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                                            fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="32"/>
                                        <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor"
                                                stroke-miterlimit="10" stroke-width="32"/>
                                    </svg>
                                    <span className="visually-hidden">Quick View</span>
                                </a>
                            </li>
                            <li className="product__items--action__list">
                                <a className="product__items--action__btn" href="wishlist.html">
                                    <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg"
                                         width="17.51" height="15.443" viewBox="0 0 24.526 21.82">
                                        <path
                                            d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                                            transform="translate(0 0)" fill="currentColor"></path>
                                    </svg>
                                    <span className="visually-hidden">Wishlist</span>
                                </a>
                            </li>
                            <li className="product__items--action__list">
                                <a className="product__items--action__btn" href="compare.html">
                                    <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg"
                                         width="16.47" height="13.088" viewBox="0 0 15.47 11.088">
                                        <g transform="translate(0 -72.508)">
                                            <path data-name="Path 114"
                                                  d="M15.359,80.9l-2.011-2.011a.525.525,0,0,0-.374-.155H11.291a.287.287,0,0,0-.2.49l1.106,1.106H10.576L8.3,78.052l2.273-2.274h1.618l-1.106,1.106a.287.287,0,0,0,.2.49h1.683a.531.531,0,0,0,.374-.155l2.011-2.011a.38.38,0,0,0,0-.535l-.859-.859a.227.227,0,1,0-.32.321l.806.806L13.027,76.9a.075.075,0,0,1-.053.022H11.692l1.054-1.054a.317.317,0,0,0-.224-.542h-2.04a.227.227,0,0,0-.16.066l-2.34,2.34-.544-.544,2.519-2.519a.382.382,0,0,1,.272-.112h2.293a.317.317,0,0,0,.225-.542l-1.054-1.054h1.282a.076.076,0,0,1,.053.022l.4.4a.227.227,0,1,0,.32-.321l-.4-.4a.531.531,0,0,0-.374-.155H11.291a.287.287,0,0,0-.2.49L12.194,74.1H10.229a.832.832,0,0,0-.592.245L7.118,76.867,4.6,74.349a.832.832,0,0,0-.592-.245H.378A.378.378,0,0,0,0,74.481v.92a.378.378,0,0,0,.378.378H3.66l2.273,2.274L3.66,80.326H.378A.378.378,0,0,0,0,80.7v.92A.378.378,0,0,0,.378,82H4.007a.835.835,0,0,0,.592-.245l2.519-2.519.8.8a.227.227,0,1,0,.32-.32L3.914,75.392a.227.227,0,0,0-.16-.066H.453v-.769H4.007a.382.382,0,0,1,.272.113l6.043,6.043a.227.227,0,0,0,.16.066h2.04a.317.317,0,0,0,.224-.542l-1.054-1.054h1.282a.075.075,0,0,1,.053.022l1.958,1.958-1.958,1.958a.075.075,0,0,1-.053.022H11.692l1.054-1.054a.317.317,0,0,0-.224-.542H10.229a.383.383,0,0,1-.272-.113l-.968-.968a.227.227,0,0,0-.32.32l.968.968a.833.833,0,0,0,.592.245h1.965l-1.105,1.105a.287.287,0,0,0,.2.49h1.683a.525.525,0,0,0,.374-.155l2.011-2.011A.379.379,0,0,0,15.359,80.9Zm-11.08.539a.389.389,0,0,1-.272.113H.453v-.769h3.3a.226.226,0,0,0,.16-.066l2.34-2.34.543.544Z"
                                                  transform="translate(0 0)" fill="currentColor"/>
                                        </g>
                                    </svg>
                                    <span className="visually-hidden">Compare</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="product__items--content text-center">
                        <div className="product__items--color">
                            <ul className="product__items--color__wrapper d-flex justify-content-center">
                                <li className="product__items--color__list"><a
                                    className="product__items--color__link one" href="javascript:void(0)"><span
                                    className="visually-hidden">Color 1</span></a></li>
                                <li className="product__items--color__list"><a
                                    className="product__items--color__link two" href="javascript:void(0)"><span
                                    className="visually-hidden">Color 2</span></a></li>
                                <li className="product__items--color__list"><a
                                    className="product__items--color__link three" href="javascript:void(0)"><span
                                    className="visually-hidden">Color 3</span></a></li>
                                <li className="product__items--color__list"><a
                                    className="product__items--color__link four" href="javascript:void(0)"><span
                                    className="visually-hidden">Color 3</span></a></li>
                            </ul>
                        </div>
                        <h3 className="product__items--content__title h4"><a href="product-details.html">Fashion Plastic
                            Chair</a></h3>
                        <div className="product__items--price">
                            <span className="current__price">$150.00</span>
                            <span className="old__price">$200.00</span>
                        </div>
                        <a className="product__items--action__cart--btn primary__btn" href="cart.html">
                            <svg className="product__items--action__cart--btn__icon" xmlns="http://www.w3.org/2000/svg"
                                 width="13.897" height="14.565" viewBox="0 0 18.897 21.565">
                                <path
                                    d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
                                    transform="translate(-2.667 -1.366)" fill="currentColor"></path>
                            </svg>
                            <span className="add__to--cart__text"> Add to cart</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;