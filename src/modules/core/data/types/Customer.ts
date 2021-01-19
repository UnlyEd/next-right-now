import { I18nMarkdown } from './I18nMarkdown';
import { I18nString } from './I18nString';
import { Markdown } from './Markdown';
import { AirtableRecord } from './AirtableRecord';
import { Product } from './Product';
import { Theme } from './Theme';

/**
 * Sanitized Customer Airtable record.
 *
 * A consolidated record has gone through the "sanitizeRecord" function.
 * Only useful or allowed fields are mapped below.
 * Other fields have been filtered out during sanitization and thus aren't part of the shape even though they exist on Airtable.
 * Some fields are filtered out because we don't want them to be shared with the client-side (sensitive information).
 * Some fields are just not useful within this application and are not represented to avoid complicating things.
 */
export type Customer = {
  ref: string;
  label: I18nString;
  labelEN?: string;
  labelFR?: string;
  availableLanguages: string[];
  products?: AirtableRecord<Product>[];
  theme: AirtableRecord<Theme>;
  serviceLabel?: string;
  termsDescription?: I18nMarkdown;
  termsDescriptionEN?: Markdown;
  termsDescriptionFR?: Markdown;
  privacyDescription?: I18nMarkdown;
  privacyDescriptionEN?: Markdown;
  privacyDescriptionFR?: Markdown;
};
