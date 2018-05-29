import { SObject, SObjectService, SObjectModel, SObjectType } from 'ng-salesforce';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@SObjectModel({name : 'APTSMD_Product_Review__c'})
export class ProductReview extends SObject {
    APTSMD_Compare_Products_Show__c: boolean = null;
    APTSMD_Product__c: string = null;
    APTSMD_Rating__c: string = null;
    APTSMD_Recommend_this_Product__c: boolean = null;
    APTSMD_Review__c: string = null;
    APTSMD_Reviewed_By__c: string = null;
    APTSMD_Reviewed_On__c: Date = null;
    _name = 'APTSMD_Product_Review__c';
}

@Injectable()
@SObjectType(ProductReview)
export class ProductReviewService extends SObjectService {}
