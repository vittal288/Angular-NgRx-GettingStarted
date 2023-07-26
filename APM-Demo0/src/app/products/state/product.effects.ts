import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";



@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) {

    }

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
                catchError(error=>
                    of(ProductActions.loadProductsFailure({error}))
                )
            ))

        )
})
}