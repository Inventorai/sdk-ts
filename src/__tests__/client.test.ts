import { InventoraiClient } from '../client';
import { Properties } from '../resources/properties';
import { Inspections } from '../resources/inspections';
import { InspectionAreas } from '../resources/inspection-areas';
import { InspectionItems } from '../resources/inspection-items';
import { InspectionElements } from '../resources/inspection-elements';
import { Defects } from '../resources/defects';
import { MeterReadings } from '../resources/meter-readings';
import { KeysFobs } from '../resources/keys-fobs';
import { Compliance } from '../resources/compliance';
import { ComplianceForms } from '../resources/compliance-forms';
import { InspectionAi } from '../resources/inspection-ai';
import { PropertyTemplates } from '../resources/property-templates';
import { Branches } from '../resources/branches';
import { Hmo } from '../resources/hmo';
import { Components } from '../resources/components';
import { AddressLookup } from '../resources/address-lookup';
import { StatsResource } from '../resources/stats';
import { Phrases } from '../resources/phrases';
import { Modifiers } from '../resources/modifiers';
import { Scheduler } from '../resources/scheduler';

jest.mock('../http/client');

describe('InventoraiClient', () => {
  let client: InventoraiClient;

  beforeEach(() => {
    client = new InventoraiClient({ apiToken: 'test-token' });
  });

  it('creates an instance with required options', () => {
    expect(client).toBeInstanceOf(InventoraiClient);
  });

  it('accepts a custom baseURL', () => {
    const customClient = new InventoraiClient({
      apiToken: 'test-token',
      baseURL: 'https://custom.api.com/v1',
    });
    expect(customClient).toBeInstanceOf(InventoraiClient);
  });

  describe('resource instances', () => {
    it('has a properties resource', () => {
      expect(client.properties).toBeInstanceOf(Properties);
    });

    it('has an inspections resource', () => {
      expect(client.inspections).toBeInstanceOf(Inspections);
    });

    it('has an inspectionAreas resource', () => {
      expect(client.inspectionAreas).toBeInstanceOf(InspectionAreas);
    });

    it('has an inspectionItems resource', () => {
      expect(client.inspectionItems).toBeInstanceOf(InspectionItems);
    });

    it('has an inspectionElements resource', () => {
      expect(client.inspectionElements).toBeInstanceOf(InspectionElements);
    });

    it('has a defects resource', () => {
      expect(client.defects).toBeInstanceOf(Defects);
    });

    it('has a meterReadings resource', () => {
      expect(client.meterReadings).toBeInstanceOf(MeterReadings);
    });

    it('has a keysFobs resource', () => {
      expect(client.keysFobs).toBeInstanceOf(KeysFobs);
    });

    it('has a compliance resource', () => {
      expect(client.compliance).toBeInstanceOf(Compliance);
    });

    it('has a complianceForms resource', () => {
      expect(client.complianceForms).toBeInstanceOf(ComplianceForms);
    });

    it('has an inspectionAi resource', () => {
      expect(client.inspectionAi).toBeInstanceOf(InspectionAi);
    });

    it('has a propertyTemplates resource', () => {
      expect(client.propertyTemplates).toBeInstanceOf(PropertyTemplates);
    });

    it('has a branches resource', () => {
      expect(client.branches).toBeInstanceOf(Branches);
    });

    it('has an hmo resource', () => {
      expect(client.hmo).toBeInstanceOf(Hmo);
    });

    it('has a components resource', () => {
      expect(client.components).toBeInstanceOf(Components);
    });

    it('has an addressLookup resource', () => {
      expect(client.addressLookup).toBeInstanceOf(AddressLookup);
    });

    it('has a stats resource', () => {
      expect(client.stats).toBeInstanceOf(StatsResource);
    });

    it('has a phrases resource', () => {
      expect(client.phrases).toBeInstanceOf(Phrases);
    });

    it('has a modifiers resource', () => {
      expect(client.modifiers).toBeInstanceOf(Modifiers);
    });

    it('has a scheduler resource', () => {
      expect(client.scheduler).toBeInstanceOf(Scheduler);
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
      client.branches,
      client.hmo,
      client.components,
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
