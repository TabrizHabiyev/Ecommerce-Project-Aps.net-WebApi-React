import React, {useEffect, useState} from 'react';
import ShopSidebar from "./ShopSidebar";
import ProductList from "../Products/ProductList";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {fetchProductsAsync, productSelectors, setPageNumber, setProductParams} from "../Products/productSlice";
import RadioButtonGroup from "../../App/components/RadioButtonGroup";
import {Pagination} from "@mui/material";
import AppPagination from "../../App/components/AppPagination";

function ShopPage() {

    const product = useAppSelector(productSelectors.selectAll);
    const {productsLoaded,status,filterLoaded,types,category,productParams,metaData} = useAppSelector(state => state.product)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(!productsLoaded) dispatch(fetchProductsAsync())
    },[productsLoaded,dispatch])


    const sortOptions = [
        { value: 'name', label: 'Alphabetical' },
        { value: 'priceDesc', label: 'Price - High to low' },
        { value: 'price', label: 'Price - Low to high' },
    ]

     if(status.includes('peding') || !metaData)return <h1>yuklernir...</h1>

    return (
        <section className="shop__section section--padding">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-lg-4">
                    <ShopSidebar/>
                    <div className="single__widget widget__bg">
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))}

                        />
                    </div>
                    </div>
                    <ProductList product={product}/>
                    <AppPagination
                    metaData={metaData}
                    onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
                    />
                </div>
            </div>
        </section>
    );
}

export default ShopPage;