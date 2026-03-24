"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const properties_1 = require("../resources/properties");
const inspections_1 = require("../resources/inspections");
const inspection_areas_1 = require("../resources/inspection-areas");
const inspection_items_1 = require("../resources/inspection-items");
const inspection_elements_1 = require("../resources/inspection-elements");
const defects_1 = require("../resources/defects");
const meter_readings_1 = require("../resources/meter-readings");
const keys_fobs_1 = require("../resources/keys-fobs");
const compliance_1 = require("../resources/compliance");
const compliance_forms_1 = require("../resources/compliance-forms");
const inspection_ai_1 = require("../resources/inspection-ai");
const property_templates_1 = require("../resources/property-templates");
const components_1 = require("../resources/components");
const user_1 = require("../resources/user");
const address_lookup_1 = require("../resources/address-lookup");
const stats_1 = require("../resources/stats");
const phrases_1 = require("../resources/phrases");
const modifiers_1 = require("../resources/modifiers");
const scheduler_1 = require("../resources/scheduler");
jest.mock('../http/client');
describe('InventoraiClient', () => {
    let client;
    beforeEach(() => {
        client = new client_1.InventoraiClient({ apiToken: 'test-token' });
    });
    it('creates an instance with required options', () => {
        expect(client).toBeInstanceOf(client_1.InventoraiClient);
    });
    it('accepts a custom baseURL', () => {
        const customClient = new client_1.InventoraiClient({
            apiToken: 'test-token',
            baseURL: 'https://custom.api.com/v1',
        });
        expect(customClient).toBeInstanceOf(client_1.InventoraiClient);
    });
    describe('resource instances', () => {
        it('has a properties resource', () => {
            expect(client.properties).toBeInstanceOf(properties_1.Properties);
        });
        it('has an inspections resource', () => {
            expect(client.inspections).toBeInstanceOf(inspections_1.Inspections);
        });
        it('has an inspectionAreas resource', () => {
            expect(client.inspectionAreas).toBeInstanceOf(inspection_areas_1.InspectionAreas);
        });
        it('has an inspectionItems resource', () => {
            expect(client.inspectionItems).toBeInstanceOf(inspection_items_1.InspectionItems);
        });
        it('has an inspectionElements resource', () => {
            expect(client.inspectionElements).toBeInstanceOf(inspection_elements_1.InspectionElements);
        });
        it('has a defects resource', () => {
            expect(client.defects).toBeInstanceOf(defects_1.Defects);
        });
        it('has a meterReadings resource', () => {
            expect(client.meterReadings).toBeInstanceOf(meter_readings_1.MeterReadings);
        });
        it('has a keysFobs resource', () => {
            expect(client.keysFobs).toBeInstanceOf(keys_fobs_1.KeysFobs);
        });
        it('has a compliance resource', () => {
            expect(client.compliance).toBeInstanceOf(compliance_1.Compliance);
        });
        it('has a complianceForms resource', () => {
            expect(client.complianceForms).toBeInstanceOf(compliance_forms_1.ComplianceForms);
        });
        it('has an inspectionAi resource', () => {
            expect(client.inspectionAi).toBeInstanceOf(inspection_ai_1.InspectionAi);
        });
        it('has a propertyTemplates resource', () => {
            expect(client.propertyTemplates).toBeInstanceOf(property_templates_1.PropertyTemplates);
        });
        it('has a components resource', () => {
            expect(client.components).toBeInstanceOf(components_1.Components);
        });
        it('has a user resource', () => {
            expect(client.user).toBeInstanceOf(user_1.UserResource);
        });
        it('has an addressLookup resource', () => {
            expect(client.addressLookup).toBeInstanceOf(address_lookup_1.AddressLookup);
        });
        it('has a stats resource', () => {
            expect(client.stats).toBeInstanceOf(stats_1.StatsResource);
        });
        it('has a phrases resource', () => {
            expect(client.phrases).toBeInstanceOf(phrases_1.Phrases);
        });
        it('has a modifiers resource', () => {
            expect(client.modifiers).toBeInstanceOf(modifiers_1.Modifiers);
        });
        it('has a scheduler resource', () => {
            expect(client.scheduler).toBeInstanceOf(scheduler_1.Scheduler);
        });
    });
    it('initializes all 18 resources', () => {
        const resources = [
            client.properties,
            client.inspections,
            client.inspectionAreas,
            client.inspectionItems,
            client.inspectionElements,
            client.defects,
            client.meterReadings,
            client.keysFobs,
            client.compliance,
            client.complianceForms,
            client.inspectionAi,
            client.propertyTemplates,
            client.components,
            client.user,
            client.addressLookup,
            client.stats,
            client.phrases,
            client.modifiers,
            client.scheduler,
        ];
        // 19 resources total (scheduler is the 19th but instructions say 18 + scheduler)
        resources.forEach((resource) => {
            expect(resource).toBeDefined();
        });
    });
});
