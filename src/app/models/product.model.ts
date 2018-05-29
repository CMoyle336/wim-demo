import { Product } from '@apttus/ecommerce';
import { SObjectModel } from 'ng-salesforce';

@SObjectModel({name : 'Product2'})
export class PSProduct extends Product {
    public APTSCU_Rating__c: string = null;
    public APTSCU_Availability__c: string = null;
}
