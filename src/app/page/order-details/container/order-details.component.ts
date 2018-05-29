import { Component, NgZone } from '@angular/core';
import { CartService, Cart, UserService, User, OrderService, Order} from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent {
    user: User;
    myOrders: Array<Order>;
    pageTitle = 'Order Details';
    orderId;

    constructor( private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private userService: UserService,
        private orderService: OrderService,
        private route: ActivatedRoute) {

        this.route.params.subscribe( params => this.orderId = params.id );

    }


}
