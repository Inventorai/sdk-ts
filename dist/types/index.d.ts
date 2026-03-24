export type PropertyType = 'flat' | 'house' | 'hmo' | 'studio' | 'commercial' | 'land';
export type InspectionType = 'move_in' | 'move_out' | 'periodic' | 'vacant' | 'pre_tenancy' | 'landlord_only' | 'between_tenancies';
export type Condition = 'very_poor' | 'poor' | 'fair' | 'good' | 'new';
export type Cleanliness = 'dirty' | 'needs_cleaning' | 'acceptable' | 'clean' | 'very_clean';
export type MeterType = 'gas' | 'electricity' | 'water' | 'other';
export type KeyFobType = 'front_door_key' | 'back_door_key' | 'mailbox_key' | 'window_key' | 'entry_fob' | 'garage_remote' | 'gate_remote' | 'other';
export type DefectSeverity = 'cosmetic' | 'minor' | 'moderate' | 'major' | 'critical';
export type DefectStatus = 'open' | 'assigned' | 'fixed' | 'verified' | 'closed';
export type DefectableType = 'area' | 'item' | 'element';
export type ModifierType = 'brand' | 'size' | 'type' | 'accessory';
export type PhraseCategory = 'area' | 'item' | 'element';
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
    id: number;
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
export interface Property {
    id: number;
    address: Address;
    location?: Location;
    property_type: PropertyType;
    residential: boolean;
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
    residential: boolean;
}
export interface Landlord {
    id: number;
    name: string;
    type?: string;
    company_name?: string;
    email?: string;
    alternative_email?: string;
    phone?: string;
    mobile_phone?: string;
    emergency_contact?: {
        name: string;
        phone: string;
    };
    address?: Address;
    registration?: {
        number: string;
        expiry: string;
    };
    properties_count?: number;
    created_at: string;
    updated_at: string;
}
export interface Tenancy {
    id: number;
    property_id: number;
    start_date: string;
    end_date?: string;
    status: string;
    notes?: string;
    hmo_configuration?: any;
    lead_tenant?: {
        id: number;
        name: string;
        email: string;
    };
    tenants_count?: number;
    created_at: string;
    updated_at: string;
}
export interface Inspection {
    id: number;
    property_id: number;
    property?: Property;
    inspector?: {
        id: number;
        name: string;
        email: string;
    };
    type: InspectionType;
    status: string;
    is_archived: boolean;
    archived_at?: string;
    tenancy_id?: number;
    requires_tenancy: boolean;
    inspection_date?: string;
    inspection_time?: string;
    inspection_end_time?: string;
    inspection_depth?: string;
    elements_enabled: boolean;
    baseline_inspection_id?: number;
    previous_inspection_id?: number;
    completion_requirements?: {
        require_ratings: boolean;
        require_photos: boolean;
        require_meters: boolean;
        require_keys: boolean;
        require_compliance: boolean;
    };
    lock_status?: {
        status: string;
        locked_by?: number;
        device_name?: string;
        locked_at?: string;
        last_activity_at?: string;
    };
    finalized?: {
        at?: string;
        by?: {
            id: number;
            name: string;
        };
    };
    statistics?: {
        total_defects: number;
        critical_defects: number;
        total_photos: number;
    };
    ai_mode?: {
        enabled: boolean;
        processing_status?: string;
        photos_to_process?: number;
        photos_processed?: number;
        processing_started_at?: string;
        processing_completed_at?: string;
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
    compliance_forms?: ComplianceForm[];
    cover_image?: CoverImage;
    created_at: string;
    updated_at: string;
}
export interface CreateInspectionData {
    property_id: number;
    tenancy_id?: number;
    type: InspectionType;
    inspection_date?: string;
    inspection_time?: string;
    inspection_end_time?: string;
    inspector_id?: number;
    comparison_inspection_id?: number;
    is_comparison?: boolean;
    duplicate_media?: boolean;
    ai_mode_enabled?: boolean;
}
export interface RescheduleInspectionData {
    inspection_date: string;
    inspection_time?: string;
    inspection_end_time?: string;
}
export interface FinalizeInspectionData {
    [key: string]: any;
}
export interface InspectionArea {
    id: string;
    inspection_id: number;
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
export interface Defect {
    id: string;
    inspection_id: number;
    defectable_type: DefectableType;
    defectable_id: string;
    title: string;
    description?: string;
    location_notes?: string;
    severity?: DefectSeverity;
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
    severity?: DefectSeverity;
    category?: string;
    photo_ids?: string[];
}
export interface UpdateDefectData {
    title?: string;
    description?: string;
    location_notes?: string;
    severity?: DefectSeverity;
    category?: string;
    status?: DefectStatus;
    photo_ids?: string[];
}
export interface MeterReading {
    id: string;
    inspection_id: number;
    meter_type: MeterType;
    meter_location?: string;
    meter_serial?: string;
    reading?: number;
    reading_unit?: string;
    reading_date?: string;
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
    reading_date?: string;
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
    reading_date?: string;
    notes?: string;
    meter_balance?: number;
    is_prepaid?: boolean;
}
export interface KeyFob {
    id: string;
    inspection_id: number;
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
export interface ComplianceForm {
    id: number;
    name: string;
    description?: string;
    category?: string;
    order?: number;
    sections?: ComplianceSection[];
    inspection_id?: number;
    original_form_id?: number;
    team_id?: number;
    is_published?: boolean;
    created_at: string;
    updated_at: string;
}
export interface ComplianceSection {
    id: number;
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
    id: number;
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
    id: number;
    inspection_id: number;
    inspection_field_id: number;
    section_instance?: number;
    value_type: string;
    value: any;
    file?: {
        id: number;
        name: string;
        url: string;
        mime_type: string;
        size: number;
    };
    auto_populated: boolean;
    created_at: string;
    updated_at: string;
}
export interface ComplianceSectionInstance {
    id: number;
    inspection_id: number;
    inspection_compliance_form_id: number;
    section_id: number;
    instance_number: number;
    instance_label?: string;
    order: number;
    responses?: ComplianceResponse[];
    created_at: string;
    updated_at: string;
}
export interface PropertyTemplate {
    id: number;
    name: string;
    description?: string;
    property_type?: PropertyType;
    is_default: boolean;
    order?: number;
    areas?: any[];
    created_at: string;
    updated_at: string;
}
export interface Component {
    id: number;
    name: string;
    category?: string;
    description?: string;
    order?: number;
    is_default: boolean;
    parent_id?: number;
    type?: string;
    children?: Component[];
    items?: Component[];
    elements?: Component[];
    created_at: string;
    updated_at: string;
}
export interface Team {
    id: number;
    name: string;
    slug?: string;
    business_type?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: Address;
    logo_url?: string;
    primary_color?: string;
    subscription?: {
        tier: string;
        status: string;
    };
    condition_options?: any;
    cleanliness_options?: any;
    inspection_settings?: any;
    inspection_hours?: any;
    created_at: string;
}
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    initials?: string;
    email: string;
    avatar?: string;
    email_verified_at?: string;
    current_team_id: number;
    two_factor_enabled: boolean;
    current_team?: Team;
    team_membership?: {
        role: string;
        is_owner: boolean;
        is_manager: boolean;
    };
    permissions?: string[];
    access?: any;
    teams?: Team[];
    created_at: string;
}
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
export interface Stats {
    [key: string]: any;
}
export interface Phrase {
    id: number;
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
export interface Modifier {
    id: number;
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
export interface AiStatus {
    enabled: boolean;
    processing_status?: string;
    photos_to_process?: number;
    photos_processed?: number;
    processing_started_at?: string;
    processing_completed_at?: string;
}
export interface SchedulerCalendar {
    [key: string]: any;
}
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
//# sourceMappingURL=index.d.ts.map