import { Component, OnChanges, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '@apttus/ecommerce';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'product-availability',
    template: `
    <section class="widget">
        <h3 class="widget-title">Filter By {{title}}</h3>
        <form [formGroup]="filterGroup" *ngIf="filterGroup">
        <div *ngFor="let availability of availabilityList" class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" [id]="availability" [formControlName]="availability" (change)="onCheckChange($event)">
            <label class="custom-control-label" [for]="availability">{{availability}}</label>
        </div>
         </form>
    </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAvailabilityFilterComponent implements OnChanges {
    @Input() availabilityList: Array<string>;
    @Input() title: string = 'Availability';
    @Output('filterChange') filterChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    filterGroup: FormGroup;
    timeout: any;

    constructor() { }

    ngOnChanges() {
        this.filterGroup = new FormGroup({});
        if (this.availabilityList) {
            this.availabilityList.forEach(availabilityFilterValues => this.filterGroup.addControl(availabilityFilterValues, new FormControl(false)));
        }
    }

    onCheckChange(event) {

      const products = [];
      let queryParams = 'APTSCU_Availability__c IN (';
      let queryCount = 0;
      if (this.timeout)
          clearTimeout(this.timeout);

      this.availabilityList.forEach(availability => {
          if (this.filterGroup.controls[availability].value === true) {
            if (queryCount > 0) {
                queryParams = queryParams + ',\'' +  availability + '\'';
            } else {
                queryParams  = queryParams + '\'' +  availability + '\'';

            }
            queryCount ++;
          }


      });
      queryParams = queryParams + ')';
      if (queryCount > 0) {
        products.push(queryParams);
      }


      this.timeout = setTimeout(() => this.filterChange.emit(products), 1000);

    }

}
