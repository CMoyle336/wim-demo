import { OrderService, PriceListService, AccountService, CartService, UserService, Cart, CartItem, Order } from '@apttus/ecommerce';
import { SObjectType, SObjectModel } from 'ng-salesforce';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


export class PSOrder extends Order{
    APTSCU_Is_eComm_Order__c: boolean = null;
    APTSMD_Shipping_Charges__c: number = null;
}

@Injectable()
@SObjectType(PSOrder)
export class PSOrderService extends OrderService {

    createOrder(shippingCharge: number): Observable<Order> {

       const order: PSOrder = <PSOrder> this.getInstance();

      //  Observable.zip(_this.soapService.doRequest('Apttus_Approval/ApprovalsWebService', 'submitForApprovals', { request: { 'sObjectType' : 'Order','Id': 'a1Y1I000001AFR4' } })); 
        return Observable.combineLatest(this.priceListService.getEffectivePriceListId(), this.accountService.getCurrentAccount(), this.userService.me(), this.cartService.getMyCart())
            .take(1)
            .flatMap(([priceListId, account, user, cart]) => {

                order.Apttus_Config2__PriceListId__c = priceListId,
                order.Apttus_Config2__ShipToAccountId__c = account.Id;
                order.Apttus_Config2__BillToAccountId__c = account.Id;
                order.Apttus_Config2__PrimaryContactId__c = user.ContactId;
                order.Apttus_Config2__SoldToAccountId__c = account.Id;
                order.Apttus_Config2__OrderDate__c = new Date();
                order.Apttus_Config2__Source__c = 'Account';
                order.APTSCU_Is_eComm_Order__c = true;
                order.APTSMD_Shipping_Charges__c = shippingCharge;


                return this.create([order])
                    .map(res => res[0])
                    .flatMap(orderId => {
                        cart.Apttus_Config2__OrderId__c = orderId;
                        cart.Apttus_Config2__Status__c = 'Finalized';
                        cart.Apttus_Config2__BusinessObjectRefId__c = orderId;
                        cart.Apttus_Config2__BusinessObjectType__c = 'Order';
                        cart.Apttus_Config2__BusinessObjectId__c = orderId;
                        cart.Apttus_Config2__BusinessObjectRefId__c = orderId;
                        return this.cartService.update([cart])
                            .flatMap(() => this.cartService.priceCart())
                            .flatMap(() => this.get([orderId]))
                            .map(res => res[0])
                    });
        });
    }
}