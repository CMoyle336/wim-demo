import { SObject, SObjectModel } from 'ng-salesforce';

@SObjectModel({
    name : 'Wish_List__c'
})
export class WishList extends SObject {
    public Product__c: string;
}
