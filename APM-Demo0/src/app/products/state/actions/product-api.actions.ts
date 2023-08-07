import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

// Read
export const loadProductsSuccess = createAction(
    '[Product API] Load Success',
    props<{ products: Product[] }>()
)
export const loadProductsFailure = createAction(
    '[Product API] Load Failure',
    props<{ error: string }>()
)

// Update
export const updateProductSuccess = createAction(
    '[Product API] Update Success',
    props<{ product: Product }>()
)

export const updateProductFailure = createAction(
    '[Product API] Update Failure',
    props<{ error: string }>()
)

// Delete
export const deleteProductSuccess = createAction(
    '[Product API] Delete Success',
    props<{id:number}>()
)

export const deleteProductFailure = createAction(
    '[Product API] Delete Failure',
    props<{ error: string }>()
)