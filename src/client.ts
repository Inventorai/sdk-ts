import { HttpClient } from './http/client';
import { Properties } from './resources/properties';
import { Inspections } from './resources/inspections';
import { InspectionAreas } from './resources/inspection-areas';
import { InspectionItems } from './resources/inspection-items';
import { InspectionElements } from './resources/inspection-elements';
import { Defects } from './resources/defects';
import { MeterReadings } from './resources/meter-readings';
import { AssetChecks } from './resources/asset-checks';
import { KeysFobs } from './resources/keys-fobs';
import { Compliance } from './resources/compliance';
import { ComplianceForms } from './resources/compliance-forms';
import { InspectionAi } from './resources/inspection-ai';
import { PropertyTemplates } from './resources/property-templates';
import { Branches } from './resources/branches';
import { Hmo } from './resources/hmo';
import { Components } from './resources/components';
import { AddressLookup } from './resources/address-lookup';
import { StatsResource } from './resources/stats';
import { Phrases } from './resources/phrases';
import { Modifiers } from './resources/modifiers';
import { Scheduler } from './resources/scheduler';
import { TeamResource } from './resources/team';

export interface InventoraiClientOptions {
  apiToken: string;
  baseURL?: string;
}

export class InventoraiClient {
  private httpClient: HttpClient;

  public properties: Properties;
  public inspections: Inspections;
  public inspectionAreas: InspectionAreas;
  public inspectionItems: InspectionItems;
  public inspectionElements: InspectionElements;
  public defects: Defects;
  public meterReadings: MeterReadings;
  public assetChecks: AssetChecks;
  public keysFobs: KeysFobs;
  public compliance: Compliance;
  public complianceForms: ComplianceForms;
  public inspectionAi: InspectionAi;
  public propertyTemplates: PropertyTemplates;
  public branches: Branches;
  public hmo: Hmo;
  public components: Components;
  public addressLookup: AddressLookup;
  public stats: StatsResource;
  public phrases: Phrases;
  public modifiers: Modifiers;
  public scheduler: Scheduler;
  public team: TeamResource;

  constructor(options: InventoraiClientOptions) {
    const baseURL = options.baseURL || 'https://api.inventorai.co.uk/v1/team';
    this.httpClient = new HttpClient(options.apiToken, baseURL);

    this.properties = new Properties(this.httpClient);
    this.inspections = new Inspections(this.httpClient);
    this.inspectionAreas = new InspectionAreas(this.httpClient);
    this.inspectionItems = new InspectionItems(this.httpClient);
    this.inspectionElements = new InspectionElements(this.httpClient);
    this.defects = new Defects(this.httpClient);
    this.meterReadings = new MeterReadings(this.httpClient);
    this.assetChecks = new AssetChecks(this.httpClient);
    this.keysFobs = new KeysFobs(this.httpClient);
    this.compliance = new Compliance(this.httpClient);
    this.complianceForms = new ComplianceForms(this.httpClient);
    this.inspectionAi = new InspectionAi(this.httpClient);
    this.propertyTemplates = new PropertyTemplates(this.httpClient);
    this.branches = new Branches(this.httpClient);
    this.hmo = new Hmo(this.httpClient);
    this.components = new Components(this.httpClient);
    this.addressLookup = new AddressLookup(this.httpClient);
    this.stats = new StatsResource(this.httpClient);
    this.phrases = new Phrases(this.httpClient);
    this.modifiers = new Modifiers(this.httpClient);
    this.scheduler = new Scheduler(this.httpClient);
    this.team = new TeamResource(this.httpClient);
  }
}
