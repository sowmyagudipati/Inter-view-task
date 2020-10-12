import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../modal/products.modal';
import { ModalService } from '../popup/modal.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  lstProducts: Array<Product> = [];
  displayProducts: Array<Product> = [];
  canRemoveProduct: boolean = false;

  constructor(private productService: ProductService,
    private router: Router,
    private modalService: ModalService) { }
  totalItems: number;
  itemsPerPage: number = 5;
  activePage: number = 1;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.lstProducts = data;
      this.totalItems = this.lstProducts.length;
      this.handelPaging();
    })
  }
  onPageChange(currentpage: number) {
    this.activePage = currentpage;
    this.handelPaging();
  }
  handelPaging() {
    let take = this.itemsPerPage;
    let skip = (this.activePage - 1) * this.itemsPerPage;
    if (skip + take > this.lstProducts.length) {
      take = this.lstProducts.length;
    } else {
      take = skip + take;
    }
    this.displayProducts = this.lstProducts.slice(skip, take);
  }
  addProduct() {
    this.modalService.open('custom-modal-1');
    //this.router.navigate(['/create-product']);
  }

  handelAddedProduct(product: Product) {
    this.lstProducts.push(product);
    this.totalItems = this.lstProducts.length;
    this.handelPaging();
  }

  deleteProduct() {
    this.productService.getProducts().subscribe(data => {
      this.lstProducts = data;
      this.totalItems = this.lstProducts.length;
      this.handelPaging();
      alert('Deleted Successfully');
    })
  }

  allowRemoveProducts() {
    this.canRemoveProduct = true;
  }

}
