import React from 'react';
import img from '../../../assets/img/other/heading-shape-img.webp'
import ProductList from "../../Products/ProductList";
function WoodenFurniture() {
    return (
        <>
            <section className="product__section section--padding pt-10">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-12 product__col--width__8">
                            <div className="product__section--wrapper">
                                <div className="section__heading style2 position__relative border-bottom mb-35">
                                    <h2 className="section__heading--maintitle">Wooden Furniture</h2>
                                    <img className="section__heading--position__img"
                                         src={img} alt="heading-shape-img"/>
                                </div>
                                <div className="product__section--inner">
                                    <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n25">
                                   <ProductList/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default WoodenFurniture;