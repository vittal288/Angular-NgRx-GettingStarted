import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "../product";
import * as ProductActions from "./product.actions";

export interface State extends AppState.State {
    products: ProductState
}
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

// define selectors
// define the selectors to retrieve the required piece of state 
// this method will retrieve the entire entire products state object
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// this method will retrieve the 'showProductCode' state value, 
// all selectors will returns an observables 
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            } as Product;
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
)



export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
)


export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)


// subscribing to actions 
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state, // shallow copy
            showProductCode: !state.showProductCode
        };
    }),

    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),

    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),

    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),

    // load products related
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),

    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),

    // update product
    on(ProductActions.updateProductSuccess, (state, action):ProductState=>{
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

    on(ProductActions.updateProductFailure , (state, action) =>{
        return{
            ...state,
            error:action.error
        };
    })
)
