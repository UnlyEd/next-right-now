import { AirtableSchema } from './types/AirtableSchema';
import { GenericPostConsolidationTransformationValueInputProps } from './types/FieldSchema';

type Props = {}

/**
 * Airtable database schema used thorough the whole app.
 *
 * This schema describes all fields of our local model, which maps the fields returned by the Airtable API.
 * All tables you want to fetch must be described below.
 *
 * Each table describes the fields that should be fetched.
 * Fields that aren't described will not be fetched.
 *
 * Each field can describe its own data processing.
 *
 * XXX This function can be called from the client and the server.
 *  But, in practice, it's only called by the server.
 *  Hence, all "transformations" function are only called on the server-side.
 *  Be mindful of that when manipulating fields that are computed by Airtable.
 *  Because fields that are computed by Airtable will become "stale" in production.
 *  Time-related fields in particular, are very subject to that:
 *    - e.g: fields based on a computed property "isExpired" will be correct when fetched, but will become stale afterwards, and aren't reliable.
 *  This is a concern for the production environment only, as staging/development use real-time API requests and thus use up-to-date content.
 */
export const getAirtableSchema = (props?: Props): AirtableSchema => {

  return {
    Customer: {
      filterByFormula: `{ref} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
      fields: {
        ref: {},
        label: {
          isI18n: true,
        },
        availableLanguages: {
          transformations: {
            defaultSanitizedValue: ['en'],
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
        products: {
          relationship: {
            table: 'Product',
          },
        },
        serviceLabel: {},
        termsDescription: {
          isI18n: true,
        },
        privacyDescription: {
          isI18n: true,
        },
      },
    },
    Product: {
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
      fields: {
        // id: {},
        ref: {},
        title: {
          isI18n: true,
        },
        images: {},
        imagesTitle: {
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): string[] => {
              const { sanitizedRecord: product } = props;
              return product?.imagesTitle?.split(', ') || [];
            },
          },
        },
        description: {
          isI18n: true,
        },
        price: {},
        status: {},
      },
    },
    Theme: { // XXX Theme default values are handled through initCustomerTheme
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
      fields: {
        primaryColor: {},
        primaryColorVariant1: {},
        onPrimaryColor: {},
        secondaryColor: {},
        secondaryColorVariant1: {},
        onSecondaryColor: {},
        backgroundColor: {},
        onBackgroundColor: {},
        surfaceColor: {},
        onSurfaceColor: {},
        errorColor: {},
        onErrorColor: {},
        fonts: {},
        logo: {
          transformations: {
            asSingleRecord: true,
          },
        },
        logoTitle: {},
      },
    },
  };
};
