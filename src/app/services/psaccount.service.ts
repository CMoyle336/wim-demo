import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account, AccountService } from '@apttus/ecommerce';

@Injectable()
export class PSAccountService extends AccountService {

  getCurrentAccount(): Observable<Account> {
    return this.get(['0011I000005mtWh']).map( accounts => accounts[0]);
  }

  getMyAccount(): Observable<Account> {
    return this.getCurrentAccount();
  }
}
