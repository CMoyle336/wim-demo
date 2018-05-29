import { OrderService, PriceListService, AccountService, CartService, UserService } from '@apttus/ecommerce';
import { SObjectService, SoapService } from 'ng-salesforce';
import { Cart, CartItem, Order, Quote } from '@apttus/ecommerce';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class PSQuoteService extends OrderService {

    convertCart = function () {
        return Observable.combineLatest(this.plService.getEffectivePriceListId(), this.accountService.getCurrentAccount(),
                                        this.userService.me(), this.cartService.getMyCart())
            .take(1)
            .flatMap(([priceListId, account, user, cart]) => {
                const order: Order = this.getInsance();
                order.Apttus_Config2__PriceListId__c = priceListId,
                order.Apttus_Config2__ShipToAccountId__c = account.Id;
                order.Apttus_Config2__BillToAccountId__c = account.Id;
                order.Apttus_Config2__PrimaryContactId__c = user.ContactId;
                order.Apttus_Config2__SoldToAccountId__c = account.Id;

                const quote = new Quote();
                quote.Apttus_QPConfig__PriceListId__c = priceListId;
                quote.Apttus_Proposal__Account__c = account.Id;
                quote.Apttus_Proposal__Proposal_Name__c = account.Name + ':' + user.LastName;
                quote.Apttus_QPConfig__AutoActivateOrder__c = true;
                quote.Apttus_QPConfig__BillToAccountId__c = account.Id;
                quote.Apttus_QPConfig__ShipToAccountId__c = account.Id;

                return this.quoteService.create([quote])
                    .map(res => res[0])
                    .flatMap(quoteId => {
                        order.Apttus_QPConfig__ProposalId__c = quoteId;
                        order.Apttus_Config2__PrimaryContactId__c = user.ContactId;
                        order.Apttus_Config2__OrderDate__c = new Date();
                        order.Apttus_Config2__SoldToAccountId__c = account.Id;
                        order.Apttus_Config2__BillToAccountId__c = account.Id;
                        order.Apttus_Config2__PriceListId__c = priceListId;
                        order.Apttus_Config2__ShipToAccountId__c = account.Id;
                        order.Apttus_Config2__Source__c = 'Account';

                        return this.create([order])
                            .map(res => res[0])
                            .flatMap(orderId => {
                                cart.Apttus_Config2__OrderId__c = orderId;
                                cart.Apttus_QPConfig__Proposald__c = quoteId;
                                cart.Apttus_Config2__Status__c = 'Finalized';
                                cart.Apttus_Config2__BusinessObjectId__c = quoteId;
                                cart.Apttus_Config2__BusinessObjectRefId__c = quoteId;
                                cart.Apttus_Config2__BusinessObjectType__c = 'Proposal';

                                return this.cartService.update([cart])
                                    .flatMap(() =>
                                        Observable.zip(this.soapService.doRequest('Apttus_CPQApi/CPQWebService', 'synchronizeCart', { request: { 'CartId': cart.Id } }),
                                                              this.soapService.doRequest('Apttus_Config2/OrderWebService', 'acceptOrder', { request: { 'OrderId': orderId } }),
                                                              this.cacheService.update('cart'))
                                    )
                                    .flatMap(() => this.get([orderId]))
                                    .map(res => res[0]);
                            });
                    });
            });
        };


    // getProposalLineItem = function(quoteId) : Observable<any>  {
    //     var _this = this;
    //     return _this.forceService.query("Select Apttus_QPConfig__Quantity2__c,Apttus_Proposal__Proposal__c,
    //              Apttus_Proposal__Product__c from Apttus_Proposal__Proposal_Line_Item__c Where Apttus_Proposal__Proposal__c = '" + quoteId + "'");
    // }
    // getFleetInfo = function() : Observable<any>  {
    //     var _this = this;
    //     return _this.forceService.query("Select Vehicle_Type__c,Manufacturer__c,Model__c,Make__c from Fleet_Information__c");
    // }
    // getWishList = function(userId:string) : Observable<any>  {
    //     var _this = this;
    //     console.log('userId :  >>>>>> ' + userId);
    //     return _this.forceService.query("Select Product__c,Product__r.Name,Product__r.APTSCU_Availability__c,
    //              Product__r.APTSCU_Earliest_Availability_Date__c from Wish_List__c where CreatedbyId = '" + userId + "'");
    // }
}
