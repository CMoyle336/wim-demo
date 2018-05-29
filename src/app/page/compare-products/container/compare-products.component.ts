import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product , ProductService } from '@apttus/ecommerce';
import { ChildRecord } from 'ng-salesforce';

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss']
})
export class CompareProductsComponent implements OnInit {

  pageTitle = 'Compare Products';
  public product1: Product;
  public product2: Product;
  public product1FeatureSetValues: ChildRecord;
  public product2FeatureSetValues: ChildRecord;
  public productFeatureSetArr: string[];
  public product1FeatureSetValuesArr: string[];
  public product2FeatureSetValuesArr: string[];
  public lastAddedIndex: number;
  public showLoadingScreen: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private productService: ProductService,
    private router: Router
  ) {
    this.productFeatureSetArr = [];
    this.product1FeatureSetValuesArr = [];
    this.product2FeatureSetValuesArr = [];

    for (let index = 0; index < 20; index++) {

      this.productFeatureSetArr[index] = ' ';
      this.product1FeatureSetValuesArr[index] = ' ';
      this.product2FeatureSetValuesArr[index] = ' ';
      this.lastAddedIndex = 0;
      this.showLoadingScreen = true;
    }


  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['p1']) {
        console.log('P1' , params['p1']);
      }

      this.productService.get( [ params['p1'] ])
        .map(res => res[0])
        .filter(product => product != null)
        .subscribe(product => this.ngZone.run(() => {
            this.product1 = product;
            console.log(this.product1);
            if ( this.product1.Apttus_Config2__ProductFeatureValues__r == null) {
                alert('No FeatureSetValues');
            } else {
                this.product1FeatureSetValues = this.product1.Apttus_Config2__ProductFeatureValues__r;

                for (let counter = 0; counter < this.product1FeatureSetValues.records.length; counter++) {
                  this.product1FeatureSetValuesArr[counter] = this.product1FeatureSetValues.records[counter].Apttus_Config2__Value__c;
                  this.productFeatureSetArr[counter] = this.product1FeatureSetValues.records[counter].Apttus_Config2__FeatureId__r.Name;
                  this.lastAddedIndex = counter;
                }
                  // Call for Product 2
                    this.productService.get( [ params['p2'] ])
                    .map(res => res[0])
                    .filter(p => p != null)
                    .subscribe(p => this.ngZone.run(() => {
                        this.product2 = p;
                        if ( this.product2.Apttus_Config2__ProductFeatureValues__r == null) {
                            alert('No FeatureSetValues for Product 2');
                        } else {
                            this.product2FeatureSetValues = this.product2.Apttus_Config2__ProductFeatureValues__r;
                            for (let counter3 = 0; counter3 < this.product2FeatureSetValues.records.length; counter3++) {


                              if ( this.productFeatureSetArr.indexOf(this.product2FeatureSetValues.records[counter3].Apttus_Config2__FeatureId__r.Name) > -1 ) {
                                this.product2FeatureSetValuesArr[this.productFeatureSetArr.indexOf(this.product2FeatureSetValues.records[counter3].Apttus_Config2__FeatureId__r.Name)] =
                                this.product2FeatureSetValues.records[counter3].Apttus_Config2__Value__c;
                              } else {
                                this.lastAddedIndex++;
                                this.productFeatureSetArr[this.lastAddedIndex] = this.product2FeatureSetValues.records[counter3].Apttus_Config2__FeatureId__r.Name;
                                this.product1FeatureSetValuesArr[this.lastAddedIndex] = '';
                                this.product2FeatureSetValuesArr[this.lastAddedIndex] = this.product2FeatureSetValues.records[counter3].Apttus_Config2__Value__c;

                              }
                            }

                        }
                        this.showLoadingScreen = false;
                    }));
         }

        }));


    });
  }


}
