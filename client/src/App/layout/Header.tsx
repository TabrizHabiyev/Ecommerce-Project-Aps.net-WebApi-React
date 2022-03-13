import React from 'react';
import logo from  '../../assets/img/logo/nav-log.webp';
import {Link} from 'react-router-dom';

const Links=[
    {title:'Home', path:'/'},
    {title:'Shop', path:'/shop'},
    {title:'About US', path:'/about'},
    {title:'Blog', path:'/blog'},
    {title:'Contact', path:'/contact'},
    {title:'Login', path:'/login'},
    {title:'Register', path:'/register'}
]


export default function Header() {
    return (
      <React.Fragment>
          <div className="main__header header__sticky">
              <div className="container-fluid">
                  <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
                      <div className="offcanvas__header--menu__open ">
                          <a className="offcanvas__header--menu__open--btn" href="javascript:void(0)">
                              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"/></svg>
                              <span className="visually-hidden">Offcanvas Menu Open</span>
                          </a>
                      </div>
                      <div className="main__logo">
                          <h1 className="main__logo--title"><a className="main__logo--link" href="index.html"><img className="main__logo--img" src={logo} alt="logo-img"/></a></h1>
                      </div>
                      <div className="header__menu d-none d-lg-block">
                          <nav className="header__menu--navigation">
                              <ul className="d-flex">
                                  {Links.map(({title,path})=>(
                                      <li className="header__menu--items" key={title}>
                                          <Link className="header__menu--link" to={path}>{title}</Link>
                                      </li>
                                  ))}
                              </ul>
                          </nav>
                      </div>
                      <div className="header__account">
                          <ul className="d-flex">
                              <li className="header__account--items  header__account--search__items d-md-none">
                                  <a className="header__account--btn search__open--btn" href="javascript:void(0)">
                                      <svg className="header__search--button__svg" xmlns="http://www.w3.org/2000/svg" width="26.51" height="23.443" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor"strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></svg>
                                      <span className="visually-hidden">Search</span>
                                  </a>
                              </li>
                              <li className="header__account--items">
                                  <a className="header__account--btn" href="my-account.html">
                                      <svg xmlns="http://www.w3.org/2000/svg"  width="26.51" height="23.443" viewBox="0 0 512 512"><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"strokeWidth="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" strokeMiterlimit="10"strokeWidth="32"/></svg>
                                      <span className="visually-hidden">My Account</span>
                                  </a>
                              </li>
                              <li className="header__account--items d-md-none">
                                  <a className="header__account--btn" href="wishlist.html">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24.526" height="21.82" viewBox="0 0 24.526 21.82">
                                          <path  d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0" transform="translate(0 0)" fill="currentColor"/>
                                      </svg>

                                      <span className="items__count wishlist">02</span>
                                  </a>
                              </li>
                              <li className="header__account--items">
                                  <a className="header__account--btn minicart__open--btn" href="javascript:void(0)">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18.897" height="21.565" viewBox="0 0 18.897 21.565">
                                          <path  d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z" transform="translate(-2.667 -1.366)" fill="currentColor"/>
                                      </svg>
                                      <span className="items__count">02</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </React.Fragment>
    );
}

