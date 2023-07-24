import { createAction, createFeatureSelector, createReducer , createSelector, on} from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "../product";

export interface State extends AppState.State{
    products:ProductState
}
// defie interfaces 
export interface ProductState{
    showProductCode:boolean;
    currentProduct:Product
    products:Product[]
}


const initialState:ProductState ={
    showProductCode:true,
    currentProduct:null,
    products:[]
}

// selectors
// define the selectors to retrieve the required piece of state 
// this method will retrieve the entire products state
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// this method will retrieve the 'showProductCode' state value
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

export const getcurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
)

export const getproducts = createSelector(
    getProductFeatureState,
    state => state.products
)


export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product code') , (state): ProductState=>{
        return{
            ...state, // shallow copy
            showProductCode: !state.showProductCode
        } ;
    })
)