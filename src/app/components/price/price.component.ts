import { Component,  SimpleChange, Input, ChangeDetectionStrategy,
          ChangeDetectorRef, OnChanges, OnDestroy, NgZone, OnInit } from '@angular/core';
import {PriceListItem, AccountService, PriceMatrix, StorefrontService, Storefront,
        PriceMatrixEntry, PriceListService} from '@apttus/ecommerce';
import { PriceForm } from '../../models/price-form.interface';

import { ForceService } from 'ng-salesforce';
import { Observable } from 'rxjs/Observable';
import { PSPLIService, PLIService} from './../../services/PSPLIService.service';
import * as _ from 'lodash';

@Component({
  selector: 'price',
  // changeDetection: ChangeDetectionStrategy.OnPush, *ngIf="!isloggedin || !contractPrice"
  template: `
  <span *ngIf="priceListItem">
    <span style="text-decoration:line-through" *ngIf="outputType != 'Discount' && contractPrice && isloggedin">{{_basePrice | localCurrency | async}}</span>
    <span *ngIf="outputType != 'Discount' && (!contractPrice || !isloggedin)">{{_basePrice | localCurrency | async}}</span>
    <!--<span *ngIf="outputType == 'Discount'">{{_yourPrice | localCurrency | async}}</span>-->
    <span *ngIf="contractPrice && isloggedin">{{_contractedPrice | localCurrency | async}}</span>
    <span class="text-muted text-sm" *ngIf="showUom">{{priceListItem.Apttus_Config2__PriceUom__c | translate}}</span>
  </span>
  `
})
export class PriceComponent implements OnChanges, OnDestroy, OnInit {
  @Input('size') size: string = 'lg';
  @Input('priceListItem') priceListItem: PriceListItem;
  @Input('showUom') showUom: boolean = false;
  @Input('priceForm') priceForm: PriceForm;
  @Input('outputType') outputType: 'Unit' | 'Savings' | 'Total' | 'Discount' = 'Total';
  @Input() accountName: string;

  _basePrice: number;
  _yourPrice: number;
  _contractedPrice: number;
  sub;
  contractPrice: PriceListItem;
  storefront: Storefront;
  contractPriceListId: string;
  isloggedin: boolean;
  constructor(private ngZone: NgZone, private forceService: ForceService, private priceListService: PriceListService,
    public psPLIService: PSPLIService, private storefrontService: StorefrontService, private priceListItemService: PLIService) {}

  ngOnInit() {
    this.isloggedin = this.forceService.isLoggedIn();
    if (this.priceListItem) {
      this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
        this.storefront = res;
         this.psPLIService.getContractPriceListId(this.accountName).subscribe(priceListId => this.ngZone.run(() => {
            this.contractPriceListId = priceListId;
             if (this.accountName === 'DF Clothing') {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          } else if (this.accountName === 'Anderson Clothing') {
              this.contractPriceListId = 'a1f6A000000OXNC';
          } else if (this.accountName === 'Cunningham Clothing') {
              this.contractPriceListId = 'a1f6A000000OXd8';
          } else if (this.accountName === 'Baker Clothing') {
              this.contractPriceListId = 'a1f6A000000OXOj';
          } else if (this.contractPriceListId === 'None') {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          } else {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          }



            this.priceListItemService.getContractPriceListItemByCode(this.priceListItem.Apttus_Config2__ProductId__c, this.contractPriceListId)
             .subscribe(pli => this.ngZone.run(() => {
                this.contractPrice = pli;
                 this._contractedPrice =  this.contractPrice.Apttus_Config2__ListPrice__c;
             }));

         }));

    }));
      this.sub = this.priceListService.getPriceList().subscribe(priceList => {
        this._yourPrice = this.priceListItem.Apttus_Config2__ContractPrice__c;
        this._basePrice = this.priceListItem.Apttus_Config2__ListPrice__c;
        this.calculateMatrices();
        if (priceList.Apttus_Config2__BasedOnAdjustmentType__c && priceList.Apttus_Config2__BasedOnAdjustmentAmount__c)
          this.calculateDiscount(priceList.Apttus_Config2__BasedOnAdjustmentType__c, priceList.Apttus_Config2__BasedOnAdjustmentAmount__c );
      });
    }
  }
  ngOnChanges(changes:  {[propKey:  string]:  SimpleChange} ) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.priceListItem && changes['accountName']) {
      this.accountName = changes['accountName'].currentValue;
      this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
        this.storefront = res;
         this.psPLIService.getContractPriceListId(this.accountName).subscribe(priceListId => this.ngZone.run(() => {
            this.contractPriceListId = priceListId;
             if (this.accountName === 'DF Clothing') {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          } else if (this.accountName === 'Anderson Clothing') {
              this.contractPriceListId = 'a1f6A000000OXNC';
          } else if (this.accountName === 'Cunningham Clothing') {
              this.contractPriceListId = 'a1f6A000000OXd8';
          } else if (this.accountName === 'Baker Clothing') {
              this.contractPriceListId = 'a1f6A000000OXOj';
          } else if (this.contractPriceListId === 'None') {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          } else {
              this.contractPriceListId = this.storefront.APTSMD_Contract_Price_List__r.Id;
          }

             this.priceListItemService.getContractPriceListItemByCode(this.priceListItem.Apttus_Config2__ProductId__c, this.contractPriceListId)
             .subscribe(pli => this.ngZone.run(() => {
                this.contractPrice = pli;
                 this._contractedPrice =  this.contractPrice.Apttus_Config2__ListPrice__c;
                 console.log('>>>>>> _contractedPrice  : ' + this._contractedPrice);
             }));

         }));

    }));
      this.sub = this.priceListService.getPriceList().subscribe(priceList => {
        this._yourPrice = this.priceListItem.Apttus_Config2__ContractPrice__c;
        this._basePrice = this.priceListItem.Apttus_Config2__ListPrice__c;
        this.calculateMatrices();
        if (priceList.Apttus_Config2__BasedOnAdjustmentType__c && priceList.Apttus_Config2__BasedOnAdjustmentAmount__c)
          this.calculateDiscount(priceList.Apttus_Config2__BasedOnAdjustmentType__c, priceList.Apttus_Config2__BasedOnAdjustmentAmount__c );
      });
    }
  }

  private calculateDiscount(adjustmentType: string, adjustmentAmount: number): void {
    const baseAmount = (this.priceListItem.Apttus_Config2__ContractPrice__c) ? this.priceListItem.Apttus_Config2__ContractPrice__c : this.priceListItem.Apttus_Config2__ListPrice__c;
    this._basePrice = baseAmount;
    this._yourPrice = this.adjustValue(adjustmentAmount, adjustmentType, baseAmount);
  }

  private calculateMatrices() {
    if (this.priceForm) {


      const originalPrice = this._basePrice;

      if (_.get(this.priceForm, 'priceMatrices[0].Apttus_Config2__MatrixEntries__r.records')) {
        const sortedDimensions = this.priceForm.priceMatrices.sort((n1, n2) => n1.Apttus_Config2__Sequence__c - n2.Apttus_Config2__Sequence__c);

        for (const matrix of sortedDimensions) {
          let previousValue = 0;
          for (const matrixEntry of matrix.Apttus_Config2__MatrixEntries__r.records) {
            let validEntry: boolean = false;
            for (let i = 1; i <= 6; i++) {
              const prefix = 'Apttus_Config2__Dimension' + i;

              if (_.get(matrix, prefix  + 'Id__r.Apttus_Config2__ContextType__c')) {
                if (_.get(matrix, prefix + 'Id__r.Apttus_Config2__ContextType__c') === 'Product Attribute') {
                  for (const attributeValue of this.priceForm.attributeValueList) {
                    if (attributeValue.hasOwnProperty(_.get(matrix, prefix + 'Id__r.Apttus_Config2__Datasource__c'))) {
                      const attrValue = _.get(attributeValue, _.get(matrix, prefix + 'Id__r.Apttus_Config2__Datasource__c'));
                      const attrType = _.get(matrix, prefix + 'ValueType__c');
                      validEntry = this.validateMatrixEntry(attrType, attrValue, _.get(matrixEntry, prefix + 'Value__c'), previousValue);
                      previousValue = attrValue;
                    }
                  }
                } else if (_.get(matrix, prefix + 'Id__r.Apttus_Config2__ContextType__c') === 'Line Item' || _.get(matrix, prefix + 'Id__r.Apttus_Config2__ContextType__c') === 'Order Line Item') {
                  const attrValue = this.priceForm.quantity;
                  const attrType = _.get(matrix, prefix + 'ValueType__c');
                  validEntry = this.validateMatrixEntry(attrType, attrValue, _.get(matrixEntry, prefix + 'Value__c'), previousValue);
                  previousValue = attrValue;
                }
              }
              if (!validEntry)
                break;
            }

            if (validEntry) {
              this._basePrice = this.adjustValue(_.get(matrixEntry, 'Apttus_Config2__AdjustmentAmount__c'), _.get(matrixEntry, 'Apttus_Config2__AdjustmentType__c'), this._basePrice);
            }
          }
          if (matrix.Apttus_Config2__StopProcessingMoreMatrices__c) {
            break;
          }
        }
      }

      if (this.priceForm.quantity) {
        this._yourPrice = this._yourPrice * this.priceForm.quantity;
        this._basePrice = this._basePrice * this.priceForm.quantity;
      }

      if (this.outputType === 'Savings')
        this._basePrice = originalPrice - this._basePrice;
      else if (this.outputType === 'Unit')
        this._basePrice = this._basePrice / this.priceForm.quantity;
    }
  }


  private validateMatrixEntry(attrType: string, attrValue: number, expectedValue: number, previousValue: number): boolean {
    if (attrType === 'Discrete')
      return attrValue === expectedValue;
    else if (attrType === 'Range')
      return attrValue >= previousValue && attrValue <= expectedValue;
    else if (attrType === 'Cumulative Range')
      return attrValue >= previousValue;
    else
      return false;
  }

  private adjustValue(adjustmentAmount: number, adjustmentType: string, amount: number): number {
    adjustmentAmount = (isNaN(adjustmentAmount)) ? 0 : adjustmentAmount;
    let val = amount;
    if (adjustmentType === PriceComponent.ADJ_TYPE_PER_DISCOUNT)
      val = amount * ( 1 - (adjustmentAmount / 100));
    else if (adjustmentType === PriceComponent.ADJ_TYPE_DISCOUNT_AMOUNT)
      val = amount - adjustmentAmount;
    else if (adjustmentType === PriceComponent.ADJ_TYPE_PER_MARKUP)
      val = amount * (1 + (adjustmentAmount / 100));
    else if (adjustmentType === PriceComponent.ADJ_TYPE_MARKUP_AMT)
      val = amount + adjustmentAmount;
    else if (adjustmentType === PriceComponent.ADJ_TYPE_PRICE_FACTOR)
      val = amount / adjustmentAmount;
    else if (adjustmentType === PriceComponent.ADJ_TYPE_LIST_PRICE_OVERRIDE)
      val = adjustmentAmount;

    return val;
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  private static ADJ_TYPE_PER_DISCOUNT = '% Discount';
  private static ADJ_TYPE_DISCOUNT_AMOUNT = 'Discount Amount';
  private static ADJ_TYPE_PER_MARKUP = '% Markup';
  private static ADJ_TYPE_MARKUP_AMT = 'Markup Amount';
  private static ADJ_TYPE_PRICE_FACTOR = 'Price Factor';
  private static ADJ_TYPE_LIST_PRICE_OVERRIDE = 'List Price Override';

  private static FREQUENCY = {
    'Hourly' : 'Per Hour',
    'Daily' : 'Per Day',
    'Weekly' : 'Per Week',
    'Monthly' : 'Per Month',
    'Quarterly' : 'Per Quarter',
    'Half Yearly' : 'Per Half Year',
    'Yearly' : 'Per Year'
  };
}
