import React from 'react';
import paymentPhoto from '../../assets/img/other/payment-visa-card.webp';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="footer__section footer__bg">
                <div className="container-fluid">
                    <div className="main__footer">
                    </div>
                    <div className="footer__bottom d-flex justify-content-between align-items-center">
                        <p className="copyright__content  m-0">Copyright © 2022</p>
                            <Link className="copyright__content--link" to="#">
                            </Link> . All
                        <div className="footer__payment text-right">
                            <img className="footer__payment--visa__card display-block"
                                 src={paymentPhoto} alt="visa-card"/>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;