import React, {useEffect, useState} from 'react';
import OrdersList from "./OrdersList";
import {Link} from "react-router-dom";
import agent from "../../App/api/agent";

function Profile() {
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
         agent.Order.list().then((data)=>{
             setOrders(data)
         })
        },[])


    return (
        <>
            <div className="my__account--section__inner border-radius-10 d-flex">
                <div className="account__left--sidebar">
                    <h3 className="account__content--title mb-20">My Profile</h3>
                    <ul className="account__menu">
                        <li className="account__menu--list active"><Link to="#">Dashboard</Link></li>
                        <li className="account__menu--list"><Link to="#">Addresses</Link></li>
                        <li className="account__menu--list"><Link to="#">Wishlist</Link></li>
                        <li className="account__menu--list"><Link to="#">Log Out</Link></li>
                    </ul>
                </div>
                <OrdersList orders={orders}/>
            </div>
        </>
    );
}

export default Profile;