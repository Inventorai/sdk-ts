export { InventoraiClient, InventoraiClientOptions } from './client';
export * from './types';
export * from './errors/api-error';

// Resource classes
export { Properties } from './resources/properties';
export { Inspections } from './resources/inspections';
export { InspectionAreas } from './resources/inspection-areas';
export { InspectionItems } from './resources/inspection-items';
export { InspectionElements } from './resources/inspection-elements';
export { Defects } from './resources/defects';
export { MeterReadings } from './resources/meter-readings';
export { AssetChecks } from './resources/asset-checks';
export { KeysFobs } from './resources/keys-fobs';
export { Compliance } from './resources/compliance';
export { ComplianceForms } from './resources/compliance-forms';
export { InspectionAi } from './resources/inspection-ai';
export { PropertyTemplates } from './resources/property-templates';
export { Branches } from './resources/branches';
export { Hmo, HmoTenantAssignment, HmoBulkAssignment } from './resources/hmo';
export { Components } from './resources/components';
export { AddressLookup } from './resources/address-lookup';
export { StatsResource } from './resources/stats';
export { Phrases } from './resources/phrases';
export { Modifiers } from './resources/modifiers';
export { Scheduler } from './resources/scheduler';
export { TeamResource } from './resources/team';
