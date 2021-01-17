/**
 * Represents the schema of an Airtable table.
 *
 * This allows to describe a table coming from Airtable API.
 * All fields we want to fetch must be described.
 *
 * It is also possible to configure a top-level filter (filterByFormula),
 * which is very useful to avoid fetching records that aren't related to the current customer, in a multi-tenant app.
 */
import { FieldSchema } from './FieldSchema';

export type TableSchema = {
  /**
   * Airtable API fields
   *
   * XXX If the field doesn't exist, it'll throw an "Unprocessable entity" 422 error
   */
  fields: {
    [fieldName: string]: FieldSchema;
  };

  /**
   * If set, will forward the formula to the Airtable API, which uses it to filter records returned by the API.
   *
   * @see You can use Airtable API URL Encoder to test your formula https://codepen.io/airtable/full/rLKkYB?baseId=appkXdSRSUx4SD1ao&tableId=tbljNLdsunj8TRdQu
   */
  filterByFormula?: string;

  /**
   * If undefined, uses the table name suffixed by "s" as default value.
   */
  plural?: string;

  /**
   * If true, then the table is considered as an extended Airtable Attachment.
   *
   * An extended attachment means the table represents an attachment that has been extended to store some business-related additional properties.
   * Useful to provide a similar user experience through an "Asset" table for all assets thorough the app, for instance.
   */
  isExtendedAttachmentTable?: boolean;

  /**
   * Unused unless the field is an extended Airtable Attachment, contains the name of the field that stores the attachment.
   */
  attachmentFieldName?: string;
};
