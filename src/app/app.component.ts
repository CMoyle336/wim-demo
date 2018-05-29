import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '@apttus/ecommerce';
import { UserService } from '@apttus/ecommerce';
import { Observable } from 'rxjs/Observable';
import { StorefrontService, Storefront } from '@apttus/ecommerce';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="py-5">
    <router-outlet></router-outlet>
    </main>`
})
export class AppComponent implements OnInit {
  title = 'app';

  storefront: Storefront;
  constructor(translate: TranslateService,
    productService: ProductService,
    userService: UserService,
    private storefrontService: StorefrontService) {
    translate.setDefaultLang('en_US');
  }
  ngOnInit() {
    Observable.combineLatest(this.storefrontService.getStorefront())
      .subscribe(res => {
        this.storefront = res[0];
      });
  }
}
