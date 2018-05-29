import { Component, OnInit, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { User, UserService, StorefrontService, Storefront } from '@apttus/ecommerce';


@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {

    @Input() breadPageTitle: string;
    user: User;
    storefront: Storefront;

    constructor( private userService: UserService, 
        private ngZone: NgZone, 
        private storefrontService: StorefrontService) {}

    ngOnInit() {
        this.userService.me().subscribe(res => this.ngZone.run(() => {
            this.user = res;
        }));

        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res; 
        }));

    }
}
