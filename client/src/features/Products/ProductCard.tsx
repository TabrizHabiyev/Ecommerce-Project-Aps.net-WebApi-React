import React from 'react';
import  cartPhoto from '../../assets/img/product/big-product1.webp';
import {Link} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function ProductCard({product}:any) {
    return (
        <>
            <div className="col mb-30">
                <div className="product__items ">
                    <div className="product__items--thumbnail">
                        <Link className="product__items--link" to="product-details.html">
                            <img className="product__items--img product__primary--img"
                                 src={cartPhoto} alt="product-img"/>
                                <img className="product__items--img product__secondary--img"
                                     src={cartPhoto} alt="product-img"/>
                        </Link>
                        <div className="product__badge">
                            <span className="product__badge--items sale">New</span>
                        </div>
                        <ul className="product__items--action d-flex justify-content-center">
                            <li className="product__items--action__list">
                                <Link className="product__items--action__btn" data-open="modal1" to='ddddd'>
                                   <VisibilityIcon className="product__items--action__btn--svg"/>
                                    <span className="visually-hidden">Quick View</span>
                                </Link>
                            </li>
                            <li className="product__items--action__list">
                                <Link className="product__items--action__btn" to="wishlist.html">
                                    <svg  xmlns="http://www.w3.org/2000/svg"
                                         width="17.51" height="15.443" viewBox="0 0 24.526 21.82">
                                        <path
                                            d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                                            transform="translate(0 0)" fill="currentColor"></path>
                                    </svg>
                                    <span className="visually-hidden">Wishlist</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="product__items--content text-center">
                        <div className="product__items--color">
                            <ul className="product__items--color__wrapper d-flex justify-content-center">
                                <li className="product__items--color__list"><Link
                                    className="product__items--color__link one" to="javascript:void(0)"><span
                                    className="visually-hidden">Color 1</span></Link></li>
                                <li className="product__items--color__list"><Link
                                    className="product__items--color__link two" to="javascript:void(0)"><span
                                    className="visually-hidden">Color 2</span></Link></li>
                                <li className="product__items--color__list"><Link
                                    className="product__items--color__link three" to="javascript:void(0)"><span
                                    className="visually-hidden">Color 3</span></Link></li>
                                <li className="product__items--color__list"><Link
                                    className="product__items--color__link four" to="javascript:void(0)"><span
                                    className="visually-hidden">Color 3</span></Link></li>
                            </ul>
                        </div>
                        <h3 className="product__items--content__title h4">
                            <Link to="product-details.html">
                                {product?.name}
                            </Link>
                        </h3>
                        <div className="product__items--price">
                            <span className="current__price">{product?.price}</span>
                            <span className="old__price">$200.00</span>
                        </div>
                        <Link className="product__items--action__cart--btn primary__btn" to="cart.html">
                            <AddShoppingCartIcon className="product__items--action__cart--btn__icon"/>
                            <span className="add__to--cart__text"> Add to cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;