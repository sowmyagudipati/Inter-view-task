import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {path: 'product-list', component: ItemListComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: '', redirectTo: '/product-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
