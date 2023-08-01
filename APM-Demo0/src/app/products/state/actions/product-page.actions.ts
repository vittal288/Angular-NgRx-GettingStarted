import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const toggleProductCode = createAction(
    '[Product Page] Toggle Product Code'
);

export const setCurrentProduct =createAction(
    '[Product Page] Set Current Product',
    props<{currentProductId: number}>()
);

export const clearCurrentProduct = createAction(
    '[Product Page] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product Page] Initialize Current Product'
)

// define complex actions(depended actions)
export const loadProducts = createAction(
    '[Product Page] Load'
)

export const updateProduct = createAction(
    '[Product Page] Update',
    props<{product:Product}>()
)

