import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";


export const loadProductsSuccess = createAction(
    '[Product API] Load Success',
    props<{ products: Product[] }>()
)
export const loadProductsFailure = createAction(
    '[Product API] Load Failure',
    props<{ error: string }>()
)

export const updateProductSuccess = createAction(
    '[Product API] Update Success',
    props<{ product: Product }>()
)

export const updateProductFailure = createAction(
    '[Product API] Update Failure',
    props<{ error: string }>()
)