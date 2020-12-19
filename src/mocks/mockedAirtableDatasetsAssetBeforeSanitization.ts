import { AirtableDatasets } from '../types/data/AirtableDatasets';

/**
 * Airtable records set of Assets. Not related with any integration tests, for local tests only.
 */
export const mockedAirtableDatasetsAssetBeforeSanitization: AirtableDatasets = {
  raw: {
    rec1DGkdyH1qpm1aF: {
      id: 'rec1DGkdyH1qpm1aF',
      fields: {
        asset: [
          {
            id: 'att4Y34pq23zJAn2k',
            url: 'https://dl.airtable.com/.attachments/348636d023815444373b2ccffecd30e7/05191799/Caisse-depargne-2.png',
            filename: 'Caisse-dépargne-2.png',
            size: 17306,
            type: 'image/png',
            thumbnails: {
              small: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/4286ed925b4ffcd49415a498e25bdcca/8dcbc552',
                width: 36,
                height: 36,
              },
              large: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/845517869e61fb688f3e2fd649ba1100/ffb1ab31',
                width: 280,
                height: 280,
              },
              full: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/84b440fbb20782ac05028dac6f6a336a/212a31fc',
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        width: 150,
        height: 150,
        title: 'Logo Caisse d\'Épargne',
        linkTarget: '_default',
        ref: 'gem-logo-caisse-depargne20',
      },
      createdTime: '2020-10-13T14:24:13.000Z',
      __typename: 'Asset',
    },
    rec1iAQ0zHzHbhcEx: {
      id: 'rec1iAQ0zHzHbhcEx',
      fields: {
        asset: [
          {
            id: 'attaTMFjhHA7DK5hd',
            url: 'https://dl.airtable.com/.attachments/fff2af9cacf978bdfd461d4533c4745f/88f60c7f/RgionAURA.png',
            filename: 'Région AURA.png',
            size: 10861,
            type: 'image/png',
            thumbnails: {
              small: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/fedc3a2e0b7ae5fc027fbf5b3dfe1f99/5a7b483c',
                width: 110,
                height: 36,
              },
              large: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/e2caf0188a1e0489c242fb8dfa098b8f/94bc6bc7',
                width: 400,
                height: 131,
              },
              full: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/e59383f1115787c6afb0954586504964/259163b1',
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        title: 'Logo Région AURA',
        linkTarget: '_default',
        ref: 'gem-logo-region-aura55',
      },
      createdTime: '2020-10-13T17:48:59.000Z',
      __typename: 'Asset',
    },
    rec1q5MeAJDweLePS: {
      id: 'rec1q5MeAJDweLePS',
      fields: {
        asset: [
          {
            id: 'atts6YDlgov4fyZAJ',
            url: 'https://dl.airtable.com/.attachments/d4ed17f7dab5506d4cf164825e67d942/c27a8195/ServiceLogo_Default.png',
            filename: 'ServiceLogo_Default.png',
            size: 13337,
            type: 'image/png',
            thumbnails: {
              small: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/2c805d38f04b80261acc38e317d07cce/ee896157',
                width: 36,
                height: 36,
              },
              large: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/b2f5a724f63411de9975c1f6c549065a/81627583',
                width: 200,
                height: 200,
              },
              full: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/c627a9dd557dc6894cb00f1a260bb1ab/cba953a2',
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        title: 'Logo service default',
        ref: '-logo-service-default9',
      },
      createdTime: '2020-09-23T10:02:39.000Z',
      __typename: 'Asset',
    },
    rec1xI2MAqvrh2zTA: {
      id: 'rec1xI2MAqvrh2zTA',
      fields: {
        asset: [
          {
            id: 'attSFRjQL540YLe2E',
            url: 'https://dl.airtable.com/.attachments/f182afd3fa7ded846123082aa187e1bb/b217bbe1/calendrierechelonnement.jpg',
            filename: 'calendrier echelonnement.jpg',
            size: 75527,
            type: 'image/jpeg',
            thumbnails: {
              small: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/f7d527d1d9c6f4499e77c60e9e8f5128/de696822',
                width: 54,
                height: 36,
              },
              large: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/504e514659c7733093232d2671dededb/70b57564',
                width: 769,
                height: 512,
              },
              full: {
                url: 'https://dl.airtable.com/.attachmentThumbnails/f026bbe419ea54169a659d52748a8a65/1bf4ae82',
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        title: 'Logo échelonnement ',
        linkTarget: '_default',
        ref: 'gem-logo-echelonnement69',
      },
      createdTime: '2020-10-13T17:48:59.000Z',
      __typename: 'Asset',
    },
  },
  sanitized: {},
};

export default mockedAirtableDatasetsAssetBeforeSanitization;
