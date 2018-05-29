import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../components/component.module';
import { CompleteComponent } from './container/complete.component';
import { CompleteRoutingModule } from './complete-routing.module';
import { CommerceModule } from '@apttus/ecommerce';

@NgModule({
  imports: [
    CommonModule,
    CompleteRoutingModule,
    CommerceModule,
    ComponentModule
  ],
  declarations: [CompleteComponent]
})
export class CompleteModule { }
