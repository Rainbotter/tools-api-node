import {CollectionsModel} from "../models/constants/collections.model";
import {HeadersModel} from "../models/constants/headers.model";

export const DEFAULT_PORT: string = "3000";

export const COLLECTIONS: CollectionsModel = {
    OVERHAULS_COLLECTION: "overhauls",
    LABELS_COLLECTION: "labels",
    LABELS_IMPORT_COLLECTION: "labels_import",
    LABELS_LOCK_COLLECTION: "labels_lock",
    LABELS_BACKUP_COLLECTION: "labels_backup",
    AUDIT_EVENTS_COLLECTION: "audit_events",
    COUNTRIES_COLLECTION: "countries",
    PROVIDERS_COLLECTION: "providers",
    RESSOURCES_COLLECTION: "ressources",
    APPLICATION_STATES_COLLECTION: "application_states",
    APPLICATIONS_STATUS_COLLECTION: "applications_status",
    APPLICATIONS_ACCESS_COLLECTION: "applications_access"
};

export const HEADERS: HeadersModel = {
    HEADER_IV_APP: "IV-APP",
    HEADER_IV_APP_ID: "IV-APP-ID",
    HEADER_IV_ORG: "IV-ORG",
    HEADER_IV_ORG_ID: "IV-ORG-ID",
    HEADER_IV_USER: "IV-USER",
    HEADER_IV_GROUPS: "IV-GROUPS"
};
