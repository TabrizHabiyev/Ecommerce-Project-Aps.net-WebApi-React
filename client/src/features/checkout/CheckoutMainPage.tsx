import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import CheckoutPage from "./CheckoutPage";

function CheckoutMainPage() {
    const {basket,status} = useAppSelector(state=>state.basket)
    const dispatch = useAppDispatch();
    const subtotal = basket?.items.reduce((sum,item)=>sum + (item.quantity * item.price),0) ?? 0;

    return (
        <div className="checkout__page--area section--padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-6">
                        <div className="main checkout__mian">
                          <CheckoutPage/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <aside className="checkout__sidebar sidebar border-radius-10">
                            <h2 className="checkout__order--summary__title text-center mb-15">Your Order Summary</h2>
                            <div className="cart__table checkout__product--table">
                                <table className="cart__table--inner">
                                    <tbody className="cart__table--body">
                                    {basket?.items.map((item)=>
                                    <tr className="cart__table--body__items">
                                        <td className="cart__table--body__list">
                                            <div className="product__image two  d-flex align-items-center">
                                                <div className="product__thumbnail border-radius-5">
                                                    <Link className="display-block" to={`/products/detail/${item.productId}`}>
                                                        <img className="display-block border-radius-5"
                                                         alt={item.name} src={item.pictureUrl}/>
                                                    </Link>
                                                    <span className="product__thumbnail--quantity">{item.quantity}</span>
                                                </div>
                                                <div className="product__description">
                                                    <h4 className="product__description--name">
                                                        <Link  to={`/products/detail/${item.productId}`}>
                                                            {item.name}
                                                        </Link>
                                                    </h4>
                                                    <span className="product__description--variant">COLOR: Blue</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cart__table--body__list">
                                            <span className="cart__price">${item.price}</span>
                                        </td>
                                    </tr>
                                     )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="checkout__discount--code">
                                    <label>
                                        <input className="checkout__discount--code__input--field border-radius-5"
                                               placeholder="Gift card or discount code" type="text"/>
                                    </label>
                                    <button className="checkout__discount--code__btn primary__btn border-radius-5"
                                            type="submit">Apply
                                    </button>
                            </div>
                            <div className="checkout__total">
                                <table className="checkout__total--table">
                                    <tbody className="checkout__total--body">
                                    <tr className="checkout__total--items">
                                        <td className="checkout__total--title text-left">Subtotal</td>
                                        <td className="checkout__total--amount text-right">${subtotal}</td>
                                    </tr>
                                    <tr className="checkout__total--items">
                                        <td className="checkout__total--title text-left">Shipping</td>
                                        <td className="checkout__total--calculated__text text-right">Calculated at next
                                            step
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="checkout__total--footer">
                                    <tr className="checkout__total--footer__items">
                                        <td className="checkout__total--footer__title checkout__total--footer__list text-left">Total</td>
                                        <td className="checkout__total--footer__amount checkout__total--footer__list text-right">$860.00</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CheckoutMainPage;