import { environment } from '../environments/environment';
            import { SalesforceConfig } from 'ng-salesforce';
            
            export const Configuration: SalesforceConfig = {
                instanceUrl: 'https://apttuscommunities-16242c6bc17.force.com',
                production: environment.production,
                organizationId: '00D6A000002jvOpUAI',
                defaultImageSrc: './'
            };