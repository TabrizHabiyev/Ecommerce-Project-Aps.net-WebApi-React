import React from 'react';
import ProductCard from "./ProductCard";
import {Product} from "../../models/Product";


function ProductList({product}:any) {
    return (
        <div className="col-xl-9 col-lg-8">
            <div className="shop__product--wrapper">
                <div className="tab_content">
                    <div id="product_grid" className="tab_pane active show">
                        <div className="product__section--inner product__grid--inner">
                            <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
            {product?.map((products:Product) => (
            <ProductCard  key={product.id} product={products}/>
            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;