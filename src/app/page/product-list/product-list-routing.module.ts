import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './container/product-list.component';
const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path : ':categoryName',
    component : ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
