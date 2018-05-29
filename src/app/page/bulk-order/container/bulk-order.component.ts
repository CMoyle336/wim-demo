import { Component, OnInit, NgZone } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ProductService, User, UserService, Product, CartService, StorefrontService, Storefront, PriceListService, PriceListItem } from '@apttus/ecommerce';
import { SObject, SObjectService } from 'ng-salesforce';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.scss']

})

export class BulkOrderComponent implements OnInit {
  pageTitle = 'Bulk Order';
  public files: UploadFile[] = [];
  public currProduct: Product;
  public storefront: Storefront;
  public user: User;
  constructor(private papa: PapaParseService,
    private productService: ProductService,
    private storefrontService: StorefrontService,
    private pricelistservice: PriceListService,
    private cartService: CartService,
    private ngZone: NgZone,
    private userService: UserService) {
    }

  ngOnInit() {
     this.storefrontService.getStorefront().subscribe(res => this.ngZone.run(() => {
        this.storefront = res;
      }));
      this.userService.me().subscribe(res => this.ngZone.run(() => {
        this.user = res;
      }));
      console.log(this.user);
  }


  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.papa.parse(file, {
            complete: (results, n) => {
              for (let headCounter = 1; headCounter < results.data.length; headCounter++) {
                const productCode = results.data[headCounter][1];
                let qty =  results.data[headCounter][3];
                if (productCode !== undefined && productCode !== 'ProductCode' && productCode !== '') {
                    this.productService.getProductByCode(productCode)
                    .subscribe(res => {
                          this.currProduct =  res;
                          if (qty === undefined || qty === 'Quantity') {
                            qty =  1;
                          }
                        this.cartService.addProductToCart(this.currProduct,  qty,  true,  null,  true,  60000)
                        .take(1)
                        .subscribe();
                    });
                  }
                }
              }
            });

        });
      }
    }
  }


  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
