import React, {useState} from 'react';
import {debounce, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {setProductParams} from "./productSlice";

function ProductSearch() {
    const {productParams} = useAppSelector(state => state.product);
    const [searchTerm,setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const deboucedSearch = debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    },1000)

    return (
        <TextField
        label="Search Product"
        variant="outlined"
        fullWidth
        value={searchTerm || ''}
        onChange={(event:any)=>{
            setSearchTerm(event.target.value)
            deboucedSearch(event)
        }}
        />
    );
}

export default ProductSearch;