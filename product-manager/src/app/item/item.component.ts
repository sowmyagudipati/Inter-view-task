import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../modal/products.modal';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  ratingForm = new FormGroup({
    rating: new FormControl('')
  });

  constructor(private productService: ProductService) {

  }

  @Input()
  product: Product;
  @Input()
  canRemoveProduct: boolean;

  @Output() deleteProduct = new EventEmitter();

  ngOnInit(): void {
  }
  onStarClick(str: string) {
    this.ratingForm.patchValue({ rating: str });
    this.product.productRating = str;
  }

  RemoveProduct() {
    if (this.canRemoveProduct) {
      this.productService.removeProduct(this.product.productID);
      this.deleteProduct.emit();
    }
  }
}
