import { Component, OnChanges, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '@apttus/ecommerce';

@Component({
  selector: 'pl-field-filter',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{(title) ? title : field?.label}}</h5>
        <input-field [field]="field" (change)="handleChange($event)" [(ngModel)]="data" [label]="false"></input-field>
      </div>
    </div>
  `,
  styles: [`
    :host{
      font-size: smaller;
    }
  `]
})
export class FieldFilterComponent implements OnChanges {
  @Input() fieldName: string;
  @Input() title: string;
  field: any;
  data: any = [];
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    this.productService.describe(this.fieldName).subscribe(res => this.field = res);
  }

  handleChange(evt) {

  }

}
