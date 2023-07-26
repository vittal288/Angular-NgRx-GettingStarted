import { createFeatureSelector, createReducer , createSelector, on} from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "../product";
import * as ProductActions from "./product.actions";

export interface State extends AppState.State{
    products:ProductState
}
// define interfaces 
export interface ProductState{
    showProductCode:boolean;
    currentProduct:Product;
    products:Product[];
    error:string;
}


const initialState:ProductState ={
    showProductCode:true,
    currentProduct:null,
    products:[],
    error:''
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

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
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
    on( ProductActions.toggleProductCode , (state): ProductState=>{
        return{
            ...state, // shallow copy
            showProductCode: !state.showProductCode
        } ;
    }),

    on(ProductActions.setCurrentProduct, (state, action):ProductState=>{
        return{
            ...state,
            currentProduct:action.product
        }
    }),

    on(ProductActions.clearCurrentProduct ,(state):ProductState=>{
        return{
            ...state,
            currentProduct:null
        }
    }),

    on(ProductActions.initializeCurrentProduct, (state):ProductState=>{
        return{
            ...state,
            currentProduct:{
                id:0,
                productName:'',
                productCode:'New ',
                description:'',
                starRating:0            
            }
        }
    }),

    on(ProductActions.loadProductsSuccess, (state, actions):ProductState=>{
        return{
            ...state,
            products:actions.products,
            error:''
        }
    }),

    on(ProductActions.loadProductsFailure, (state, actions): ProductState=>{
        return{
            ...state,
            products:[],
            error:actions.error
        }
    })
)
