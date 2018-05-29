import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ProductService, Product, CartService, StorefrontService, Storefront, PriceListService, PriceListItem } from '@apttus/ecommerce';
import { SObjectService, ForceService } from 'ng-salesforce';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {PSQuoteService} from './../../../services/psquote.service';
import { FleetInfoService } from '../../../services/fleet-info.service';
import {FleetInfo} from './../../../models/FleetInfo.model';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import { FormsModule } from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


const vehicleType = ['Cars', 'Trucks', 'Ships', 'Trains'];
const manufacturer = ['Ford', 'Caterpillar', 'Chevrolet/GMC', 'Cummins', 'Fiat'];
const make = ['1090', '112', '120', '1500', '2500', '3500', 'Comfort Guard', '100C', '1100T', '1180DT', '1000', '2000', '3222'];
const model = ['Sedan', 'Cruiser', 'Yacht'];

@Component({
  selector: 'app-fleet-info',
  templateUrl: './fleet-info.component.html',
  styleUrls: ['./fleet-info.component.scss']
})



export class FleetInfoComponent implements OnInit {

    pageTitle = 'Customer Fleet Information';
    vehicleTypeVal: any;
    manufacturerVal: any;
    makeVal: any;
    modelVal: any;
    engineVal: any;
    engineSerialNumber: any;
    year: any;
    searchQuery: string;
    searchQuery2: string;
    fleets: any;
    fleetInfo: FleetInfo;

    @ViewChild('instance') instance: NgbTypeahead;
    @ViewChild('instance1') instance1: NgbTypeahead;
    @ViewChild('instance2') instance2: NgbTypeahead;
    @ViewChild('instance3') instance3: NgbTypeahead;


    focus$ = new Subject<string>();
    click$ = new Subject<string>();

  constructor(
    public psQuoteService: PSQuoteService,
    public sObjectService: SObjectService,
    public forceService: ForceService,
    private cartService: CartService,
    private ngZone: NgZone,
    private storefrontService: StorefrontService,
    private productService: ProductService,
    private fleetInfoService: FleetInfoService,
    private router: Router ) {

        this.fleetInfo = new FleetInfo();

        this.vehicleTypeVal = '';
        this.manufacturerVal = '';
        this.makeVal = '';
        this.modelVal = '';

  }

  vehicleTypeSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? vehicleType : vehicleType.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))

    manufacturerSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance1.isPopupOpen()))
      .map(term => (term === '' ? manufacturer : manufacturer.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))

    makeSearch = (text$: Observable<string>) =>
        text$
        .debounceTime(200).distinctUntilChanged()
        .merge(this.focus$)
        .merge(this.click$.filter(() => !this.instance2.isPopupOpen()))
        .map(term => (term === '' ? make : make.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    modelSearch = (text$: Observable<string>) =>
        text$
        .debounceTime(200).distinctUntilChanged()
        .merge(this.focus$)
        .merge(this.click$.filter(() => !this.instance3.isPopupOpen()))
        .map(term => (term === '' ? model : model.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))



  ngOnInit() {
      this.fleetInfoService.getFleetInfo().subscribe(res => this.ngZone.run(() => {
        this.fleets = res;
    }));
  }

  onSubmit(fleetNumber: number) {

    if (this.fleets[fleetNumber].Vehicle_Type__c)
        this.searchQuery = this.fleets[fleetNumber].Vehicle_Type__c;
    if (this.fleets[fleetNumber].Manufacturer__c)
        this.searchQuery = ' ' + this.searchQuery + ' AND ' + this.fleets[fleetNumber].Manufacturer__c;
    if (this.fleets[fleetNumber].Make__c)
        this.searchQuery = ' ' + this.searchQuery + ' AND ' + this.fleets[fleetNumber].Make__c;
    if (this.fleets[fleetNumber].Model__c)
        this.searchQuery = ' ' + this.searchQuery + ' AND ' + this.fleets[fleetNumber].Model__c;

    this.ngZone.run(() => this.router.navigate(['/search', this.searchQuery]));
}

    addFleetInfo = function() {
        this.fleetInfo.Vehicle_Type__c = this.vehicleTypeVal;
        this.fleetInfo.Manufacturer__c = this.manufacturerVal;
        this.fleetInfo.Make__c = this.makeVal;
        this.fleetInfo.Model__c = this.modelVal;
        this.forceService.create(this.fleetInfo._name, SObjectService.toJSON([this.fleetInfo])).map(function (res) {
        });

        this.ngZone.run(() => this.router.navigate(['/']));

    };
}
