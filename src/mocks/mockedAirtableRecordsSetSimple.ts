import { RawAirtableRecordsSet } from '../types/airtableDataset/RawAirtableRecordsSet';

/**
 * Airtable records set related to mockedSimpleCustomerRef.
 */
export const mockedAirtableRecordsSetSimple: RawAirtableRecordsSet[] = [
  {
    records: [
      {
        id: 'recWsknIckhqXieD2',
        fields: {
          ref: 'integration-test-simple-customer-DO-NOT-DELETE',
          labelFR: 'Client de tests d\'intégration automatisés "simple"',
          labelEN: 'Customer for automated integration tests "simple"',
          labelShortEN: 'TEST',
          theme: [
            'recEpwnw9DOcLX2HY',
          ],
          cmsLogo: [
            {
              id: 'attIm94pXJi4DCxJW',
              url: 'https://dl.airtable.com/.attachments/70228f72a55c6ec28b5426b475a90e19/f50e39b8/download.jpeg',
              filename: 'download.jpeg',
              size: 9570,
              type: 'image/jpeg',
              thumbnails: {
                small: {
                  url: 'https://dl.airtable.com/.attachmentThumbnails/20336d7c92ad706624bdf5cf967a5d98/ce951bff',
                  width: 57,
                  height: 36,
                },
                large: {
                  url: 'https://dl.airtable.com/.attachmentThumbnails/87a1c127bf39d98fcb8ca7c9aa76ed25/3b4db2e2',
                  width: 283,
                  height: 178,
                },
                full: {
                  url: 'https://dl.airtable.com/.attachmentThumbnails/ed5575b4492b13ab0e208f393ec8221d/876147fe',
                  width: 3000,
                  height: 3000,
                },
              },
            },
          ],

        },
        createdTime: '2020-10-14T10:57:54.000Z',
      },
    ],
    __typename: 'Customer',
  },
  {
    records: [
      {
        id: 'recEpwnw9DOcLX2HY',
        fields: {
          primaryColor: 'red',
        },
        createdTime: '2020-10-14T11:00:12.000Z',
      },
    ],
    __typename: 'Theme',
  },
];

export default mockedAirtableRecordsSetSimple;
