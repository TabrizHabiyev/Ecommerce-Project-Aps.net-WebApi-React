import React from 'react';
import ProductCard from "./ProductCard";


function ProductList({product}:any) {
    return (
        <>
            {product?.map((products:any) => (
            <ProductCard  key={product.id} product={products}/>
            ))}
        </>
    );
}

export default ProductList;