import { createFeatureSelector, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "../product";
import { ProductState } from "./product.reducer";


export interface State extends AppState.State {
    products: ProductState
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
