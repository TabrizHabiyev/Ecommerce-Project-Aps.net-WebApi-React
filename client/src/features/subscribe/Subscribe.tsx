import React from 'react';
import img from '../../assets/img/banner/banner-bg2.webp'
function Subscribe() {
    return (
        <>
            <section className="newsletter__banner--section section--padding pt-0">
                <div className="container-fluid">
                    <div className="newsletter__banner--thumbnail position__relative">
                        <img className="newsletter__banner--thumbnail__img display-block"
                             src={img} alt="newsletter-banner"/>
                            <div className="newsletter__content newsletter__subscribe">
                                <h5 className="newsletter__content--subtitle text-white">Want to offer regularly ?</h5>
                                <h2 className="newsletter__content--title text-white h3 mb-25">Subscribe Our
                                    Newsletter <br/>
                                        for Get Daily Update</h2>
                                <form className="newsletter__subscribe--form position__relative" action="#">
                                    <label>
                                        <input className="newsletter__subscribe--input"
                                               placeholder="Enter your email address" type="email"/>
                                    </label>
                                    <button className="newsletter__subscribe--button primary__btn"
                                            type="submit">Subscribe
                                        <svg className="newsletter__subscribe--button__icon"
                                             xmlns="http://www.w3.org/2000/svg" width="9.159" height="7.85"
                                             viewBox="0 0 9.159 7.85">
                                            <path data-name="Icon material-send"
                                                  d="M3,12.35l9.154-3.925L3,4.5,3,7.553l6.542.872L3,9.3Z"
                                                  transform="translate(-3 -4.5)" fill="currentColor"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Subscribe;