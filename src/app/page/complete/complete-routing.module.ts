import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteComponent } from './container/complete.component';
const routes: Routes = [
  {
    path: '', 
    component: CompleteComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteRoutingModule { }
