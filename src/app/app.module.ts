import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SalesforceModule } from 'ng-salesforce';
import { Configuration } from './salesforce.config';
import { CommerceModule } from '@apttus/ecommerce';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentModule } from './components/component.module';
import { PSOrderService } from './services/psorder.service';
import { PSCartService } from './services/pscart.service';
import { PSQuoteService } from './services/psquote.service';
import { ExcelService } from './services/ExcelService.service';
import { PSPLIService } from './services/PSPLIService.service';
import { PSComunication } from './services/psCommunication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StarRatingModule } from 'angular-star-rating';

export function _window(): any {
  // return the global native browser window object
  return window;
}

export function createTranslateLoader(http: HttpClient) {
  let url = './assets/i18n/';
  if (_window().sv !== undefined) {
    url = _window().sv.resource + '/assets/i18n/';
  }
  return new TranslateHttpLoader(http, url, '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentModule,
    SalesforceModule.forRoot(Configuration),
    CommerceModule.forRoot('Activ'),
    NgbModule.forRoot(),
    StarRatingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
