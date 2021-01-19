import { GenericRecord } from '@/modules/core/data/record';
import { AirtableDBTable } from './AirtableDBTable';
import { RawAirtableAttachmentBaseFields } from './RawAirtableAttachmentBaseFields';
import { RawAirtableRecord } from './RawAirtableRecord';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { RawAirtableDataset } from '@/modules/core/data/types/RawAirtableDataset';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { AirtableSchema } from './AirtableSchema';
import { TableSchema } from './TableSchema';

/**
 * Input props received by all "pre-sanitization" functions that are called at the beginning of the sanitization process.
 */
export type GenericPreSanitizationValueInputProps<Fields extends GenericRecord = GenericRecord> = {
  airtableSchema: AirtableSchema;
  rawAirtableDataset: RawAirtableDataset;
  tableName: string;
  tableSchema: TableSchema;
  fieldSchemaName: string;
  fieldName: string;
  fieldSchema: FieldSchema;
  rawFieldValue: any;
  sanitizedFieldValue: any;
  rawRecord: RawAirtableRecord<Fields>;
  preferredLocalesOrLanguages: string[];
};

/**
 * Input props received by all "post-sanitization" functions that are called at the beginning of the sanitization process.
 */
export type GenericPostSanitizationValueInputProps<Fields extends GenericRecord = GenericRecord> = GenericPreSanitizationValueInputProps & {
  sanitizedRecord: AirtableRecord<Fields>;
};

/**
 * Input props received by all "post-consolidation" functions that are called at the end of the consolidation process.
 */
export type GenericPostConsolidationTransformationValueInputProps<Fields extends GenericRecord = GenericRecord> = {
  airtableSchema: AirtableSchema;
  sanitizedDataset: SanitizedAirtableDataset;
  tableName: string;
  tableSchema: TableSchema;
  fieldSchemaName: string;
  fieldName: string;
  fieldSchema: FieldSchema;
  sanitizedFieldValue: any;
  sanitizedRecord: AirtableRecord<Fields>;
};

export const UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY_REMOVE = 'remove';
export const UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY_KEEP = 'keep';
export const DEFAULT_UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY: UnresolvedRelationshipReferenceStrategy = UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY_REMOVE;
export type UnresolvedRelationshipReferenceStrategy =
  typeof UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY_REMOVE
  | typeof UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY_KEEP;

/**
 * Represents the schema of an Airtable field.
 *
 * This allows to describe a field coming from Airtable API.
 * The field is then automatically consolidated and consolidated, so that it is easier to manipulate thorough the app. (DX)
 * In particular, it allows to define and automatically resolve relationships.
 */
export type FieldSchema = {
  /**
   * Whether the field is an i18n field.
   *
   * A field marked as i18n is considered a generic i18n field. (in opposition with a specific i18n field, which is related to only one language)
   * Generic i18n fields don't really exist in Airtable, but the app expects to have one localised field per language.
   *
   * @example "label" might be marked as an i18n field.
   *  The app would use "label", but airtable would only contain "labelEN" and "labelFR". ("label" is the generic field)
   *
   * Marking a field as i18n field will:
   *  - Modify the Airtable API "fields" parameter to automatically include i18n fields (e.g: labelFR instead of label).
   *  - Automatically resolve the best available translation based on the preferred languages.
   *  - Make such best translation available as a generic i18n field (e.g: "label" instead of "labelFR/labelEN")
   *    so that you just use the generic value ("label") and benefit from the best translation right away.
   *  - I18n specific fields are deleted once the generic i18n field has been resolved, to avoid data clutter. (DX)
   *
   * I18n fields can be renamed. (through the "renameAs" option)
   * In such cases, only the generic field will be renamed
   *
   * @default false
   */
  isI18n?: boolean;

  /**
   * Whether the field is virtual.
   *
   * A virtual field doesn't exist on Airtable and thus won't be fetched amongst other fields.
   *
   * Virtual fields allow to change the field data structure based on your own business logic.
   * For instance, they can be used to represent a relationship that doesn't exist on Airtable, but would be useful to the application.
   *
   * XXX Coupled with "consolidations", virtual fields can become runtime-computed fields resolved from other sanitized airtable records.
   *  It's a way to easily extend your Airtable raw data structure.
   */
  isVirtual?: boolean;

  /**
   * If specified, means it should map to another table and resolve relationships
   *
   * XXX Relationships are resolved at last, not until all tables have been fetched
   */
  relationship?: {
    /**
     * Relationship table to map to
     *
     * XXX This information wouldn't technically be a requirement, but we decided to do so by design, and to enforce it,
     *  in order to improve DX when reading the schema (easier to make sense of it)
     */
    table: AirtableDBTable;

    /**
     * Defines the strategy to apply when a relationship cannot be resolved.
     *
     * A relationship might not be resolved when its record isn't fetched.
     * For instance, when applying top-level filters through "filterByFormula".
     *
     * Use-case example:
     *  With a "Customer" entity with a "contacts" field of type "Contact[]".
     *  With the "Contact" table schema using filterByFormula=`{status} = 'published'`
     *  This means only contacts with status="published" will be fetched through the API.
     *  But, a "customer.contacts" might contain values (airtable ids) about contacts that aren't "published".
     *  Therefore, those references won't resolve, because we don't hold the information.
     *  And that's when unresolvedRelationshipReferenceStrategy is used, to know what to do about the unresolved reference.
     *
     * @example 'remove': The unresolved id will be removed, and will not be contained in the consolidated data.
     * @example 'keep': The unresolved id will be kept, and will be contained in the consolidated data.
     *
     * @default 'remove'
     */
    unresolvedRelationshipReferenceStrategy?: UnresolvedRelationshipReferenceStrategy;
  };

  /**
   * Transformations applied during the sanitization phase of the raw dataset.
   *
   * The transformations don't mutate the "raw dataset", they're applied on the "sanitized raw dataset".
   * They are only applied to the fields that are described in the schema, not the fields that are fetched from the Airtable API.
   */
  transformations?: {
    /**
     * If true, will transform the array returned by airtable into a single record, by keeping only the first result
     *
     * If a relationship is not explicitly described as single, then it's implicitly considered as multiple.
     */
    asSingleRecord?: boolean;

    /**
     * Handles Airtable native attachments
     *
     * We provide a way to handle "extended attachment" on the TableSchema, but we still handle native attachments as fields here
     */
    asAttachment?: {

      /**
       * If set, will only keep the url field of the attachment, ignoring other fields (size, filename, etc.)
       * If not set, all fields are kept.
       *
       * @see RawAirtableAttachmentBaseFields for complete list of native Airtable attachment field
       */
      fields?: (keyof RawAirtableAttachmentBaseFields)[];
    }

    /**
     * Rename the field using another name than the one used by Airtable API for further usage thorough the app.
     */
    renameAs?: string;

    /**
     * If defined, will transform the raw value dynamically based on your own business logic.
     * Executed before defaultRawValue.
     * Executed at the very beginning of the sanitization phase.
     *
     * @example Great for computing the value based on other raw fields.
     * @example Great to convert a data type into another data type right at the beginning.
     */
    transformRawValue?: ((props: GenericPreSanitizationValueInputProps) => any);

    /**
     * If defined and if the raw value is null|undefined, then will use the defined value.
     * Executed after transformRawValue.
     * Executed at the very beginning of the sanitization phase.
     *
     * It can also be a function that resolves the default value dynamically based on your own business logic.
     *
     * @example Great for computing the default value to use when airtable doesn't contain any value.
     */
    defaultRawValue?: any | ((props: GenericPreSanitizationValueInputProps) => any);

    /**
     * If defined, will transform the sanitized value dynamically based on your own business logic.
     * Executed before defaultSanitizedValue.
     * Executed at the very end of the sanitization phase.
     *
     * @example Great for computing the value based on other raw fields, or own sanitized fields that already have been sanitized. (fields described before are sanitized before, order matters)
     */
    transformSanitizedValue?: ((props: GenericPostSanitizationValueInputProps) => any);

    /**
     * If defined and if the sanitized value is null|undefined, then will use the defined value.
     * Executed after transformSanitizedValue.
     * Executed at the very end of the sanitization phase.
     *
     * It can also be a function that resolves the default value dynamically based on your own business logic.
     *
     * @example Great for computing the value based on other raw fields, or own sanitized fields that already have been sanitized. (fields described before are sanitized before, order matters)
     */
    defaultSanitizedValue?: any | ((props: GenericPostSanitizationValueInputProps) => any);
  };

  /**
   * Consolidations applied during the consolidation phase of a sanitized record.
   *
   * XXX If you need to compute your data based on the sanitized dataset, it's where it should be done.
   *
   * The consolidation phase is the last phase. It is also an optional phase.
   * During consolidation, the relationships are resolved, using the sanitized dataset.
   *
   * The consolidations mutate the sanitized dataset.
   * They are only applied to the fields that are described in the schema, not the fields that are fetched from the Airtable API.
   */
  consolidations?: {
    /**
     * If defined, will transform the consolidated value dynamically based on your own business logic.
     * Executed before defaultConsolidatedValue.
     * Executed at the very end of the consolidation phase.
     *
     * @example Great to compute the value based on other sanitized fields
     */
    transformConsolidatedValue?: ((props: GenericPostConsolidationTransformationValueInputProps) => any);

    /**
     * If defined and if the consolidated value is null|undefined, then will use the defined value.
     * Executed after transformConsolidatedValue.
     *
     * It can also be a function that resolves the default value dynamically based on your own business logic.
     */
    defaultConsolidatedValue?: any | ((props: GenericPostConsolidationTransformationValueInputProps) => any);
  }
};
