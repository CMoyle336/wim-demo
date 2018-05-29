import { Component, OnChanges, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductAttribute, Product, CartService, PriceMatrix, ProductAttributeValue } from '@apttus/ecommerce';
import { PriceForm } from '../../../../models/price-form.interface';
import { PSComunication } from './../../../../services/psCommunication.service';

@Component({
    selector: 'product-details-attribute-groups',
    templateUrl: './attribute-groups.component.html'
})
export class AttributeGroupsComponent implements OnChanges, OnDestroy {
    @Input() productAttributes: Array<ProductAttribute>;
    @Input() product: Product;
    @Input() priceMatrices: Array<PriceMatrix>;
    loading: boolean = false;
    priceForm: PriceForm;
    frequency: string;
    sub: any;
    constructor(private cartService: CartService, private cd: ChangeDetectorRef, private psCommunication: PSComunication) { }

    ngOnChanges() {
        this.priceForm = {
            quantity : 1,
            priceMatrices : this.priceMatrices,
            attributeValueList : [new ProductAttributeValue()]

        };

    }

    formChange(color) {
       this.priceForm = Object.assign({}, this.priceForm);
        console.log(color);
        if (color === 'Black') {
            this.psCommunication.setProductColor(5);
        } else if (color === 'White') {
            this.psCommunication.setProductColor(1);
        } else if (color === 'Navy') {
            this.psCommunication.setProductColor(2);
        } else if (color === 'Gray') {
            this.psCommunication.setProductColor(3);
        } else if (color === 'Green') {
            this.psCommunication.setProductColor(0);
        } else if (color === 'Blue') {
            this.psCommunication.setProductColor(4);
        }

    }

    ngOnDestroy() {
        if (this.sub)
            this.sub.unsubscribe();
    }

}
