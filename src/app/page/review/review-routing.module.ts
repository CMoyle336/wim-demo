import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './container/review.component';
const routes: Routes = [
  {
    path: '', 
    component: ReviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
