import { Component, OnInit, NgZone  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StorefrontService, Storefront } from '@apttus/ecommerce';

import * as _ from 'lodash';

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
    pageTitle = 'Order Confirmation';
    orderId;
    storefront: Storefront;

    constructor( private route: ActivatedRoute, private storefrontService: StorefrontService, private ngZone: NgZone) {
        this.route.params.subscribe( params => this.orderId = params.id );
    }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

}
