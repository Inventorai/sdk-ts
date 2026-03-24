"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoraiClient = void 0;
const client_1 = require("./http/client");
const properties_1 = require("./resources/properties");
const inspections_1 = require("./resources/inspections");
const inspection_areas_1 = require("./resources/inspection-areas");
const inspection_items_1 = require("./resources/inspection-items");
const inspection_elements_1 = require("./resources/inspection-elements");
const defects_1 = require("./resources/defects");
const meter_readings_1 = require("./resources/meter-readings");
const keys_fobs_1 = require("./resources/keys-fobs");
const compliance_1 = require("./resources/compliance");
const compliance_forms_1 = require("./resources/compliance-forms");
const inspection_ai_1 = require("./resources/inspection-ai");
const property_templates_1 = require("./resources/property-templates");
const components_1 = require("./resources/components");
const user_1 = require("./resources/user");
const address_lookup_1 = require("./resources/address-lookup");
const stats_1 = require("./resources/stats");
const phrases_1 = require("./resources/phrases");
const modifiers_1 = require("./resources/modifiers");
const scheduler_1 = require("./resources/scheduler");
class InventoraiClient {
    constructor(options) {
        const baseURL = options.baseURL || 'https://app.inventorai.co.uk/api/v1';
        this.httpClient = new client_1.HttpClient(options.apiToken, baseURL);
        this.properties = new properties_1.Properties(this.httpClient);
        this.inspections = new inspections_1.Inspections(this.httpClient);
        this.inspectionAreas = new inspection_areas_1.InspectionAreas(this.httpClient);
        this.inspectionItems = new inspection_items_1.InspectionItems(this.httpClient);
        this.inspectionElements = new inspection_elements_1.InspectionElements(this.httpClient);
        this.defects = new defects_1.Defects(this.httpClient);
        this.meterReadings = new meter_readings_1.MeterReadings(this.httpClient);
        this.keysFobs = new keys_fobs_1.KeysFobs(this.httpClient);
        this.compliance = new compliance_1.Compliance(this.httpClient);
        this.complianceForms = new compliance_forms_1.ComplianceForms(this.httpClient);
        this.inspectionAi = new inspection_ai_1.InspectionAi(this.httpClient);
        this.propertyTemplates = new property_templates_1.PropertyTemplates(this.httpClient);
        this.components = new components_1.Components(this.httpClient);
        this.user = new user_1.UserResource(this.httpClient);
        this.addressLookup = new address_lookup_1.AddressLookup(this.httpClient);
        this.stats = new stats_1.StatsResource(this.httpClient);
        this.phrases = new phrases_1.Phrases(this.httpClient);
        this.modifiers = new modifiers_1.Modifiers(this.httpClient);
        this.scheduler = new scheduler_1.Scheduler(this.httpClient);
    }
}
exports.InventoraiClient = InventoraiClient;
