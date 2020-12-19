import { AirtableDatasets } from '../types/data/AirtableDatasets';

/**
 * Airtable records set related to mockedSimpleCustomerRef.
 */
export const mockedAirtableDatasetsSimpleAfterSanitization: AirtableDatasets = {
  raw: {
    recWsknIckhqXieD2: {
      id: 'recWsknIckhqXieD2',
      fields: {
        ref: 'integration-test-simple-customer-DO-NOT-DELETE',
        labelFR: 'Client de tests d\'intégration automatisés "simple"',
        labelEN: 'Customer for automated integration tests "simple"',
        labelShortEN: 'TEST',
        theme: [
          'recEpwnw9DOcLX2HY',
        ],
      },
      createdTime: '2020-10-14T10:57:54.000Z',
      __typename: 'Customer',
    },
    recEpwnw9DOcLX2HY: {
      id: 'recEpwnw9DOcLX2HY',
      fields: {
        primaryColor: 'red',
      },
      createdTime: '2020-10-14T11:00:12.000Z',
      __typename: 'Theme',
    },
  },
  sanitized: {
    recWsknIckhqXieD2: {
      id: 'recWsknIckhqXieD2',
      fields: {
        ref: 'pre-transformed-integration-test-simple-customer-DO-NOT-DELETE',
        labelFR: 'Client de tests d\'intégration automatisés "simple"',
        labelEN: 'Customer for automated integration tests "simple"',
        labelShortEN: 'TEST',
        theme: [
          'recEpwnw9DOcLX2HY',
        ],
      },
      createdTime: '2020-10-14T10:57:54.000Z',
      __typename: 'Customer',
    },
    recEpwnw9DOcLX2HY: {
      id: 'recEpwnw9DOcLX2HY',
      fields: {
        primaryColor: 'red',
      },
      createdTime: '2020-10-14T11:00:12.000Z',
      __typename: 'Theme',
    },
  },
};

export default mockedAirtableDatasetsSimpleAfterSanitization;
