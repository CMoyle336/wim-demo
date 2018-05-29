import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './container/home.component';
import { ComponentModule } from '../../components/component.module';
import { CommerceModule } from '@apttus/ecommerce';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesforceModule } from 'ng-salesforce';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentModule,
    CommerceModule,
    SalesforceModule,
    NgbModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
