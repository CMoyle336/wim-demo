import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BulkOrderComponent} from './container/bulk-order.component';

const routes: Routes = [{
  path: '',
  component: BulkOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkOrderRoutingModule { }
