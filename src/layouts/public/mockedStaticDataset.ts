import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';

const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;

/**
 * This mocked static dataset is used by the "public" layout to start the app with the minimalist amount of data.
 *
 * XXX The "Customer" entity represents a "Tenant" in a multi-tenancy system. It's basically the owner of a site.
 *  Each Customer has its own website, with its own data.
 *
 * Fields required by NRN to function properly by default (they can be hardcoded if you only have one Customer, or fetched from a DB if you have many)
 * - 'ref': Identifier of the customer. Use by analytics, monitoring, etc.
 * - 'availableLanguages': List of languages the website is available in, static pages will be generated for all listed languages.
 * - '__typename': Must be "Customer". You can rename it if you wish to, but you'll need to adapt the code in various places.
 *
 * @see https://unlyed.github.io/next-right-now/concepts/tenancy.html#tenancy-st-mt-ht-and-mst
 */
export const mockedStaticDataset: SanitizedAirtableDataset = {
  mockedId: {
    ref: customerRef,
    availableLanguages: ['en'], // Necessary to generate the static pages and serve SSR pages, for those languages
    __typename: 'Customer', // Necessary to find the customer object within the mocked dataset
  } as AirtableRecord<Customer>, // TS casting is necessary because we don't provide all properties
};
