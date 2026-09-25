// === Enums / Union Types ===

/** Building type. The API accepts any string; these are the known values. HMO status is `is_hmo`, not a type. */
export type PropertyType = 'flat' | 'house' | 'commercial' | 'studio' | 'land' | (string & {});
export type InspectionStatus = 'draft' | 'in_progress' | 'in_review' | 'pending_signature' | 'completed';
export type ScribePolicy = 'off' | 'optional' | 'only';
export type InspectionType = 'move_in' | 'move_out' | 'periodic' | 'vacant' | 'pre_tenancy' | 'landlord_only' | 'between_tenancies';
export type Condition = 'very_poor' | 'poor' | 'fair' | 'good' | 'new';
export type Cleanliness = 'dirty' | 'needs_cleaning' | 'acceptable' | 'clean' | 'very_clean';
export type MeterType = 'gas' | 'electricity' | 'water' | 'other';
export type KeyFobType = 'front_door_key' | 'back_door_key' | 'mailbox_key' | 'window_key' | 'entry_fob' | 'garage_remote' | 'gate_remote' | 'other';
export type DefectSeverity = 'low' | 'medium' | 'high' | 'critical';
export type DefectStatus = 'open' | 'assigned' | 'in_progress' | 'awaiting_approval' | 'completed';
export type DefectableType = 'area' | 'item' | 'element';
export type ModifierType = 'brand' | 'size' | 'type' | 'accessory';
export type PhraseCategory = 'area' | 'item' | 'element';

// === Core Types ===

export interface Address {
  line_1: string;
  line_2?: string;
  city?: string;
  county?: string;
  postcode: string;
  country?: string;
  full_address?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Photo {
  id: string;
  file_name: string;
  size: number;
  mime_type: string;
  url: string;
  thumbnail_url?: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  type: string;
  name: string;
  rating?: string;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string;
  url?: string;
  is_current: boolean;
  expiry_status?: string;
}

export interface CoverImage {
  id: string;
  url: string;
  thumbnail_url?: string;
}

// === Property Types ===

export interface Property {
  id: string;
  branch_id?: string | null;
  branch?: { id: string; name: string } | null;
  client_id?: string | null;
  client?: Client;
  address: Address;
  location?: Location;
  property_type: PropertyType;
  is_hmo: boolean;
  is_residential: boolean;
  areas?: Array<{ id: string; name: string; category?: string; is_assignable?: boolean; order?: number }>;
  image_thumbnail?: string;
  image_small?: string;
  notes?: string;
  certificates?: Record<string, Certificate>;
  landlord?: Landlord;
  image?: string;
  inspections_count?: number;
  tenancies_count?: number;
  inspections?: Inspection[];
  tenancies?: Tenancy[];
  current_tenancy?: Tenancy;
  created_at: string;
  updated_at: string;
}

export interface CreatePropertyData {
  address_line_1: string;
  address_line_2?: string;
  city?: string;
  county?: string;
  postcode: string;
  country: string;
  latitude?: string;
  longitude?: string;
  property_type: PropertyType;
  is_hmo?: boolean;
  is_residential: boolean;
  branch_id?: string | null;
}

export interface Landlord {
  id: string;
  name: string;
  type?: string;
  company_name?: string;
  email?: string;
  alternative_email?: string;
  phone?: string;
  mobile_phone?: string;
  emergency_contact?: { name: string; phone: string };
  address?: Address;
  registration?: { number: string; expiry: string };
  properties_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Tenancy {
  id: string;
  property_id: string;
  start_date: string;
  end_date?: string;
  status: string;
  notes?: string;
  hmo_configuration?: any;
  lead_tenant?: { id: string; name: string; email: string };
  tenants_count?: number;
  created_at: string;
  updated_at: string;
}

// === Inspection Types ===

export interface Inspection {
  id: string;
  property_id: string;
  property?: Property;
  client_id?: string | null;
  client?: Client;
  inspector?: { id: string; name: string; email: string };
  type: InspectionType;
  status: InspectionStatus;
  is_archived: boolean;
  archived_at?: string;
  tenancy_id?: string;
  tenancy?: Tenancy;
  room_tenancy_ids?: string[];
  requires_tenancy: boolean;
  scheduled_at?: string;
  scheduled_end_at?: string;
  inspection_depth?: string;
  elements_enabled: boolean;
  baseline_inspection_id?: string;
  previous_inspection_id?: string;
  completion_requirements?: {
    require_ratings: boolean;
    require_photos: boolean;
    require_meters: boolean;
    require_keys: boolean;
    require_compliance: boolean;
  };
  lock_status?: {
    status: string;
    locked_by?: { id: string; name?: string };
    device_name?: string;
    locked_at?: string;
    last_activity_at?: string;
  };
  finalized?: {
    at?: string;
    by?: { id: string; name: string };
  };
  statistics?: {
    total_defects: number;
    critical_defects: number;
    total_photos: number;
  };
  scribe: {
    enabled: boolean;
    policy: ScribePolicy;
    processing_status?: string | null;
    photos_to_process?: number | null;
    photos_processed?: number | null;
    processing_started_at?: string | null;
    processing_completed_at?: string | null;
  };
  tenant_signatures?: {
    deadline?: string;
    expected_count: number;
    signed_count: number;
    all_signed: boolean;
  };
  areas_count?: number;
  items_count?: number;
  elements_count?: number;
  areas?: InspectionArea[];
  items?: InspectionItem[];
  elements?: InspectionElement[];
  meter_readings?: MeterReading[];
  keys_fobs?: KeyFob[];
  compliance_forms?: Array<Record<string, any>>;
  asset_checks?: InspectionAssetCheckGroup[];
  cover_image?: CoverImage & { small_url?: string };
  created_at: string;
  updated_at: string;
}

export interface CreateInspectionData {
  id?: string;
  property_id: string;
  tenancy_id?: string;
  type: InspectionType;
  scheduled_at?: string;
  inspection_time?: string;
  inspection_end_time?: string;
  scheduled_end_at?: string;
  inspector_id?: string;
  comparison_inspection_id?: string;
  is_comparison?: boolean;
  room_tenancy_ids?: string[];
  room_comparison_map?: Record<string, string | null>;
  occupancy_context?: 'tenancy_linked' | 'vacant' | 'pre_tenancy' | 'landlord_only' | 'between_tenancies';
  duplicate_media?: boolean;
  scribe_enabled?: boolean;
  /** @deprecated Use `scribe_enabled`. The API still maps it. */
  ai_mode_enabled?: boolean;
  areas?: CreateInspectionAreaTree[];
}

export interface CreateInspectionAreaTree {
  id: string;
  name: string;
  category?: string;
  order?: number;
  property_area_id?: string;
  items?: CreateInspectionItemTree[];
}

export interface CreateInspectionItemTree {
  id: string;
  name: string;
  category?: string;
  order?: number;
  property_item_id?: string;
  elements?: CreateInspectionElementTree[];
}

export interface CreateInspectionElementTree {
  id: string;
  name: string;
  category?: string;
  order?: number;
  property_element_id?: string;
}

export interface RescheduleInspectionData {
  scheduled_at: string;
  inspection_time?: string;
  inspection_end_time?: string;
}

export interface FinalizeInspectionData {
  [key: string]: any;
}

export interface InspectionAssetCheck {
  id: string;
  property_asset_id: string;
  asset_type?: string | null;
  asset_type_label?: string | null;
  location_description?: string | null;
  make?: string | null;
  model?: string | null;
  serial_number?: string | null;
  tested?: any;
  test_result?: string | null;
  condition?: string | null;
  notes?: string | null;
  photos: Array<{ id: string; url: string; thumbnail_url: string }>;
}

export interface InspectionAssetCheckGroup {
  asset_type: string;
  asset_type_label?: string | null;
  checks: InspectionAssetCheck[];
  total: number;
  tested_count: number;
  passed_count: number;
}

// === Inspection Area Types ===

export interface InspectionArea {
  id: string;
  inspection_id: string;
  parent_id?: string;
  children_count?: number;
  name: string;
  category?: string;
  sort_order: number;
  condition?: Condition;
  cleanliness?: Cleanliness;
  notes?: string;
  access_issue?: string;
  items_count?: number;
  items?: InspectionItem[];
  photos?: Photo[];
  started_at?: string;
  completed_at?: string;
  comparison_area_id?: string;
  comparison?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInspectionAreaData {
  id?: string;
  name: string;
  category?: string;
  condition?: Condition;
  cleanliness?: Cleanliness;
  notes?: string;
  access_issue?: string;
  sort_order?: number;
  parent_id?: string;
}

export interface UpdateInspectionAreaData {
  name?: string;
  category?: string;
  condition?: Condition;
  cleanliness?: Cleanliness;
  notes?: string;
  access_issue?: string;
  sort_order?: number;
  parent_id?: string;
}

// === Inspection Item Types ===

export interface InspectionItem {
  id: string;
  area_id: string;
  parent_id?: string;
  children_count?: number;
  name: string;
  category?: string;
  sort_order: number;
  color?: string;
  is_custom: boolean;
  condition?: Condition;
  cleanliness?: Cleanliness;
  description?: string;
  notes?: string;
  elements_count?: number;
  elements?: InspectionElement[];
  photos?: Photo[];
  comparison_item_id?: string;
  comparison?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInspectionItemData {
  id?: string;
  area_id: string;
  name: string;
  category?: string;
  color?: string;
  condition?: Condition;
  cleanliness?: Cleanliness;
  description?: string;
  notes?: string;
  is_defect?: boolean;
  is_critical?: boolean;
  defect_description?: string;
  sort_order?: number;
  parent_id?: string;
}

export interface UpdateInspectionItemData {
  name?: string;
  category?: string;
  color?: string;
  condition?: Condition;
  cleanliness?: Cleanliness;
  description?: string;
  notes?: string;
  sort_order?: number;
  parent_id?: string;
}

// === Inspection Element Types ===

export interface InspectionElement {
  id: string;
  item_id: string;
  parent_id?: string;
  children_count?: number;
  name: string;
  category?: string;
  sort_order: number;
  color?: string;
  is_custom: boolean;
  condition?: Condition;
  description?: string;
  notes?: string;
  photos?: Photo[];
  comparison_element_id?: string;
  comparison?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInspectionElementData {
  id?: string;
  item_id: string;
  name: string;
  category?: string;
  color?: string;
  condition?: Condition;
  description?: string;
  notes?: string;
  sort_order?: number;
  parent_id?: string;
}

export interface UpdateInspectionElementData {
  name?: string;
  category?: string;
  color?: string;
  condition?: Condition;
  description?: string;
  notes?: string;
  sort_order?: number;
  parent_id?: string;
}

// === Defect Types ===

export interface Defect {
  id: string;
  inspection_id: string;
  defectable_type: DefectableType;
  defectable_id: string;
  title: string;
  description?: string;
  location_notes?: string;
  severity?: DefectSeverity | null;
  item_label?: string | null;
  category?: string;
  status: DefectStatus;
  order?: number;
  assigned_at?: string;
  fixed_at?: string;
  verified_at?: string;
  photos?: Photo[];
  photo_count?: number;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDefectData {
  id?: string;
  defectable_type: DefectableType;
  defectable_id: string;
  title: string;
  description?: string;
  location_notes?: string;
  severity?: DefectSeverity | null;
  item_label?: string | null;
  category?: string;
  photo_ids?: string[];
}

export interface UpdateDefectData {
  title?: string;
  description?: string;
  location_notes?: string;
  severity?: DefectSeverity | null;
  item_label?: string | null;
  category?: string;
  status?: DefectStatus;
  photo_ids?: string[];
}

// === Meter Reading Types ===

export interface MeterReading {
  id: string;
  inspection_id: string;
  meter_type: MeterType;
  meter_location?: string;
  meter_serial?: string;
  reading?: number;
  reading_unit?: string;
  captured_at?: string;
  notes?: string;
  meter_balance?: number;
  is_prepaid: boolean;
  photos?: Photo[];
  created_at: string;
  updated_at: string;
}

export interface CreateMeterReadingData {
  id?: string;
  meter_type: MeterType;
  meter_location?: string;
  meter_serial?: string;
  reading?: number;
  reading_unit?: string;
  captured_at?: string;
  notes?: string;
  meter_balance?: number;
  is_prepaid?: boolean;
}

export interface UpdateMeterReadingData {
  meter_type?: MeterType;
  meter_location?: string;
  meter_serial?: string;
  reading?: number;
  reading_unit?: string;
  captured_at?: string;
  notes?: string;
  meter_balance?: number;
  is_prepaid?: boolean;
}

// === Key/Fob Types ===

export interface KeyFob {
  id: string;
  inspection_id: string;
  item_type: KeyFobType;
  description?: string;
  quantity: number;
  serial_number?: string;
  notes?: string;
  location?: string;
  photos?: Photo[];
  created_at: string;
  updated_at: string;
}

export interface CreateKeyFobData {
  id?: string;
  item_type: KeyFobType;
  description?: string;
  quantity: number;
  serial_number?: string;
  notes?: string;
  location?: string;
}

export interface UpdateKeyFobData {
  item_type?: KeyFobType;
  description?: string;
  quantity?: number;
  serial_number?: string;
  notes?: string;
  location?: string;
}

// === Compliance Types ===

export interface ComplianceForm {
  id: string;
  name: string;
  description?: string;
  category?: string;
  order?: number;
  sections?: ComplianceSection[];
  inspection_id?: string;
  original_form_id?: string;
  team_id?: string;
  is_published?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComplianceSection {
  id: string;
  name: string;
  description?: string;
  order: number;
  is_repeatable: boolean;
  layout_structure?: any;
  fields?: ComplianceField[];
  instances?: ComplianceSectionInstance[];
  created_at: string;
  updated_at: string;
}

export interface ComplianceField {
  id: string;
  label: string;
  field_type: string;
  help_text?: string;
  is_required: boolean;
  scope?: string;
  options?: any;
  max_length?: number;
  allow_multiple?: boolean;
  auto_populate_rule?: string;
  default_value?: any;
  accepted_file_types?: string[];
  order: number;
  responses?: ComplianceResponse[];
  team_value?: any;
  created_at: string;
  updated_at: string;
}

export interface ComplianceResponse {
  id: string;
  inspection_id: string;
  inspection_field_id: string;
  section_instance?: number;
  value_type: string;
  value: any;
  file?: { id: string; name: string; url: string; mime_type: string; size: number };
  is_auto_populated: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComplianceSectionInstance {
  id: string;
  inspection_id: string;
  inspection_compliance_form_id: string;
  section_id: string;
  instance_number: number;
  instance_label?: string;
  order: number;
  responses?: ComplianceResponse[];
  created_at: string;
  updated_at: string;
}

// === Branch Types ===

export interface Branch {
  id: string;
  team_id: string;
  name: string;
  slug?: string;
  is_default?: boolean;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  phone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// === Client Types ===

export interface ClientLogo {
  id: string;
  url: string;
  thumbnail_url?: string;
}

export interface Client {
  id: string;
  name: string;
  kind?: string | null;
  is_active: boolean;
  group_id?: string | null;
  group?: ClientGroup;
  default_branch_id?: string | null;
  default_branch?: Branch;
  branches?: Branch[];
  default_inspection_depth?: string | null;
  logo: ClientLogo | null;
  properties_count?: number;
  inspections_count?: number;
  /** Only returned to Team tokens and users with clients.manage. */
  contact?: { name?: string | null; email?: string | null; phone?: string | null };
  /** Only returned to Team tokens and users with clients.manage. */
  delivery?: { method?: string | null; email?: string | null; paused: boolean };
  /** Only returned to Team tokens and users with clients.manage. */
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientGroup {
  id: string;
  name: string;
  type?: string | null;
  color?: string | null;
  website?: string | null;
  logo: ClientLogo | null;
  clients_count?: number;
  properties_count?: number;
  inspections_count?: number;
  clients?: Client[];
  created_at: string;
  updated_at: string;
}

export interface ClientListParams extends ListParams {
  /** "mine" or "all" ("all" requires clients.manage). */
  scope?: 'mine' | 'all';
}

// === Hazard / Vocabulary Sync Types ===

export interface HazardRule {
  type: string;
  label: string;
  in_force_from: string;
  investigate_days: number;
  summary_days: number;
  work_days: number;
}

export interface HazardSync {
  hazard_wordings: any[];
  nations: Array<{ nation: string; hazards: HazardRule[] }>;
  excluded_property_types: string[];
  not_hazards: string[];
  last_sync: string;
}

export interface VocabularySync {
  version: string;
  vocabulary: Record<string, any>;
}

// === Template Types ===

export interface PropertyTemplate {
  id: string;
  name: string;
  description?: string;
  property_type?: PropertyType;
  is_default: boolean;
  order?: number;
  areas?: any[];
  created_at: string;
  updated_at: string;
}

// === Component Types ===

export interface Component {
  id: string;
  name: string;
  category?: string;
  description?: string;
  order?: number;
  is_default: boolean;
  parent_id?: string;
  type?: string;
  children?: Component[];
  items?: Component[];
  elements?: Component[];
  created_at: string;
  updated_at: string;
}

// === Team Types ===

export interface TeamAddress {
  line_1: string | null;
  line_2: string | null;
  city: string | null;
  county: string | null;
  postcode: string | null;
  country: string | null;
}

export interface TeamSubscription {
  subscribed: boolean;
  on_trial: boolean;
  on_grace_period: boolean;
  stripe_status: string | null;
  trial_ends_at: string | null;
  bypasses_subscription: boolean;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  business_type: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: TeamAddress;
  logo_url: string | null;
  primary_color: string | null;
  subscription: TeamSubscription;
  condition_options: Array<Record<string, any>>;
  cleanliness_options: Array<Record<string, any>>;
  inspection_settings: Record<string, any>;
  inspection_hours: Record<string, any>;
  created_at: string | null;
}

// === User Types ===

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  initials?: string;
  email: string;
  avatar?: string;
  email_verified_at?: string;
  current_team_id: string;
  two_factor_enabled: boolean;
  current_team?: Team;
  team_membership?: { role: string; is_owner: boolean; is_manager: boolean };
  permissions?: string[];
  access?: any;
  teams?: Team[];
  created_at: string;
}

// === Address Lookup Types ===

export interface AddressLookupResult {
  postcode: string;
  addresses: AddressResult[];
  count: number;
  provider?: string;
}

export interface AddressResult {
  id?: string;
  line_1: string;
  line_2?: string;
  town_or_city?: string;
  county?: string;
  postcode: string;
  formatted?: string;
  location?: Location;
}

// === Stats Types ===

export interface Stats {
  [key: string]: any;
}

// === Phrase Types ===

export interface Phrase {
  id: string;
  text: string;
  category: PhraseCategory;
  context?: string;
  usage_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePhraseData {
  text: string;
  category: PhraseCategory;
  context?: string;
}

// === Modifier Types ===

export interface Modifier {
  id: string;
  type: ModifierType;
  value: string;
  category?: string;
  is_custom?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCustomModifierData {
  type: ModifierType;
  value: string;
  category?: string;
}

// === Scribe Types ===

export interface AiStatus {
  enabled: boolean;
  policy?: ScribePolicy;
  processing_status?: string;
  photos_to_process?: number;
  photos_processed?: number;
  processing_started_at?: string;
  processing_completed_at?: string;
}

// === Scheduler Types ===

export interface SchedulerCalendar {
  [key: string]: any;
}

// === Pagination & Query Types ===

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface ListParams {
  filter?: Record<string, string>;
  include?: string | string[];
  sort?: string;
  per_page?: number;
  page?: number;
}
