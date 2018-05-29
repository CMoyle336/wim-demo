import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './container/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    ComponentModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
