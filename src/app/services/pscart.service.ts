import { OrderService, PriceListService, AccountService, CartService, UserService } from '@apttus/ecommerce';
import { SObjectService, CacheService, SoapService, SObjectType } from 'ng-salesforce';
import { Cart, CartItem, Order } from '@apttus/ecommerce';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PSCart } from '../models/pscart';

@Injectable()
@SObjectType(PSCart)
export class PSCartService extends CartService {


    applyPromotion(couponCode: string): Observable<void> {
        return this.getMyCart().take(1).flatMap(cart => {
            cart.Apttus_Config2__CouponCodes__c = couponCode;
            return this.update([cart]).flatMap(() => this.priceCart());
        });
    }

    getMyCart(): Observable<PSCart> {
        return super.getMyCart().map((cart: PSCart) => cart);
    }

    getAppliedPromotions(): Observable<string> {
        return this.getMyCart().map(cart => cart.Apttus_Config2__CouponCodes__c);
    }

}
