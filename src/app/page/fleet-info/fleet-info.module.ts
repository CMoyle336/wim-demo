import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '@apttus/ecommerce';
import { ComponentModule } from '../../components/component.module';
import { FleetInfoRoutingModule } from './fleet-info-routing.module';
import {FleetInfoComponent} from './container/fleet-info.component';
import {FormControl} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FleetInfoService } from '../../services/fleet-info.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommerceModule,
    ComponentModule,
    FleetInfoRoutingModule,
    FormsModule,
  ],
  declarations: [FleetInfoComponent],
  providers : [FleetInfoService]
})
export class FleetInfoModule { }
