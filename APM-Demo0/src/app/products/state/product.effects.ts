import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import {ProductAPIActions, ProductPageActions } from './actions';
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";




@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) {

    }

    // load product effects
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            // to filter the required action and continue the remaining steps
            ofType(ProductPageActions.loadProducts),
            // mergeMap is merges all observables and produces on observable
            mergeMap(() => this.productService.getProducts().pipe(
                // once we receive success response from server then dispatch another action to handle the response or to update the store
                map(products => ProductAPIActions.loadProductsSuccess({ products })),
                catchError(error =>
                    of(ProductAPIActions.loadProductsFailure({ error }))
                )
            ))

        )
    })

    // update product effect 
    updateProduct$ = createEffect(() => {
        // listen for all actions here
        return this.actions$.pipe(
            // filter out updateProduct action ONLY (this is the line will connect the bridge between action-->effects-->reducer-->store)
            ofType(ProductPageActions.updateProduct),
            // merge two observable(one from action, one from return from service ) and flatten it
            concatMap(action =>
                this.productService.updateProduct(action.product).
                    pipe(
                        map(product => ProductAPIActions.updateProductSuccess({ product })),
                        catchError(error =>
                            of(ProductAPIActions.loadProductsFailure({ error }))
                        )
                    ))
        )
    })

    // delete product
    deleteProduct$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            mergeMap(action =>
                this.productService.deleteProduct(action.id).
                pipe(
                    map(product => ProductAPIActions.deleteProductSuccess({id: action.id})),
                    catchError(error=>
                            of(ProductAPIActions.deleteProductFailure({error}))
                    )
                )
            )

        )
    })
}