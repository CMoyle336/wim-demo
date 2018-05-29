import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../components/component.module';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './container/review.component';
import { CommerceModule } from '@apttus/ecommerce';

@NgModule({
  imports: [
    CommonModule,
    ReviewRoutingModule,
    CommerceModule,
    ComponentModule
  ],
  declarations: [ReviewComponent]
})
export class ReviewModule { }
