import { createReducer, on } from "@ngrx/store";
import {ProductAPIActions, ProductPageActions} from "./actions";
import { Product } from "../product";

// define interfaces 
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}


const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}


// subscribing to actions 
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state, // shallow copy
            showProductCode: !state.showProductCode
        };
    }),

    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),

    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),

    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),

    // load products related
    on(ProductAPIActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),

    on(ProductAPIActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),

    // update product
    on(ProductAPIActions.updateProductSuccess, (state, action):ProductState=>{
        // creating a new array from map method to avoid mutating original array
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product :item
        )
        return{
            ...state,
            products:updatedProducts,
            currentProductId: action.product.id,
            error:''
        };
    }),

    on(ProductAPIActions.updateProductFailure , (state, action) =>{
        return{
            ...state,
            error:action.error
        };
    })
)
