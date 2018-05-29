import { Component, OnInit, NgZone , Injectable, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { CartService, Cart, UserService, User, Order, OrderService, StorefrontService, Storefront, Quote,
        QuoteService, Contact, ContactService, PriceList, PriceListService, AccountService, ProductService} from '@apttus/ecommerce';
import { ChildRecord } from 'ng-salesforce';
import { DomSanitizer } from '@angular/platform-browser';
import {PSQuoteService} from './../../../services/psquote.service';
import { Observable } from 'rxjs/Observable';
import { ExcelService } from './../../../services/ExcelService.service';
import {ORDERS , OrderExportModel} from './../../../models/OrderExportModel.model';
import { PapaParseService } from 'ngx-papaparse';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';

declare var jsPDF: any;

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls : ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    user: User;
    myOrders: Array<Order>;
    pageTitle = 'Recent Orders';
    orderLineItem: any;
    public storefront: Storefront;
    closeResult: string;
    public orderExport = new OrderExportModel();
    public OrderLineItemChildRecs: ChildRecord;
    order: Order;
    constructor( private cartService: CartService,
        private ngZone: NgZone,
        private sanitizer: DomSanitizer,
        private userService: UserService,
        private orderService: OrderService,
        private storefrontService: StorefrontService,
        public psQuoteService: PSQuoteService,
        private quoteService: QuoteService,
        private productService: ProductService,
        private router: Router,
        private excelService: ExcelService,
        private papa: PapaParseService,
        private modalService: NgbModal
        ) {

    }

    ngOnInit() {
        this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
            this.storefront = res;
        }));

        this.orderService.getMyOrders(null, 90)
             .subscribe(res => this.ngZone.run(() => {
                    this.myOrders = res;
                    console.log(this.myOrders);
            }));
    }

    reOrder(order) {
        console.log(order);
        this.orderLineItem = order.Apttus_Config2__OrderLineItems__r;
        if (this.orderLineItem != null && this.orderLineItem.records.length > 0 ) {
            this.orderLineItem.records.forEach(lineItem => {
                this.productService.get([lineItem.Apttus_Config2__ProductId__c])
                .map(res => res[0])
                .filter(product => product != null)
                .subscribe(product => this.ngZone.run(() =>
                    this.cartService.addProductToCart(product, lineItem.Apttus_Config2__Quantity__c, true, null, true, 60000)
                    .take(1)
                    .subscribe()

                ));
            });
        }
        this.router.navigate(['/cart']);
    }
    cancelOrder() {

        this.order.Apttus_Config2__Status__c = 'Cancelled';
        const orderLineItesm: ChildRecord = this.order.Apttus_Config2__OrderLineItems__r;
        for (let counter = 0; counter < orderLineItesm.records.length; counter++) {
            orderLineItesm.records[counter].Apttus_Config2__LineStatus__c = 'Cancelled';
        }
        console.log(this.order);
        this.orderService.update(Array<Order>(this.order)).subscribe((res: any[]) => {
            if (res) {
                console.log(res);
            }
        });


    }
    exportToCSV( order ) {
        if ( order.Apttus_Config2__OrderLineItems__r) {
            const orderLineItesm: ChildRecord = order.Apttus_Config2__OrderLineItems__r;
            const orderLineRecArr = [];
            if (orderLineItesm != null) {
            for (let counter = 0; counter < orderLineItesm.records.length; counter++) {
                orderLineRecArr[counter] = [];
                orderLineRecArr[counter][0] =  orderLineItesm.records[counter].Apttus_Config2__Description__c;
                orderLineRecArr[counter][1] =  orderLineItesm.records[counter].APTSCU_Product_Code__c;
                orderLineRecArr[counter][2] = orderLineItesm.records[counter].Apttus_Config2__LineType__c;
                orderLineRecArr[counter][3] = orderLineItesm.records[counter].Apttus_Config2__Quantity__c;
                orderLineRecArr[counter][4] = '$ ' + orderLineItesm.records[counter].Apttus_Config2__NetPrice__c;
            }
            const csv = this.papa.unparse({
                fields: ['Product Name', 'Product Code', 'Line Type', 'Quantity', 'Price'],
                data: orderLineRecArr
            } );

            const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
            const csvURL = window.URL.createObjectURL(csvData);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', order.Name + '.csv');
            tempLink.click();
            }
        }
    }

    exportToExcel(order) {
        this.orderExport.Account = order.Apttus_Config2__BillToAccountId__r.Name;
        this.orderExport.Number = order.Name;
        this.orderExport.Contact = order.Apttus_Config2__PrimaryContactId__r.FirstName + ' ' + order.Apttus_Config2__PrimaryContactId__r.LastName;
        this.orderExport.Status = order.Apttus_Config2__Status__c;
        this.orderExport.Total = '$ ' + order.Total_Order_Amount__c;
        ORDERS.push(this.orderExport);

        this.excelService.exportAsExcelFile(ORDERS, order.Apttus_Config2__OrderLineItems__r , 'order');
      }

      downloadPDF(order) {
        console.log(order);
        const doc = new jsPDF();
            // tslint:disable-next-line:max-line-length
            const imgData = 'data:image/png;base64,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';
            doc.addImage(imgData, 'png', 20, 18, 18, 10);
            doc.setFont('times');
            doc.setFontType('bold');
            doc.setFontSize(16);
            doc.text('Order Details ', 150, 25);
            doc.setLineWidth(1);
            doc.line(20, 30, 185, 30);
            doc.setLineWidth(0.2);

            doc.setFont('times');
            doc.setFontType('bold');
            doc.setFontSize(12);
            doc.text('Order Summary ', 30, 40);
            doc.setFont('times');
            doc.setFontType('normal');
            doc.setFontSize(10);
            doc.text('Name : ' + order.Name, 30, 45);
            // doc.text("Date : "+order.CreatedDate ,30,50);
            doc.text('Total : $' + order.Total_Order_Amount__c, 30, 50);
            doc.text('Shipping Charge : $' + order.APTSMD_Shipping_Charges__c, 30, 55);
            doc.text('Grand Total : $' + (order.Total_Order_Amount__c + order.APTSMD_Shipping_Charges__c), 30, 60);

            doc.setFont('times');
            doc.setFontType('bold');
            doc.setFontSize(12);
            doc.text('Billing Address ', 145, 40);
            doc.setFont('times');
            doc.setFontType('normal');
            doc.setFontSize(10);
            doc.text(order.Apttus_Config2__BillToAccountId__r.Name + ',', 145, 45);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingStreet + ',', 145, 50);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingCity + ',', 145, 55);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingState + ',', 145, 60);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingCountry + ',', 145, 65);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingPostalCode, 145, 70);

            doc.setFont('times');
            doc.setFontType('bold');
            doc.setFontSize(12);
            doc.text('Shipping Address ', 145, 80);
            doc.setFont('times');
            doc.setFontType('normal');
            doc.setFontSize(10);
            doc.text(order.Apttus_Config2__BillToAccountId__r.Name + ',', 145, 85);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingStreet + ',', 145, 90);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingCity + ',', 145, 95);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingState + ',', 145, 100);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingCountry + ',', 145, 105);
            doc.text(order.Apttus_Config2__BillToAccountId__r.BillingPostalCode, 145, 110);
            let htmlContent = '<table>';
            if (order.Apttus_Config2__OrderLineItems__r != null) {
                this.OrderLineItemChildRecs = order.Apttus_Config2__OrderLineItems__r;
                htmlContent = htmlContent + '<th>Product</th>';
                htmlContent = htmlContent + '<th>Quantity</th>';
                htmlContent = htmlContent + '<th>Price</th>';
                for (let counter = 0; counter < this.OrderLineItemChildRecs.records.length; counter++) {
                    if (this.OrderLineItemChildRecs.records.length > counter) {
                        htmlContent = htmlContent + '<tr>';
                    }
                    htmlContent = htmlContent + '<td>' + this.OrderLineItemChildRecs.records[counter].Apttus_Config2__Description__c + '</td>';
                    htmlContent = htmlContent + '<td>' + this.OrderLineItemChildRecs.records[counter].Apttus_Config2__Quantity__c + '</td>';
                    htmlContent = htmlContent + '<td>$' + this.OrderLineItemChildRecs.records[counter].Apttus_Config2__NetPrice__c + '</td>';
                    if (counter > 0) {
                        htmlContent = htmlContent + '</tr>';
                    }
                }
                htmlContent = htmlContent + '</table>';

            }
            console.log('\n\n\nHTML Content: ' + htmlContent);
            doc.fromHTML(htmlContent, 30, 115, {
                'width': 10,
                'height' : 100
            });
            doc.setLineWidth(1);
            doc.line(20, 280, 185, 280);
            doc.setLineWidth(0.2);
            doc.setFont('times');
            doc.setFontType('normal');
            doc.setFontSize(10);
            doc.text('Page 1 Of 1', 170, 285);
            doc.save('Order_' + order.Name.replace('-', '_') + '.pdf');
      }

      open(content, orderObj) {
        this.order = orderObj;
        this.modalService.open(content, {size : 'sm' } ).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

    }
