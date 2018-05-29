import { Component, OnChanges, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '@apttus/ecommerce';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'pl-subcategory',
    template: `
    <section class="widget">
        <h3 class="widget-title">Filter By {{title}}</h3>
        <form [formGroup]="filterGroup" *ngIf="filterGroup">
        <div *ngFor="let category of categoryList" class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" [id]="category.Id" [formControlName]="category.Id" (change)="onCheckChange($event)">
            <label class="custom-control-label" [for]="category.Id">{{category.Apttus_Config2__Label__c}}</label>
        </div>
         </form>
    </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcategoryComponent implements OnChanges {
    @Input() categoryList: Array<Category>;
    @Input() title: string = 'Subcategories';
    @Output('filterChange') filterChange: EventEmitter<Array<Category>> = new EventEmitter<Array<Category>>();

    filterGroup: FormGroup;
    timeout: any;

    constructor() { }

    ngOnChanges() {
        this.filterGroup = new FormGroup({});
        if (this.categoryList) {
            this.categoryList.forEach(category => this.filterGroup.addControl(category.Id, new FormControl(false)));
        }
    }

    onCheckChange(event) {
        const categories = [];
        if (this.timeout)
            clearTimeout(this.timeout);

        this.categoryList.forEach(category => {
            if (this.filterGroup.controls[category.Id].value === true)
                categories.push(category);
        });

        this.timeout = setTimeout(() => this.filterChange.emit(categories), 1000);

    }

}
