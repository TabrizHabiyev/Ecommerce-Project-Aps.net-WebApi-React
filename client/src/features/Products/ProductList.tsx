import React from 'react';
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard";
const loop = [1,2,3,4,5,6,7,8,9]
function ProductList() {

    return (
        <>
            {loop.map(() =>
                    <ProductCard/>
            )}
        </>
    );
}

export default ProductList;