import { Properties } from './resources/properties';
import { Inspections } from './resources/inspections';
import { InspectionAreas } from './resources/inspection-areas';
import { InspectionItems } from './resources/inspection-items';
import { InspectionElements } from './resources/inspection-elements';
import { Defects } from './resources/defects';
import { MeterReadings } from './resources/meter-readings';
import { KeysFobs } from './resources/keys-fobs';
import { Compliance } from './resources/compliance';
import { ComplianceForms } from './resources/compliance-forms';
import { InspectionAi } from './resources/inspection-ai';
import { PropertyTemplates } from './resources/property-templates';
import { Components } from './resources/components';
import { UserResource } from './resources/user';
import { AddressLookup } from './resources/address-lookup';
import { StatsResource } from './resources/stats';
import { Phrases } from './resources/phrases';
import { Modifiers } from './resources/modifiers';
import { Scheduler } from './resources/scheduler';
export interface InventoraiClientOptions {
    apiToken: string;
    baseURL?: string;
}
export declare class InventoraiClient {
    private httpClient;
    properties: Properties;
    inspections: Inspections;
    inspectionAreas: InspectionAreas;
    inspectionItems: InspectionItems;
    inspectionElements: InspectionElements;
    defects: Defects;
    meterReadings: MeterReadings;
    keysFobs: KeysFobs;
    compliance: Compliance;
    complianceForms: ComplianceForms;
    inspectionAi: InspectionAi;
    propertyTemplates: PropertyTemplates;
    components: Components;
    user: UserResource;
    addressLookup: AddressLookup;
    stats: StatsResource;
    phrases: Phrases;
    modifiers: Modifiers;
    scheduler: Scheduler;
    constructor(options: InventoraiClientOptions);
}
//# sourceMappingURL=client.d.ts.map