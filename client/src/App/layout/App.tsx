import React from 'react';
import Header from "./Header";
import {Route,Routes} from "react-router-dom";

import  '../../assets/css/plugins/swiper-bundle.min.css';
import  '../../assets/css/plugins/glightbox.min.css';
import '../../assets/css/style.css';

import HomePage from "../../features/home/HomePage";
import ShopPage from "../../features/shop/ShopPage";
import BlogPage from "../../features/blog/BlogPage";
import AboutUsPage from "../../features/aboutus/AboutUsPage";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../../features/404/NotFound";
import Footer from "./Footer";

function App() {
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
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path="*" element={<NotFound/>}/>
                {/*<Route path='/login' element={HomePage}/>*/}
                {/*<Route path='/register' element={HomePage}/>*/}
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
