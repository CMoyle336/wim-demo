import { Component, OnInit, NgZone, Inject, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, Product , ProductService, Category, SearchResults, SearchService, PriceTier } from '@apttus/ecommerce';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

import { ChildRecord } from 'ng-salesforce';

declare var $: any;
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    public category: Category;
    public subCategories: Array<Category>;
    public searchResults: SearchResults;
    public availabilityFilterValues: Array<string> = ['In Stock', 'Out of Stock', 'Low Stock'];
    product: Product;
    page = 1;
    pageSize = 8;
    view = 'grid';
    priceTier: PriceTier = null;
    categoryFilter: Array<Category> = null;
    customFilters: Array<string> = null;
    sortField: string = null;
    isSearch: boolean = false;
    query: string;
    productFeatureSetValues: ChildRecord;
    productFeatureSet: Array<string>;
    compareProductCount: number;
    compareProductIds: string[];
    reorderCatArr: Category[] = [];
    accountName: string;
    constructor(private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private searchService: SearchService,
        private categoryService: CategoryService,
        private ngZone: NgZone,
        private router: Router,
        private pageScrollService: PageScrollService,
        @Inject(DOCUMENT) private document: any) {
            this.compareProductCount = 0;
            this.compareProductIds = [];
            for (let counter1 = 0; counter1 < 7; counter1++) {
                this.reorderCatArr.push(null);

            }
        }

        ngOnInit() {

            this.activatedRoute.params.subscribe(params => {
                this.categoryFilter = null;
                this.customFilters = null;
                this.priceTier = null;
                this.sortField = null;
                if (params['categoryName']) {
                    this.categoryService.where(`Name = '` + params['categoryName'] + `'`)
                    .map(categoryList => categoryList[0])
                    .subscribe(category => {
                        this.isSearch = false;
                        this.category = category;
                        this.getResults();
                        this.categoryService.getSubcategories(this.category.Id)
                        .subscribe(subcategories => this.ngZone.run(() => {
                            if (subcategories.length > 0) {
                                // this.subCategories = this.reorderCategories(subcategories);
                                this.subCategories = subcategories;
                                console.log(this.subCategories);
                            } else {
                                this.subCategories = subcategories;
                            }


                        }));
                    });
                } else if (params['query']) {
                    this.query = params['query'];
                    this.isSearch = true;
                    this.getResults();
                }
            });
        }
        ngAfterViewInit() {
            this.loadScript();
        }
        public loadScript() {
            let isFound = false;
            const scripts = document.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; ++i) {
                if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                    isFound = true;
                }
            }

            if (!isFound) {
                const dynamicScripts = ['https://swc.cdn.skype.com/sdk/v1/sdk.min.js'];

                for (let i = 0; i < dynamicScripts .length; i++) {
                    const node = document.createElement('script');
                    node.src = dynamicScripts [i];
                    node.type = 'text/javascript';
                    node.async = false;
                    node.charset = 'utf-8';
                    document.getElementsByTagName('head')[0].appendChild(node);
                }

            }
        }

        getResults() {
            if (this.searchResults)
            this.searchResults.productList = null;

            if (!this.isSearch) {
                this.searchService.searchProductsByCategory(this.category.Id, this.pageSize, (this.page - 1) * this.pageSize,
                                                            this.sortField, 'ASC', this.categoryFilter, this.priceTier, this.customFilters)
                .take(1)
                .subscribe(res => this.ngZone.run(() =>  this.searchResults = res));
            } else
            this.searchService.getSearchResults(this.query, this.pageSize, (this.page - 1) * this.pageSize, this.sortField, 'ASC',
            this.categoryFilter, this.priceTier, this.customFilters)
            .take(1)
            .subscribe(res => this.ngZone.run(() =>  this.searchResults = res));

        }

        scrollTop() {
            setTimeout(() => {
                const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: '#breadcrumb', pageScrollDuration : 200});
                this.pageScrollService.start(pageScrollInstance);
            });
        }

        onPage(evt) {
            this.scrollTop();
            this.page = evt;
            this.getResults();
        }

        onPriceTierChange(evt) {
            this.scrollTop();
            this.page = 1;
            this.priceTier = evt;
            this.getResults();
        }

        onSubcategoryFilter(evt) {
            this.scrollTop();
            this.page = 1;
            this.categoryFilter = evt;
            this.getResults();
        }

        onAvailabilityFilter(evt) {
            this.scrollTop();
            this.page = 1;
            this.customFilters = evt;
            this.getResults();
        }

        onFieldFilter(evt) {}

        onSortChange(evt) {
            this.scrollTop();
            this.page = 1;
            this.sortField = evt;
            this.getResults();
        }

        compareProducts() {
            this.router.navigate(['/compare-products', {p1: this.compareProductIds[0], p2: this.compareProductIds[1]}] );
        }

        addFeatureSet( featureName: string ) {

        }

        setCompareProductCount($event) {
            if ($event[0] === 0) {
                this.compareProductCount--;
                this.compareProductIds.splice(this.compareProductIds.indexOf($event[1]), 1);

            } else {
                this.compareProductCount++;
                this.compareProductIds.push($event[1]);

            }

        }

        reorderCategories( subCategories: Category[]) {
            for (let counter = 0; counter < subCategories.length; counter++) {
                const element = subCategories[counter];
                if (element.Apttus_Config2__Label__c === 'Air Filtration') {
                    this.reorderCatArr[0] = element;
                } else if (element.Apttus_Config2__Label__c === 'Fuel Filtration') {
                    this.reorderCatArr[1] = element;
                } else if (element.Apttus_Config2__Label__c === 'Lube Filtration') {
                    this.reorderCatArr[2] = element;
                } else if (element.Apttus_Config2__Label__c === 'Transmission Filtration') {
                    this.reorderCatArr[3] = element;
                } else if (element.Apttus_Config2__Label__c === 'Hydraulic Filtration') {
                    this.reorderCatArr[4] = element;
                } else if (element.Apttus_Config2__Label__c === 'Our Cooling Solutions') {
                    this.reorderCatArr[5] = element;
                } else if (element.Apttus_Config2__Label__c === 'Fluid Analysis') {
                    this.reorderCatArr[6] = element;
                }
            }

            return this.reorderCatArr;
        }

        getAccountName($event) {
            this.accountName = $event;
        }

    }
