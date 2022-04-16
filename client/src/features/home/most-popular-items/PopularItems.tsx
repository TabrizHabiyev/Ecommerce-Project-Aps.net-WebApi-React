import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { Grid } from '@mui/material';
import ProductList from "../../Products/ProductList";
import agent from "../../../App/api/agent";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/configureStore";
import {fetchProductsAsync, productSelectors} from "../../Products/productSlice";


const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: 1px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  
  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Tablist=[
    {title:'Chair'},
    {title:'Sofa'},
    {title:'Lamp'},
    {title:'Table'},
    {title:'Monitor'}
]

export default function UnstyledTabsCustomized() {
    const product = useAppSelector(productSelectors.selectAll);
    const {productsLoaded,status,filterLoaded,types,category,productParams,metaData} = useAppSelector(state => state.product)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(!productsLoaded) dispatch(fetchProductsAsync())
    },[productsLoaded,dispatch])
    if(status.includes('peding') || !metaData)return <h1>Loading...</h1>
    return (
        <>
            <section className="product__section section--padding pt-10">
             <div className="container-fluid">
                 <div className="rov">
            <div className="col-xl-8 col-12 product__col--width__8">
                <div className="product__section--wrapper">
                    <div className="section__heading style2 position__relative border-bottom mb-35">
                        <h2 className="section__heading--maintitle">Featured Product</h2>
                    </div>
                    <div className="product__section--inner">
                        <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n25">
                            <ProductList product={product.filter(x=>x.featured === true)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
             </div>
            </section>
        </>
    )
}
