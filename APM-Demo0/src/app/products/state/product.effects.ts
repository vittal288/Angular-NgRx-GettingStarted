import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";



@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) {

    }

    // load product effects
    loadProducts$ = createEffect(() => {
        // this.actions$.subscribe(allActions=>{
        //     console.log('AllActions--->', allActions);
        // });


        return this.actions$.pipe(
            // to filter the required action and continue the remaining steps
            ofType(ProductActions.loadProducts),
            // mergeMap is merges all observables and produces on observable
            mergeMap(() => this.productService.getProducts().pipe(
                // once we receive success response from server then dispatch another action to handle the response or to update the store
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error =>
                    of(ProductActions.loadProductsFailure({ error }))
                )
            ))

        )
    })

    // update product effect 
    updateProduct$ = createEffect(() => {
        // listen for all actions here
        return this.actions$.pipe(
            // filter out updateProduct action ONLY (this is the line will connect the bridge between action-->effects-->reducer-->store)
            ofType(ProductActions.updateProduct),
            // merge two observable(one from action, one from return from service ) and flatten it
            concatMap(action =>
                this.productService.updateProduct(action.product).
                    pipe(
                        map(product => ProductActions.updateProductSuccess({ product })),
                        catchError(error =>
                            of(ProductActions.loadProductsFailure({ error }))
                        )
                    ))
        )
    })
}