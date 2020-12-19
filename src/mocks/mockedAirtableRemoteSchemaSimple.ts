import { AirtableSchema } from '../types/airtableDataset/AirtableSchema';
import { GenericPostSanitizationValueInputProps } from '../types/airtableDataset/FieldSchema';
import { Customer } from '../types/data/Customer';
import { mockedSimpleCustomerRef } from './mockedCustomer';

/**
 * This mocked schema is rather simple and is meant to be used to test simplest use-cases.
 * It is a remote schema, meaning it'll be used to fetch Airtable API for real, and must therefore contain a valid schema description.
 * It doesn't contains nested relationships with other entities.
 */
export const mockedAirtableRemoteSchemaSimple: AirtableSchema = {
  Customer: {
    filterByFormula: `{ref} = '${mockedSimpleCustomerRef}'`,
    fields: {
      ref: {
        transformations: {
          transformSanitizedValue: (props: GenericPostSanitizationValueInputProps): string => {
            const { rawFieldValue } = props;
            return 'pre-transformed-' + (rawFieldValue || '');
          },
        },
      },
      cmsLogo: {
        transformations: {
          asSingleRecord: true,
          asAttachment: {
            fields: ['url'],
          },
        },
      },
      label: {
        isI18n: true,
      },
      labelShort: {
        isI18n: true,
        transformations: {
          defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<Customer>): string => {
            const { rawRecord } = props;
            return rawRecord.fields.labelShort ?? rawRecord.fields.label;
          },
        },
      },
      previewBaseUrl: {
        transformations: {
          defaultRawValue: 'https://unly.org',
          renameAs: 'previewBaseUrl2',
        },
      },
      productionBaseUrl: {
        transformations: {
          defaultRawValue: 'https://unly.org',
          defaultSanitizedValue: 'should-not-be-applied',
        },
      },
      stackerBaseUrl: {
        transformations: {
          transformRawValue: (props: GenericPostSanitizationValueInputProps<Customer>): string => {
            const { rawRecord } = props;
            return rawRecord.fields.productionBaseUrl;
          },
        },
      },
      availableLanguages: {
        transformations: {
          defaultSanitizedValue: ['fr'],
        },
      },
      theme: {
        relationship: {
          table: 'Theme',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
    },
  },
  Theme: {
    filterByFormula: `{customerOwnerRef} = '${mockedSimpleCustomerRef}'`,
    fields: {
      primaryColor: {},
      primaryColorVariant1: {},
    },
  },
};
