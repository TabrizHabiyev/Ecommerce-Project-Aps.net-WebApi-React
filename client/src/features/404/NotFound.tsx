import React from 'react';
import imgNotFound from '../../assets/img/other/404-thumb.webp';
import {Link} from "react-router-dom";


function NotFound()
{
    return (
        <>
            <section className="error__section section--padding">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="error__content text-center">
                                <img className="error__content--img mb-50" src={imgNotFound} alt="error-img"/>
                                    <h2 className="error__content--title">Opps ! We're not found this page </h2>
                                    <p className="error__content--desc">Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Excepturi animi aliquid minima assumenda.</p>
                                    <Link className="error__content--btn primary__btn"  to={"/"}>Back To Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NotFound;