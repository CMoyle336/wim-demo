import { ProductAttributeValue, PriceMatrix } from '@apttus/ecommerce';

export interface PriceForm {
    quantity: number;
    priceMatrices?: Array<PriceMatrix>;
    attributeValueList?: Array<ProductAttributeValue>;
}