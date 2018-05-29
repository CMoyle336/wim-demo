import { PriceListItemService, PriceList, PriceListItem } from '@apttus/ecommerce';
import { SObjectService, CacheService, SObjectType, ForceService} from 'ng-salesforce';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PSAccountService, PSAccount } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
@SObjectType(PriceList)
export class PSPLIService extends SObjectService {
    public account: Account;
    public selectedPriceListId: string;

    private aService = this.injector.get(PSAccountService);

    getContractPriceListId(accountName: string): Observable<string> {
        if (!accountName) {
            return this.aService
                .getCurrentAccount()
                .flatMap((account: PSAccount) => this.where(`Apttus_Config2__ContractNumber__c = '` + account.APTSMD_Pricing_Agreement_Number__c + `'`))
                .map(res => (res && res.length > 0) ? res[0].Id : null);
        } else {
            return this.aService
                .where(`Name = '` + accountName + `'`)
                .map(res => res[0])
                .flatMap((account: PSAccount) => this.where(`Apttus_Config2__ContractNumber__c = '` + account.APTSMD_Pricing_Agreement_Number__c + `'`))
                .map(res => res[0].Id);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
@SObjectType(PriceListItem)
export class PLIService extends SObjectService {
    public getContractPriceListItemByCode(productId: string, priceListId: string): Observable<PriceListItem> {
        return this.where(`Apttus_Config2__ProductId__c = '` + productId + `' AND Apttus_Config2__PriceListId__c = '` + priceListId + `'`).map(res => res[0]);
    }
}
