import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Product} from "../../models/Product";
import agent from "../../App/api/agent";
import {RootState} from "../../store/configureStore";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'product/fetchProductAsync',
    async ()=>{
        try {
            return await agent.Product.allProduct();
        }catch (err) {
            console.log(err)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState({
        productsLoaded:false,
        status: 'idle'
    }),
    reducers:{},
    extraReducers:(builder => {

        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status = 'pendingProduct'
        });

        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status = 'idle';
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state:RootState)=>state.product)