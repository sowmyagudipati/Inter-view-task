import { Injectable } from '@angular/core';
import { Product } from '../modal/products.modal';
import { HttpClient } from '@angular/common/http';
import { map, filter } from "rxjs/operators";
import 'rxjs/Rx';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data: Array<Product>;
  constructor(private http: HttpClient) {
  }
  private getData() {
    return this.http
      .get('../assets/data/data.json').pipe(
        map((x: Array<Product>) => {
          this.data = x.map((product: Product) => {
            product.productID = this.create_UUID()
            return product;
          });
          return x;
        })
      );
  }
  public getProducts(): Observable<Array<Product>> {
    if (!this.data) {
      return this.getData();
    }
    return of(this.data);
  }

  public addProduct(product: Product) {
    product.productID = this.create_UUID();
    this.data.push(product);
    return of(product);
  }

  public removeProduct(id: string) {
    this.data = this.data.filter(a => a.productID !== id);
  }
  private create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
