import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync} from "./basketSlice";


function BasketPage() {

   const {basket,status} = useAppSelector(state=>state.basket)
   const dispatch = useAppDispatch();
   const subtotal = basket?.items.reduce((sum,item)=>sum + (item.quantity * item.price),0) ?? 0;

   return (
        <section className="cart__section section--padding">
            <div className="container-fluid">
                <div className="cart__section--inner">
                        <h2 className="cart__title mb-40">Shopping Cart</h2>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="cart__table">
                                    <table className="cart__table--inner">
                                        <thead className="cart__table--header">
                                        <tr className="cart__table--header__items">
                                            <th className="cart__table--header__list">Product</th>
                                            <th className="cart__table--header__list">Price</th>
                                            <th className="cart__table--header__list">Quantity</th>
                                            <th className="cart__table--header__list">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody className="cart__table--body">
                                        {basket?.items.map((item)=>
                                            <tr className="cart__table--body__items">
                                                <td className="cart__table--body__list">
                                                    <div className="cart__product d-flex align-items-center">
                                                        <button onClick={()=>dispatch(removeBasketItemAsync({productId: item.productId,quantity:item.quantity}))} className="cart__remove--btn">
                                                         <ClearIcon/>
                                                        </button>
                                                        <div className="cart__thumbnail">
                                                            <Link to={`/products/detail/${item.productId}`}>
                                                             <img alt={item.name} src={item.pictureUrl}   style={{height:'100px',width:'100px'}}/>
                                                            </Link>
                                                        </div>
                                                        <div className="cart__content">
                                                            <h4 className="cart__content--title">
                                                                <Link  to={`/products/detail/${item.productId}`}>{item.name}</Link>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__table--body__list">
                                                    <span className="cart__price">${item.price}</span>
                                                </td>
                                                <td className="cart__table--body__list">
                                                    <div className="quantity__box">
                                                        <button
                                                            onClick={()=>dispatch(removeBasketItemAsync(
                                                                {productId: item.productId,quantity:1})
                                                            )}
                                                            className="quantity__value quickview__value--quantity decrease">
                                                            -
                                                        </button>
                                                        <label>
                                                            <input type="number" className="quantity__number quickview__value--number" value={item.quantity}/>
                                                        </label>
                                                        <button
                                                            onClick={()=>dispatch(addBasketItemAsync(
                                                                {productId:item.productId})
                                                            )}
                                                            className="quantity__value quickview__value--quantity increase">
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="cart__table--body__list">
                                                    <span className="cart__price end">${item.price * item.quantity}</span>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cart__summary border-radius-10">
                                    <div className="cart__summary--total mb-20">
                                        <table className="cart__summary--total__table">
                                            <tbody>
                                            <tr className="cart__summary--total__list">
                                                <td className="cart__summary--total__title text-left">SUBTOTAL</td>
                                                <td className="cart__summary--amount text-right">${subtotal}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart__summary--footer">
                                        <p className="cart__summary--footer__desc">Shipping & taxes calculated at checkout</p>
                                        <ul className="d-flex justify-content-between">
                                            <li><Link className="cart__summary--footer__btn primary__btn checkout" to='checkout'>Check Out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}
export default BasketPage;