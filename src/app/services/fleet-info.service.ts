import { SObjectService, SObjectType } from 'ng-salesforce';
import { Injectable } from '@angular/core';
import { FleetInfo } from '../models/FleetInfo.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
@SObjectType(FleetInfo)
export class FleetInfoService extends SObjectService {
    getFleetInfo(): Observable<Array<FleetInfo>> {
        return this.where(`ID <> NULL`);
    }
}
