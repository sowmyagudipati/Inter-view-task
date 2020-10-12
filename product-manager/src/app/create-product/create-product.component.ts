import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../popup/modal.service';
import { Product } from '../modal/products.modal'
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  @Output() addProduct = new EventEmitter<Product>();

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    attribute1: new FormControl('', Validators.required),
    attribute2: new FormControl('', Validators.required),
    attribute3: new FormControl('', Validators.required),
    minOrders: new FormControl('', Validators.required),
    deliveryTime: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    productRating: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
  });

  constructor(private router: Router,
    private modalService: ModalService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var product = this.maptoProduct(this.productForm.value);
    this.productService.addProduct(product).subscribe((a:Product) => {
      this.modalService.close('custom-modal-1');
      this.addProduct.emit(a);
    });
  }
  cancle() {
    this.modalService.close('custom-modal-1');
    //this.router.navigate(['/product-list']);
  }

  maptoProduct(item: any) {
    var product = new Product();
    product.attributes.attribute1 = item.attribute1;
    product.attributes.attribute2 = item.attribute2;
    product.attributes.attribute3 = item.attribute3;
    product.attributes.image = item.imageUrl;
    product.productName = item.productName;
    product.deliveryTime = item.deliveryTime;
    product.location = item.location;
    product.minOrders = item.minOrders;
    product.productPrice = item.productPrice;
    product.productRating = item.productRating;
    return product;
  }
}
