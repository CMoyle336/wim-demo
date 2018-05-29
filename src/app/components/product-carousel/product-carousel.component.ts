import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Product } from '@apttus/ecommerce';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html'
})
export class ProductCarouselComponent implements OnChanges {
  @Input() productList: Array<Product>;
  ready: boolean = false;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    for (let i = this.productList.length; i <= 5; i++) {
      this.productList.push(new Product());
    }
    this.ready = false;
    setTimeout(() => {
      this.ready = true;
      this.cdr.markForCheck();
    });

  }

}
