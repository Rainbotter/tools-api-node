import {CollectionsModel} from "../models/constants/Collections.model";

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
