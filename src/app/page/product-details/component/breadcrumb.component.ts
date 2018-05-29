import { Component, OnInit, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { CategoryService, Category, StorefrontService, Storefront, PriceListService, CartService, Cart, CartItem, Product } from '@apttus/ecommerce';
import { PSUser, PSUserService } from '../../../models/user.model';

@Component({
    selector: 'pdp-breadcrumb',
    template: `
    <div class="page-title">
        <div class="container-fluid">
        <div class="float-right"><span *ngIf="user?.Id" class="account-username">Hi, {{user?.FirstName}} </span>
        <span *ngIf="user?.User_Type__c=='Partner User'">
            , Buy For:
            <select>
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
                        [routerLink]="'/home'">Home</a>
                </li>
                <li class="breadcrumb-item" *ngFor="let category of categoryList">
                    <a
                        *ngIf="storefront"
                        [style.color]="storefront.APTSMD_Accent_Color__c"
                        [routerLink]="'/product-list/' + category.Name">{{category.Apttus_Config2__Label__c}}
                    </a>
                </li>
                <li class="breadcrumb-item active">{{product?.Name}}</li>
            </ul>
        </div>
    </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
    @Input() product: Product;
    @Input() categoryList: Array<Category>;
    user: PSUser;
    storefront: Storefront;

    constructor(private userService: PSUserService,
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

}
