import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService, Product, CategoryService, Category,
    ProductAttributeService, ProductAttribute, PriceMatrixService,
    PriceMatrix, ConstraintRuleService, ConstraintRule } from '@apttus/ecommerce';
import { ActivatedRoute } from '@angular/router';
import { ProductReviewService, ProductReview } from '../../../models/product-rating.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    product: Product;
    relatedProducts: Array<Product>;
    categoryList: Array<Category>;
    productAttributeList: Array<ProductAttribute>;
    priceMatrixData: Array<PriceMatrix>;
    productReviewList: Array<ProductReview>;
    includedProducts: Array<Product>;
    recommendedProducts: Array<Product>;

    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        private productAtributeService: ProductAttributeService,
        private productReviewService: ProductReviewService,
        private priceMatrixService: PriceMatrixService,
        private ngZone: NgZone,
        private constraintRuleService: ConstraintRuleService) { }

    ngOnInit() {
        this.route.params
        .filter(params => params['Id'] != null)
        .map(params => params['Id'])
        .flatMap(productId => this.productService.get([productId]))
        .map(res => res[0])
        .filter(product => product != null)
        .subscribe(product => this.ngZone.run(() => this.onProductLoad(product)));
    }

    onProductLoad(product: Product) {
        this.product = product;

        Observable.combineLatest(
            this.productService.getProductsByCategory(_.get(this.product, 'Apttus_Config2__Categories__r.records[0].Apttus_Config2__ClassificationId__r.Apttus_Config2__AncestorId__c')),
            this.categoryService.getCategoryBranchForProduct(this.product),
            this.priceMatrixService.getPriceMatrixData(this.product.Apttus_Config2__PriceLists__r.records[0]),

            Observable.if(() => product.Apttus_Config2__AttributeGroups__r != null,
                this.productAtributeService.getProductAttributes(product), Observable.of(null)),
                this.constraintRuleService.getProductsForContstraintRuleCondition(_.get(product, 'Apttus_Config2__ConstraintRuleConditions__r.records'), 'Recommendation'),
                this.constraintRuleService.getProductsForContstraintRuleCondition(_.get(product, 'Apttus_Config2__ConstraintRuleConditions__r.records'), 'Inclusion')
            ).subscribe(res => this.ngZone.run(() => {
                this.relatedProducts = res[0];
                this.categoryList = res[1];
                this.priceMatrixData = res[2];
                this.productAttributeList = res[3];
                this.recommendedProducts = res[4];
                this.includedProducts = res[5];
            }));
    }

}
