import React, {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutPage from "./CheckoutPage";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch} from "../../store/configureStore";
import agent from "../../App/api/agent";
import {setBasket} from "../basket/basketSlice";

const stripePromise = loadStripe("pk_test_51KrxxnCWKSyjFzWRZndE7s5DuTdJvmIAoxS0XLjopStdRuMVUssO12N065S4I0U8xrHds8lnPLNYRDWfF7q1z5yB00SxF1IPtc");


export default  function CheckoutWraper(props) {

    const dispatch = useAppDispatch();
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        agent.Payments.createPayment()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    },[dispatch]);


    if(loading) return <h1>Loading....</h1>

    return (
        <Elements stripe={stripePromise}>
           <CheckoutPage/>
        </Elements>
    );
}