import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompareProductsComponent } from './container/compare-products.component';

const routes: Routes = [{
  path: '',
  component: CompareProductsComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareProductsRoutingModule { }
