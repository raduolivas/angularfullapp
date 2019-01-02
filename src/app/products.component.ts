import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{
  
  productName = 'A Book';
  isDisabled = true;
  products = [];
  private productSubscription: Subscription;
  
  constructor(private productsService: ProductsService) {
    setTimeout(()=> {
      this.isDisabled = false;
      
    }, 3000)
   }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productSubscription = this.productsService.productsUpdated.subscribe(() =>{
        this.products = this.productsService.getProducts();
    });

  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }

  onAddProduct(form) {
      if (form.valid) {
        this.productsService.addProduct(form.value.productName);
        // this.products.push(form.value.productName);
      }
  }

  ngOnDestroy() {
      this.productSubscription.unsubscribe();
  }

}
