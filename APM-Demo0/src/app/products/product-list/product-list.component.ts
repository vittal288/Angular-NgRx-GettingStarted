import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getProducts, getShowProductCode, getError } from '../state/product.reducer';
import { Observable } from 'rxjs';

import { Product } from '../product';
import * as ProductActions  from '../state/product.actions';



@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  


  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);
    
    // dispatch an action called (loadProducts) to load the products via NgRx effects(ProductEffects) through service
    // how the flow works with following actions 
    // step 1: dispatching an action called loadProducts()
    // step 2: Once product module is lazily loaded then register the loadEffects 
    // step 3: at loadEffects(product.effects.ts) filter the "ProductActions.loadProducts()" action using ofType operator 
    // step 4: Invoke the service to get list of products
    // step 5: once service response is success then dispatch another action called "ProductActions.loadProductsSuccess" with products
    // step 6: at ProductActions.loadProductsSuccess action, update the store with latest products 
    this.store.dispatch(ProductActions.loadProducts());
    
    this.selectedProduct$ =  this.store.select(getCurrentProduct);
    
    

    // subscribing the store can be done it always ngOnInit life-cycle hook
    // read the store
    // select method will return an observable of state slice 
    this.displayCode$ = this.store.select(getShowProductCode);
  }


  checkChanged(): void {
    this.store.dispatch(
      ProductActions.toggleProductCode()
    )
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(
      ProductActions.initializeCurrentProduct()
    )
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({product}))
  }

}
