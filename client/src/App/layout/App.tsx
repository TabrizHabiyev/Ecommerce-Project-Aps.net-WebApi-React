import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Route, Routes} from "react-router-dom";

import  '../../assets/css/plugins/swiper-bundle.min.css';
import  '../../assets/css/plugins/glightbox.min.css';
import '../../assets/css/style.css';

import HomePage from "../../features/home/HomePage";
import ShopPage from "../../features/shop/ShopPage";
import BlogPage from "../../features/blog/BlogPage";
import AboutUsPage from "../../features/aboutus/AboutUsPage";
import NotFound from "../../features/404/NotFound";
import Footer from "./Footer";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import {useAppDispatch} from "../../store/configureStore";
import {fetchCurrentUser} from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetail from "../../features/Products/ProductDetail";
import BasketPage from "../../features/basket/BasketPage";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import {setBasket} from "../../features/basket/basketSlice";
import CheckoutMainPage from "../../features/checkout/CheckoutMainPage";


function App() {
   const [loading,setLoading] = useState(true);
    const dispatch = useAppDispatch();

   useEffect(()=>{
       const buyerId = getCookie('buyerId');
       if (buyerId){
           agent.Basket.get()
               .then(basket => dispatch(setBasket(basket)))
               .catch(error => console.log(error))
               .finally(()=>setLoading(false))
       }else {
           setLoading(false)
       }
   },[dispatch])


    useEffect( ()=>{
        dispatch(fetchCurrentUser())
    },[dispatch])
    return (
         <>
             <header className="header__section header__transparent">
                <Header/>
                </header>
                <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/shop' element={<ShopPage/>}/>
                <Route path='/about' element={<AboutUsPage/>}/>
                <Route path='/blog' element={<BlogPage/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/products/detail/:id" element={<ProductDetail/>}/>
                <Route path="/login" element={<PrivateRoute><Login/></PrivateRoute>}/>
                <Route path="/register" element={<PrivateRoute><Register/></PrivateRoute>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/basket" element={<BasketPage/>}/>
                <Route path="/checkout" element={<CheckoutMainPage/>}/>
                </Routes>
                <Footer/>
                </>
    );
}

export default App;
