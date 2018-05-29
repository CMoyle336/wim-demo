import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInfoComponent} from './container/fleet-info.component';

const routes: Routes = [{
  path: '',
  component: FleetInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInfoRoutingModule {}
