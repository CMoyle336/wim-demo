// import { SObjectService, PriceListService, AccountService, SoapService, CartService, UserService } from '@apttus/ecommerce';
// import { Cart, CartItem, AccountLocation } from '@apttus/ecommerce';
// import { Observable } from 'rxjs/Rx';
// import { Injectable } from '@angular/core';

// @Injectable()

// export class PSAccountLocationService extends AccountService {

// 	createAccountLocation = function(): Observable<AccountLocation> {
// 		var accountLocation = new AccountLocation();

//         return Observable.combineLatest(this.accountService.getCurrentAccount())
//             .take(1)
//             .flatMap( aArray => {
//             var account = aArray[0];
//             accountLocation.Apttus_Config2__AccountId__c = account;
//             accountLocation.Name = input1,
//             accountLocation.Apttus_Config2__Type__c = 'Headquarters',
//             accountLocation.Apttus_Config2__Street__c = input2,
//             accountLocation.Apttus_Config2__City__c = input3,
//             accountLocation.Apttus_Config2__State__c = input4;

//             return this.create([accountLocation], null)
//                 .map(accountLocationArray => this.accountLocation = accountLocationArray[0])
//                 .flatMap( accountLocationId => {
//                         return this.forceService.query("Select Name from Apttus_Config2__AccountLocation__c Where Id = '" + accountLocationId + "'")
//                         .filter( res => {
//                             return res;
//                         });
//                 });
//         });
//     }
// }
