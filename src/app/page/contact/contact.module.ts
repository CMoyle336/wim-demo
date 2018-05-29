import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import {ContactComponent} from './container/contact.component';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  imports: [
    NgbModule,
    CommerceModule,
    ComponentModule,
    CommonModule,
    ContactRoutingModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
