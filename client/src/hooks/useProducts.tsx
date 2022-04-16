import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import {fetchProductsAsync, productSelectors} from "../features/Products/productSlice";

;

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, types, metaData } = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    return {
        products,
        types,
        metaData
    }
}