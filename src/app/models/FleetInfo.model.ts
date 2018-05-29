import { SObject, SObjectModel } from 'ng-salesforce';

@SObjectModel({
    name : 'Fleet_Information__c'
})
export  class FleetInfo extends SObject {
    public Vehicle_Type__c: String = null;
    public Manufacturer__c: String = null;
    public Model__c: String = null;
    public Make__c: Date = null;
}

export const FLEETINFOS: FleetInfo[] = [];
