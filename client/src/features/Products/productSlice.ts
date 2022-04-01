import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Product,ProductParams} from "../../models/Product";
import agent from "../../App/api/agent";
import {RootState} from "../../store/configureStore";
import {MetaData} from "../../models/pagination";


interface ProductState{
    productsLoaded:boolean;
    filterLoaded:boolean;
    status:string;
    category:string[];
    types:string[];
    productParams:ProductParams;
    metaData:MetaData | null;
}


const productsAdapter = createEntityAdapter<Product>();

function getAxsiosParams(productParams:ProductParams){
    const params = new URLSearchParams();
    params.append('pageNumber',productParams.pageNumber.toString());
    params.append('pageSize',productParams.pageSize.toString());
    params.append('orderBy',productParams.orderBy);
    if(productParams.searchTerm) params.append('searchTerm',productParams.searchTerm);
    if(productParams.category?.length > 0) params.append('category',productParams.category.toString());
    if(productParams.types.length > 0) params.append('types',productParams.types.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[],void,{state:RootState}>(
    'product/fetchProductsAsync',
    async (_,thunkAPI)=>{
        const params  = getAxsiosParams(thunkAPI.getState().product.productParams)
        try {
            const response =  await agent.Product.allProduct(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        }catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product,string>(
    'product/fetchProductAsync',
    async (productId,thunkAPI)=>{
        try {
            return await agent.Product.getProductById(productId);
        }catch (error:any) {
           return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams(){
    return{
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        category:[],
        types:[]
    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState<ProductState>({
        productsLoaded:false,
        filterLoaded:false,
        status: 'idle',
        types:[],
        category:[],
        productParams: initParams(),
        metaData:null
    }),
    reducers:{
        setProductParams:(state,action)=>{
            state.productsLoaded =false;
            state.productParams = {...state.productParams,...action.payload,pageNumber:1};
        },

        setPageNumber:(state,action)=>{
            state.productsLoaded =false;
            state.productParams = {...state.productParams,...action.payload};
        },

        setMetaData:(state,action)=>{
            state.metaData = action.payload;
            console.log(action)
        },

        resetProductParams:(state)=>{
            state.productParams = initParams();
        }
    },
    extraReducers:(builder => {

        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status = 'pendingProduct'
        });

        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected,(state,action)=>{
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status = 'pendingFetchProduct'
        });

        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productsAdapter.setOne(state,action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.rejected,(state,action)=>{console.log(action)
            state.status = 'idle'
        });

    })
})

export const productSelectors = productsAdapter.getSelectors((state:RootState)=>state.product)

export const {setProductParams,resetProductParams,setMetaData,setPageNumber} = productSlice.actions;