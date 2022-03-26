import React, {useEffect} from 'react';
import Header from "./Header";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";

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
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {fetchCurrentUser} from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import ContactPage from "../../features/contact/ContactPage";
import {element} from "prop-types";
import AdminApp from "../../Admin/AdminApp";


function App() {
    const location = useLocation();
   const dispatch = useAppDispatch();
    useEffect( ()=>{
        dispatch(fetchCurrentUser())
    },[dispatch])
    return (
            location.pathname == '/admin' ?
                <AdminApp/>
                :<><header className="header__section header__transparent">
                    <Header/>
                </header>
                <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/shop' element={<ShopPage/>}/>
                <Route path='/about' element={<AboutUsPage/>}/>
                <Route path='/blog' element={<BlogPage/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/login" element={<PrivateRoute><Login/></PrivateRoute>}/>
                <Route path="/register" element={<PrivateRoute><Register/></PrivateRoute>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                </Routes>
                <Footer/>
                </>
    );
}

export default App;
