import { User, UserService } from '@apttus/ecommerce';
import { SObjectType } from 'ng-salesforce';
import { Injectable } from '@angular/core';

export class PSUser extends User {
    public User_Type__c: string = null;
}

@Injectable()
@SObjectType(PSUser)
export class PSUserService extends UserService {}
