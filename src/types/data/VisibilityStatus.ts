/**
 * Whether the record will be displayed or hidden to the end-users.
 */
export const VISIBILITY_STATUS_ARCHIVED = 'Archivé';
export const VISIBILITY_STATUS_DRAFT = 'Brouillon';
export const VISIBILITY_STATUS_PUBLISHED = 'Publié';

export type VisibilityStatus = typeof VISIBILITY_STATUS_ARCHIVED | typeof VISIBILITY_STATUS_DRAFT | typeof VISIBILITY_STATUS_PUBLISHED;
