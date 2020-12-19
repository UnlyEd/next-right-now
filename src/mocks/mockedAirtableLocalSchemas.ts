import { AirtableSchema } from '../types/airtableDataset/AirtableSchema';

/**
 * This mocked schema represents an Asset, and is meant to be used to test out extended attachment table.
 */
export const mockedAirtableLocalSchemaAsset: AirtableSchema = {
  Asset: {
    fields: {
      ref: {},
      asset: {},
      width: {},
      height: {},
      title: {},
      alt: {},
      linkUrl: {},
      linkTarget: {},
    },
    isExtendedAttachmentTable: true,
    attachmentFieldName: 'asset',
  },
};

/**
 * This mocked schema represents a Customer, and is meant to be used to test out basic transformations.
 *  - default built-in enforced value
 */
export const mockedAirtableLocalSchemaCustomer: AirtableSchema = {
  Customer: {
    fields: {
      someFieldThatDoesNotExist: {},
      someFieldThatDoesNotExist2: {
        relationship: {
          table: 'Theme',
        },
      },
    },
  },
};
