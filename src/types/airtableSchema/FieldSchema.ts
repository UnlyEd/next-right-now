import { GenericRecord } from '../../utils/data/record';
import { AirtableDBTable } from '../airtableDataset/AirtableDBTable';
import { RawAirtableRecord } from '../airtableNativeAPI/RawAirtableRecord';
import { AirtableDatasets } from '../data/AirtableDatasets';
import { AirtableRecord } from '../data/AirtableRecord';
import { TableSchema } from './TableSchema';
import { TablesSchema } from './TablesSchema';

export type BaseTransformValueInputProps<Fields extends GenericRecord = GenericRecord> = {
  tableName: string,
  tableSchema: TableSchema,
  fieldSchema: FieldSchema,
  rawFieldName: string,
  rawFieldValue: any,
  sanitizedFieldName: string,
  sanitizedFieldValue: any,
  airtableRecord: RawAirtableRecord<Fields>,
  sanitizedRecord: AirtableRecord<Fields>,
  datasets: AirtableDatasets,
  preferredLocales: string[],
  tablesSchema: TablesSchema,
};

export type FieldDefaultValueInputProps<Fields extends GenericRecord = GenericRecord> = BaseTransformValueInputProps<Fields>;
export type FieldTransformValueInputProps<Fields extends GenericRecord = GenericRecord> = BaseTransformValueInputProps<Fields>;
export type FieldPreTransformValueInputProps<Fields extends GenericRecord = GenericRecord> = Omit<BaseTransformValueInputProps<Fields>,
  'rawFieldName'
  | 'rawFieldValue'
  | 'sanitizedFieldName'
  | 'sanitizedFieldValue'> & {
  fieldName: string,
  fieldValue: any,
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
 * The field is then automatically consolidated and sanitized, so that it is easier to manipulate thorough the app. (DX)
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
   * Coupled with "transformValue" transformation, virtual fields can become computed fields at runtime and can stored about any kind of data (attachment, relationship, scalar, etc.)
   */
  isVirtual?: boolean;

  /**
   * Handles Airtable native attachments
   *
   * We provide a way to handle "extended attachment" on the TableSchema, but we still handle native attachments as fields here
   */
  attachment?: {
    /**
     * Whether the field is an airtable attachment
     */
    isAttachment?: boolean;

    /**
     * If set, will only keep the url field of the attachment, ignoring other fields (size, filename, etc.)
     * If not set, all fields are kept.
     *
     * @see RawAirtableAttachmentBaseFields for complete list of native Airtable attachment field
     */
    fields?: string[];
  }

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
     * @example 'remove': The unresolved id will be removed, and will not be contained in the sanitized data.
     * @example 'keep': The unresolved id will be kept, and will be contained in the sanitized data.
     *
     * @default 'remove'
     */
    unresolvedRelationshipReferenceStrategy?: UnresolvedRelationshipReferenceStrategy;
  }

  /**
   * Transformations applied before any consolidation or sanitization. (pre-transformations)
   * The pre-transformation change the raw record directly, which will then be transformed, as if it had been fetched from Airtable directly.
   *
   * XXX They are only applied to the fields that are described in the schema, not the fields that are fetched from the Airtable API
   */
  preTransformations?: {
    /**
     * If defined, will transform the raw value dynamically based on your own business logic.
     *
     * The transformed value can be of any type.
     *
     * Similar to "defaultValue", but "transformValue" is executed no matters what,
     * unlike "defaultValue" which is only applied when the value evaluates to null | undefined.
     */
    transformValue?: ((props: FieldPreTransformValueInputProps) => any);
  },

  /**
   * Transformations applied during consolidation and sanitization. (post-transformations)
   * The post-transformations update the sanitized record, never the raw record.
   *
   * XXX They are only applied to the fields that are described in the schema, not the fields that are fetched from the Airtable API
   */
  transformations?: {
    /**
     * If true, will transform the array returned by airtable into a single record, by keeping only the first result
     */
    isSingleRecord?: boolean;

    /**
     * If defined, will use the defined default value if the value evaluates to null | undefined.
     *
     * The default value can be of any type.
     * It can also be a function that resolves the default value dynamically based on your own business logic.
     */
    defaultValue?: any | ((props: FieldDefaultValueInputProps) => any);

    /**
     * Rename the field using another name than the one used by Airtable API for further usage thorough the app.
     */
    renameAs?: string;

    /**
     * If defined, will transform the value dynamically based on your own business logic.
     *
     * The transformed value can be of any type.
     *
     * Similar to "defaultValue", but "transformValue" is executed no matters what,
     * unlike "defaultValue" which is only applied when the value evaluates to null | undefined.
     */
    transformValue?: ((props: FieldTransformValueInputProps) => any);
  }
};
