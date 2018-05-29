import { Injectable } from '@angular/core';
import { SObjectService, SObjectType } from 'ng-salesforce';
import { UserService } from '@apttus/ecommerce';
import { WishList } from '../models/wish-list.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn : 'root'
})
@SObjectType(WishList)
export class WishListService extends SObjectService {
    getWishList(): Observable<WishList> {
        const userService = this.injector.get(UserService);
        return userService.me().flatMap(user => this.where(`CreatedById = '` + user.Id + `'`)).map(res => res[0]);
    }
}
