import { Component, OnInit, NgZone } from '@angular/core';
import { CategoryService, Category, StorefrontService, Storefront, PriceListService,
         CartService, Cart, CartItem, User, UserService } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PSUser } from '../../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    categoryTree: Array<Category>;
    tempCategoryTree: Array<Category>;
    public subcats2: Category[];
    storefront: Storefront;
    searchQuery: string;
    postalCode: number;
    reorderCatArr: Category[] = [];
    user: PSUser;
    constructor( private categoryService: CategoryService,
        private userService: UserService,
        private storefrontService: StorefrontService,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone,
        private router: Router,
        private titleService: Title ) {
            for (let counter1 = 0; counter1 < 7; counter1++) {
                this.reorderCatArr.push(null);
            }
    }

    ngOnInit() {

        this.userService.me().subscribe((res: PSUser) => this.ngZone.run(() => {
            this.user = res;
        }));

        this.categoryService.getCategoryTree()
        .subscribe(res => this.ngZone.run(() => {

            this.tempCategoryTree = res;
            this.categoryTree = null;
            if (this.tempCategoryTree.length > 0) {

                // this.reorderCategories();

                this.categoryTree  = Object.assign([], this.tempCategoryTree);
                this.subcats2 = this.tempCategoryTree[0]._children;
            }

        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
            this.titleService.setTitle(this.storefront.APTSMD_Page_Title__c);
        }));
    }

    reorderCategories( ) {
        const subCategories  = Object.assign([], this.tempCategoryTree[0]._children);
        for (let counter = 0; counter < subCategories.length; counter++) {
            this.tempCategoryTree[0]._children[counter] = null;
        }

        for (let counter = 0; counter < subCategories.length; counter++) {
            const element = subCategories[counter];
            if (element.Apttus_Config2__Label__c === 'Air Filtration') {
                this.tempCategoryTree[0]._children[0] = element;
            } else if (element.Apttus_Config2__Label__c === 'Fuel Filtration') {
                this.tempCategoryTree[0]._children[1] = element;
            } else if (element.Apttus_Config2__Label__c === 'Lube Filtration') {
                this.tempCategoryTree[0]._children[2] = element;
            } else if (element.Apttus_Config2__Label__c === 'Transmission Filtration') {
                this.tempCategoryTree[0]._children[3] = element;
            } else if (element.Apttus_Config2__Label__c === 'Hydraulic Filtration') {
                this.tempCategoryTree[0]._children[4] = element;
            } else if (element.Apttus_Config2__Label__c === 'Our Cooling Solutions') {
                this.tempCategoryTree[0]._children[5] = element;
            } else if (element.Apttus_Config2__Label__c === 'Fluid Analysis') {
                this.tempCategoryTree[0]._children[6] = element;
            }
        }


        // return this.reorderCatArr;
    }
}
