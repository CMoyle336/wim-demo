import { Component, OnInit, ChangeDetectionStrategy, Input, NgZone, Output ,  OnChanges,  EventEmitter } from '@angular/core';
import { CategoryService, Category, StorefrontService, Storefront, PriceListService, CartService, Cart, CartItem } from '@apttus/ecommerce';
import { PSUser, PSUserService } from '../../../models/user.model';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
    selector: 'pl-breadcrumb',
    template: `
    <div class="page-title">
        <div class="container-fluid">
        <div class="float-right"><span *ngIf="user?.Id" class="account-username">Hi, {{user?.FirstName}} </span>

            <span *ngIf="user?.User_Type__c=='Partner User'">
                , Buy For:
                    <select class="form-control form-control-sm" #s (change)="onAccountChange(s.value)">
                        <option value="DF Clothing">DF Clothing</option>
                        <option value="Anderson Clothing">Anderson Clothing</option>
                        <option value="Baker Clothing">Baker Clothing</option>
                        <option value="Cunningham Clothing">Cunningham Clothing</option>
                    </select>
            </span>
            </div>
            <ul class="breadcrumbs float-left">
                <li class="breadcrumb-item">
                    <a
                        *ngIf="storefront"
                        [style.color]="storefront.APTSMD_Accent_Color__c"
                        [routerLink]="['/']">Home</a>
                </li>
                <li class="breadcrumb-item" *ngFor="let crumb of breadcrumbs; let l = last" [class.active]="l">
                    <a href="javascript:void(0)" [routerLink]="['/product-list', crumb.Name]" *ngIf="!l">{{crumb.Apttus_Config2__Label__c}}</a>
                    <span *ngIf="l">{{crumb.Apttus_Config2__Label__c}}</span>
                </li>
            </ul>

        </div>
    </div>
    `,
    styles: [],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit, OnChanges {

    user: PSUser;
    @Input() breadcrumbs: Array<Category>;
    @Output() accountName  = new EventEmitter<string>();

    storefront: Storefront;
    filterGroup: FormGroup;
    constructor( private userService: PSUserService,
        private ngZone: NgZone,
        private storefrontService: StorefrontService ) {}

    ngOnInit() {
        this.userService.me().subscribe((res: PSUser) => this.ngZone.run(() => {
            this.user = res;
        }));
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

    ngOnChanges() {

    }

    onAccountChange(name: any) {
        this.accountName.emit(name);
    }
}
