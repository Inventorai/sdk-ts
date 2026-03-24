"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = exports.Modifiers = exports.Phrases = exports.StatsResource = exports.AddressLookup = exports.UserResource = exports.Components = exports.PropertyTemplates = exports.InspectionAi = exports.ComplianceForms = exports.Compliance = exports.KeysFobs = exports.MeterReadings = exports.Defects = exports.InspectionElements = exports.InspectionItems = exports.InspectionAreas = exports.Inspections = exports.Properties = exports.InventoraiClient = void 0;
var client_1 = require("./client");
Object.defineProperty(exports, "InventoraiClient", { enumerable: true, get: function () { return client_1.InventoraiClient; } });
__exportStar(require("./types"), exports);
__exportStar(require("./errors/api-error"), exports);
// Resource classes
var properties_1 = require("./resources/properties");
Object.defineProperty(exports, "Properties", { enumerable: true, get: function () { return properties_1.Properties; } });
var inspections_1 = require("./resources/inspections");
Object.defineProperty(exports, "Inspections", { enumerable: true, get: function () { return inspections_1.Inspections; } });
var inspection_areas_1 = require("./resources/inspection-areas");
Object.defineProperty(exports, "InspectionAreas", { enumerable: true, get: function () { return inspection_areas_1.InspectionAreas; } });
var inspection_items_1 = require("./resources/inspection-items");
Object.defineProperty(exports, "InspectionItems", { enumerable: true, get: function () { return inspection_items_1.InspectionItems; } });
var inspection_elements_1 = require("./resources/inspection-elements");
Object.defineProperty(exports, "InspectionElements", { enumerable: true, get: function () { return inspection_elements_1.InspectionElements; } });
var defects_1 = require("./resources/defects");
Object.defineProperty(exports, "Defects", { enumerable: true, get: function () { return defects_1.Defects; } });
var meter_readings_1 = require("./resources/meter-readings");
Object.defineProperty(exports, "MeterReadings", { enumerable: true, get: function () { return meter_readings_1.MeterReadings; } });
var keys_fobs_1 = require("./resources/keys-fobs");
Object.defineProperty(exports, "KeysFobs", { enumerable: true, get: function () { return keys_fobs_1.KeysFobs; } });
var compliance_1 = require("./resources/compliance");
Object.defineProperty(exports, "Compliance", { enumerable: true, get: function () { return compliance_1.Compliance; } });
var compliance_forms_1 = require("./resources/compliance-forms");
Object.defineProperty(exports, "ComplianceForms", { enumerable: true, get: function () { return compliance_forms_1.ComplianceForms; } });
var inspection_ai_1 = require("./resources/inspection-ai");
Object.defineProperty(exports, "InspectionAi", { enumerable: true, get: function () { return inspection_ai_1.InspectionAi; } });
var property_templates_1 = require("./resources/property-templates");
Object.defineProperty(exports, "PropertyTemplates", { enumerable: true, get: function () { return property_templates_1.PropertyTemplates; } });
var components_1 = require("./resources/components");
Object.defineProperty(exports, "Components", { enumerable: true, get: function () { return components_1.Components; } });
var user_1 = require("./resources/user");
Object.defineProperty(exports, "UserResource", { enumerable: true, get: function () { return user_1.UserResource; } });
var address_lookup_1 = require("./resources/address-lookup");
Object.defineProperty(exports, "AddressLookup", { enumerable: true, get: function () { return address_lookup_1.AddressLookup; } });
var stats_1 = require("./resources/stats");
Object.defineProperty(exports, "StatsResource", { enumerable: true, get: function () { return stats_1.StatsResource; } });
var phrases_1 = require("./resources/phrases");
Object.defineProperty(exports, "Phrases", { enumerable: true, get: function () { return phrases_1.Phrases; } });
var modifiers_1 = require("./resources/modifiers");
Object.defineProperty(exports, "Modifiers", { enumerable: true, get: function () { return modifiers_1.Modifiers; } });
var scheduler_1 = require("./resources/scheduler");
Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return scheduler_1.Scheduler; } });
