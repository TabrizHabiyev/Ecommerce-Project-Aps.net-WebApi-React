import React from 'react';
import BlogList from "./BlogList";
import Subscribe from "../subscribe/Subscribe";

function HomePage() {
    return (
        <>
            <section className="blog__section section--padding">
                <div className="container">
                    <div className="section__heading text-center mb-40">
                        <h2 className="section__heading--maintitle">Latest Post From Blog</h2>
                    </div>
                    <div className="blog__section--inner p-0">
                        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb--n30">
                         <BlogList/>
                        </div>
                        <div className="pagination__area bg__gray--color">
                            <nav className="pagination">
                                <ul className="pagination__wrapper d-flex align-items-center justify-content-center">
                                    <li className="pagination__list"><a href="blog.html"
                                                                        className="pagination__item--arrow  link ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443"
                                             viewBox="0 0 512 512">
                                            <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="48"
                                                  d="M244 400L100 256l144-144M120 256h292"></path>
                                        </svg>
                                    </a>
                                    </li>
                                    <li>
                                    </li>
                                    <li className="pagination__list"><span
                                        className="pagination__item pagination__item--current">1</span></li>
                                    <li className="pagination__list"><a href="blog.html"
                                                                        className="pagination__item link">2</a></li>
                                    <li className="pagination__list"><a href="blog.html"
                                                                        className="pagination__item link">3</a></li>
                                    <li className="pagination__list"><a href="blog.html"
                                                                        className="pagination__item link">4</a></li>
                                    <li className="pagination__list"><a href="blog.html"
                                                                        className="pagination__item--arrow  link ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443"
                                             viewBox="0 0 512 512">
                                            <path fill="none" stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="48"
                                                  d="M268 112l144 144-144 144M392 256H100"></path>
                                        </svg>
                                    </a>
                                    </li>
                                    <li>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <Subscribe/>
        </>
    );
}

export default HomePage;