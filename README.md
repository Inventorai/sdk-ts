# Inventorai TypeScript SDK

Official TypeScript/JavaScript SDK for the Inventorai API - AI-powered property inspection and management platform.

## Installation

```bash
npm install @inventorai/sdk
# or
yarn add @inventorai/sdk
# or
pnpm add @inventorai/sdk
```

## Requirements

- Node.js 16+
- TypeScript 5+ (for TypeScript projects)

## Quick Start

```typescript
import { InventoraiClient } from '@inventorai/sdk';

const client = new InventoraiClient({
  apiToken: 'your-api-token-here'
});

// List properties
const properties = await client.properties.list({
  filter: { status: 'active' },
  include: ['landlord'],
  per_page: 20
});

// Create a property
const property = await client.properties.create({
  address_line_1: '123 High Street',
  postcode: 'SW1A 1AA',
  country: 'GB',
  property_type: 'flat',
  is_residential: true
});
```

## Configuration

### Base URL

By default, the SDK uses `https://api.inventorai.co.uk/v1/team` — the third-party Team API surface, authenticated with a team API token. Override for local development:

```typescript
const client = new InventoraiClient({
  apiToken: 'your-api-token',
  baseURL: 'https://api.inventorai.test/v1/team'
});
```

## Resources

### Properties

```typescript
// List properties with filters
const properties = await client.properties.list({
  filter: { status: 'active', property_type: 'flat', search: 'London' },
  include: ['landlord', 'inspections'],
  sort: '-created_at',
  per_page: 50
});

// Get single property
const property = await client.properties.get(123, {
  include: ['landlord', 'inspections']
});

// Create a property
const newProperty = await client.properties.create({
  address_line_1: '10 Downing Street',
  postcode: 'SW1A 2AA',
  country: 'GB',
  property_type: 'house',
  is_residential: true
});

// Get active tenancy
const tenancy = await client.properties.activeTenancy(123);

// Upload / delete cover image
await client.properties.uploadCoverImage(123, imageFile);
await client.properties.deleteCoverImage(123);
```

### Inspections

```typescript
// List inspections
const inspections = await client.inspections.list({
  filter: { property_id: '123', status: 'scheduled' }
});

// Create an inspection
const inspection = await client.inspections.create({
  property_id: 123,
  type: 'move_in',
  scheduled_at: '2026-04-01',
  ai_mode_enabled: true
});

// Create with offline-built ULID + nested tree (sync a full structure in one call,
// reusing your own row IDs so offline mutations stay valid post-sync)
const offlineInspection = await client.inspections.create({
  id: '01HZW4N8R7Q5K3JX0V9PT6S2EM',
  property_id: 123,
  type: 'periodic',
  scheduled_end_at: '2026-04-01T11:00:00Z',
  areas: [{
    id: '01HZW4N8R7Q5K3JX0V9PT6S2A1',
    name: 'Living Room',
    items: [{
      id: '01HZW4N8R7Q5K3JX0V9PT6S2I1',
      name: 'Sofa',
      elements: [{ id: '01HZW4N8R7Q5K3JX0V9PT6S2E1', name: 'Cushion' }]
    }]
  }]
});

// Initialize from a property template (async server-side expansion)
await client.inspections.initialize({
  property_id: 123,
  template_id: 7,
  type: 'move_in'
});

// Get with relations — one call returns the whole inspection tree.
// You almost never need the per-resource list() methods below for *reads* —
// pass everything you want through `include` and you'll get it inline.
const detail = await client.inspections.get(456, {
  include: [
    // property + tenancy context
    'property', 'property.currentTenancy.tenants', 'inspector',
    // the area → item → element tree (photos auto-load when these are included)
    'areas.items.elements',
    // optional sections
    'meterReadings', 'keysFobs',
    'assetChecks.propertyAsset.propertyArea',
    'complianceForms.sections.fields.responses',
  ],
});

// The per-resource sections below (Inspection Areas, Items, Elements, …)
// are for **writes**: create, update, delete, duplicate, reorder, photo upload —
// and for mobile/offline sync where a client re-pulls one slice or pages a leaf
// (e.g. an HMO inspection with hundreds of items). For normal reads, prefer the
// `include` call above.

// Lifecycle
await client.inspections.begin(456);
await client.inspections.takeOver(456);          // claim an inspection locked by another inspector
await client.inspections.takeBackToWeb(456);     // hand a mobile-takeover inspection back to the web UI
await client.inspections.reschedule(456, { scheduled_at: '2026-04-15' });
await client.inspections.finalize(456);
await client.inspections.reopen(456);            // reopen a finalised inspection for edits
await client.inspections.delete(456);

// Check existing / comparable
const existing = await client.inspections.checkExisting({ property_id: 123, type: 'move_in' });
const comparable = await client.inspections.comparable({ property_id: 123 });
```

### Inspection Areas

```typescript
const areas = await client.inspectionAreas.list(inspectionId);
const area = await client.inspectionAreas.get(inspectionId, areaId);
const newArea = await client.inspectionAreas.create(inspectionId, {
  name: 'Living Room', condition: 'good', cleanliness: 'clean'
});
await client.inspectionAreas.update(inspectionId, areaId, { condition: 'fair' });
await client.inspectionAreas.delete(inspectionId, areaId);
await client.inspectionAreas.duplicate(inspectionId, areaId);
await client.inspectionAreas.reorder(inspectionId, ['area1', 'area2', 'area3']);

// Photos
await client.inspectionAreas.uploadPhoto(inspectionId, areaId, photoFile);
await client.inspectionAreas.deletePhoto(inspectionId, areaId, photoId);
```

### Inspection Items

```typescript
const items = await client.inspectionItems.list(inspectionId);
const item = await client.inspectionItems.create(inspectionId, {
  area_id: areaId, name: 'Sofa', condition: 'good'
});
await client.inspectionItems.update(inspectionId, itemId, { condition: 'poor' });
await client.inspectionItems.delete(inspectionId, itemId);
await client.inspectionItems.duplicate(inspectionId, itemId);
await client.inspectionItems.uploadPhoto(inspectionId, itemId, photoFile);
```

### Inspection Elements

```typescript
const elements = await client.inspectionElements.list(inspectionId);
const element = await client.inspectionElements.create(inspectionId, {
  item_id: itemId, name: 'Cushion', condition: 'fair'
});
await client.inspectionElements.update(inspectionId, elementId, { condition: 'poor' });
await client.inspectionElements.delete(inspectionId, elementId);
await client.inspectionElements.uploadPhoto(inspectionId, elementId, photoFile);
```

### Defects

```typescript
const defects = await client.defects.list(inspectionId);
const defect = await client.defects.create(inspectionId, {
  defectable_type: 'item',
  defectable_id: itemId,
  title: 'Scratch on surface',
  severity: 'minor',           // nullable — omit if uncategorised
  item_label: 'Top-left drawer' // optional free-text label for the affected part
});

// Contextual creation
await client.defects.createForArea(inspectionId, areaId, { title: 'Damp patch', severity: 'major' });
await client.defects.createForItem(inspectionId, itemId, { title: 'Broken handle', severity: 'moderate', item_label: 'Right side' });
await client.defects.createForElement(inspectionId, elementId, { title: 'Stain', severity: 'cosmetic' });

await client.defects.update(inspectionId, defectId, { status: 'fixed' });
await client.defects.delete(inspectionId, defectId);
await client.defects.uploadPhoto(inspectionId, defectId, photoFile);
```

### Meter Readings

```typescript
const meters = await client.meterReadings.list(inspectionId);
const meter = await client.meterReadings.create(inspectionId, {
  meter_type: 'gas', reading: 12345, meter_location: 'Under stairs'
});
await client.meterReadings.update(inspectionId, meterId, { reading: 12350 });
await client.meterReadings.delete(inspectionId, meterId);
await client.meterReadings.uploadPhoto(inspectionId, meterId, photoFile);
```

### Keys & Fobs

```typescript
const keys = await client.keysFobs.list(inspectionId);
const key = await client.keysFobs.create(inspectionId, {
  item_type: 'front_door_key', quantity: 2, description: 'Yale key'
});
await client.keysFobs.update(inspectionId, keyId, { quantity: 3 });
await client.keysFobs.delete(inspectionId, keyId);
await client.keysFobs.uploadPhoto(inspectionId, keyId, photoFile);
```

### Compliance

```typescript
// List compliance forms on an inspection
const forms = await client.compliance.list(inspectionId);

// Attach / detach forms
await client.compliance.attach(inspectionId, formId);
await client.compliance.attachMultiple(inspectionId, [formId1, formId2]);
await client.compliance.detach(inspectionId, formId);

// Update responses
await client.compliance.updateResponse(inspectionId, fieldId, { value: 'Yes' });
await client.compliance.batchUpdateResponses(inspectionId, { 1: 'Yes', 2: 'No' });

// File uploads & section instances
await client.compliance.uploadFile(inspectionId, file);
await client.compliance.addSectionInstance(inspectionId, { form_id: 1, section_id: 2 });
await client.compliance.removeSectionInstance(inspectionId, instanceId);

// Summary
const summary = await client.compliance.summary(inspectionId);
```

### Compliance Form Templates

```typescript
const templates = await client.complianceForms.list();
```

### Inspection AI

```typescript
await client.inspectionAi.enable(inspectionId);
await client.inspectionAi.disable(inspectionId);
const status = await client.inspectionAi.status(inspectionId);
await client.inspectionAi.retryCredits(inspectionId);
await client.inspectionAi.requestRetry(inspectionId);
const retryStatus = await client.inspectionAi.retryStatus(inspectionId);
await client.inspectionAi.submitFeedback(inspectionId, { rating: 5, comment: 'Great' });
```

### Property Templates (Blueprints)

```typescript
const templates = await client.propertyTemplates.list();
const template = await client.propertyTemplates.get(789);
```

### Branches

```typescript
const branches = await client.branches.list();
const branch = await client.branches.get(1);
```

### HMO (House in Multiple Occupation)

```typescript
const summary = await client.hmo.summary(inspectionId);
const tenants = await client.hmo.tenants(inspectionId);

await client.hmo.assignTenantToArea(inspectionId, areaId, {
  tenant_ids: ['tenant-1', 'tenant-2'],
  is_shared: false,
  room_identifier: 'Room 1'
});

await client.hmo.bulkAssignTenants(inspectionId, {
  assignments: [
    { area_id: 'area-1', tenant_ids: ['tenant-1'] },
    { area_id: 'area-2', is_shared: true }
  ]
});
```

### Components

```typescript
const components = await client.components.list();
```

### Address Lookup

```typescript
const results = await client.addressLookup.lookup('SW1A 1AA');
const bulk = await client.addressLookup.bulkLookup(['SW1A 1AA', 'EC1A 1BB']);
const details = await client.addressLookup.getDetails({ id: 'addr_123' });
const usage = await client.addressLookup.usage();
```

### Stats & Dashboard

```typescript
const stats = await client.stats.index();
const teamStats = await client.stats.team();
const userStats = await client.stats.user();
const schedule = await client.stats.schedule();
```

### Phrases

```typescript
const synced = await client.phrases.sync();
const results = await client.phrases.search({ q: 'good condition', category: 'item' });
await client.phrases.create({ text: 'In good working order', category: 'item' });
const generated = await client.phrases.generate({ query: 'clean carpet', category: 'item' });
await client.phrases.learn({ descriptions: ['Freshly painted walls'] });
const phraseStats = await client.phrases.stats();
```

### Modifiers

```typescript
const modifiers = await client.modifiers.list();
const types = await client.modifiers.types();
const forItem = await client.modifiers.forItem({ item_name: 'Sofa' });
const search = await client.modifiers.search({ q: 'leather' });
const disabled = await client.modifiers.disabled();
const master = await client.modifiers.master();
const sync = await client.modifiers.sync();      // full snapshot for offline caches

await client.modifiers.createCustom({ type: 'brand', value: 'IKEA' });
await client.modifiers.deleteCustom(modifierId);
await client.modifiers.disable(modifierId);
await client.modifiers.enable(modifierId);
const composed = await client.modifiers.compose({ items: ['Brown', 'Leather', 'Sofa'] });
```

### Asset Checks

Alarm and safety-equipment checks recorded against an inspection.

```typescript
await client.assetChecks.update(inspectionId, assetCheckId, {
  tested: 'yes',           // yes | no | not_accessible
  test_result: 'pass',     // pass | fail | na
  condition: 'good',       // good | fair | poor | replace
  notes: 'Sounded on test',
});
await client.assetChecks.uploadPhoto(inspectionId, assetCheckId, photoFile);
```

### Scheduler

```typescript
const calendar = await client.scheduler.calendar({ month: '2026-04' });
await client.scheduler.weeklyAvailability(data);
const conflicts = await client.scheduler.checkConflicts(data);
const hours = await client.scheduler.officeHours();
const duration = await client.scheduler.estimateDuration(data);
```

## TypeScript Support

Full type definitions are included:

```typescript
import {
  Property, Inspection, InspectionArea, InspectionItem, InspectionElement,
  Defect, MeterReading, KeyFob, ComplianceForm, PropertyTemplate, Branch,
  CreatePropertyData, CreateInspectionData,
  CreateInspectionAreaTree, CreateInspectionItemTree, CreateInspectionElementTree,
  CreateDefectData, UpdateDefectData,
  HmoTenantAssignment, HmoBulkAssignment,
  PaginatedResponse
} from '@inventorai/sdk';
```

## Query Parameters

### Filtering
```typescript
const properties = await client.properties.list({
  filter: { status: 'active', property_type: 'house' }
});
```

### Including Relationships
```typescript
const property = await client.properties.get(123, {
  include: ['landlord', 'inspections']
});
```

### Sorting
```typescript
const properties = await client.properties.list({
  sort: '-created_at'  // Prefix with - for descending
});
```

### Pagination
```typescript
const properties = await client.properties.list({ per_page: 50, page: 2 });
```

## Error Handling

```typescript
import { ApiError, AuthenticationError, RateLimitError } from '@inventorai/sdk';

try {
  const properties = await client.properties.list();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded:', error.message);
  } else if (error instanceof ApiError) {
    console.error('API error:', error.message, error.statusCode);
  }
}
```

## API Token

An active [Inventorai](https://app.inventorai.co.uk) subscription is required to use the API.

1. Log in to Inventorai
2. Go to **Team Settings** > **API**
3. Create a new API token
4. Store securely in environment variables

```typescript
const client = new InventoraiClient({
  apiToken: process.env.INVENTORAI_API_TOKEN!
});
```

## Support

- Documentation: https://docs.inventorai.co.uk
- API Reference: https://docs.inventorai.co.uk/api/overview
- Email: support@inventorai.co.uk

## Licence

MIT Licence
