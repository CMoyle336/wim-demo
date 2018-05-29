import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { PriceTier, StorefrontService, Storefront  } from '@apttus/ecommerce';
import * as _ from 'lodash';

@Component({
    selector: 'pl-price-tier',
    template: `
    <section class="widget widget-colors">
        <h3 class="widget-title">Filter By {{title}}</h3>
        <ul>
            <li *ngFor="let tier of tierList; let i = index"
                [style.color]="tier?.minPrice == _selected?.minPrice ? storefront.APTSMD_Accent_Color__c : 'inherit'"
                >
                <a
                    (click)="selectPrice(tier)"
                    class="btn btn-link btn-sm py-1"
                    [class.disabled]="tier?.minPrice == _selected?.minPrice">
                    <span *ngIf="i == 0">{{'under' | translate}} {{(tier.maxPrice | formatCurrency | async)}}</span>
                    <span *ngIf="i > 0 && i < (tierList.length - 1)">{{(tier.minPrice | formatCurrency | async) }} {{'to' | translate}} {{ (tier.maxPrice | formatCurrency | async)}}</span>
                    <span *ngIf="i == (tierList.length - 1)">{{'over' | translate}} {{tier.minPrice | formatCurrency | async}}</span>
                </a>
            </li>
            <li>
                <a
                    *ngIf="_selected" (click)="clearFilters()"
                    class="btn btn-link btn-sm py-1 p-1"><i class="material-icons clear"></i>Clear Filters
                </a>
            </li>
        </ul>
    </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceTierComponent implements OnChanges, OnInit {
    @Input() data: any;
    @Input() tiers: number = 5;
    @Input() _selected: PriceTier;
    @Input() title: string = 'Price';
    @Output() priceChange: EventEmitter<PriceTier> = new EventEmitter<PriceTier>();
    storefront: Storefront;

    private points: Array<number> = [1, 10, 25, 50, 100, 1000, 10000, 100000, 1000000];
    public tierList: Array<PriceTier>;

    constructor(private cdr: ChangeDetectorRef,
        private storefrontService: StorefrontService,
        private ngZone: NgZone) {}

    selectPrice(tier: PriceTier) {
        this._selected = (this._selected && this._selected.minPrice === tier.minPrice) ? null : tier;
        this.cdr.markForCheck();
        this.priceChange.emit(this._selected);
    }

    clearFilters() {
        this.priceChange.emit(null);
    }

    ngOnChanges() {

        this.tierList = null;
        if (_.get(this.data, 'min_Apttus_Config2__ListPrice__c') != null && _.get(this.data, 'max_Apttus_Config2__ListPrice__c') != null
            && this.data.min_Apttus_Config2__ListPrice__c < this.data.max_Apttus_Config2__ListPrice__c) {

            this.tierList = new Array<PriceTier>();
            const min = this.data.min_Apttus_Config2__ListPrice__c;
            const max = this.data.max_Apttus_Config2__ListPrice__c;

            const step = ((max - min) / this.tiers);
            let tier = 1;
            for (const point of this.points) {
                if ((point * 2) > step) {
                    tier = point;
                    break;
                }
            }

            for (let x = 1; x <= this.tiers; x++) {
                if (x === 1)
                    this.tierList.push({minPrice : 0, maxPrice : tier});
                else if (x < (this.tiers)) {
                    const tierMin = (tier * (x - 1));
                    const tierMax = (tier * x);
                    this.tierList.push({minPrice : tierMin, maxPrice : tierMax});
                } else {
                    this.tierList.push({minPrice : (tier * (x - 1)), maxPrice : null});
                }
            }
        }
    }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));
    }

}
