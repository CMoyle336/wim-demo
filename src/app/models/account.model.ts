import { SObjectModel, SObjectType, SObjectService } from 'ng-salesforce';
import { Account, AccountService } from '@apttus/ecommerce';
import { Injectable } from '@angular/core';


@SObjectModel({name : 'Account'})
export class PSAccount extends Account {
    public APTSMD_Pricing_Agreement_Number__c: string = null;
}

@Injectable({
    providedIn : 'root'
})
@SObjectType(PSAccount)
export class PSAccountService extends AccountService {}
