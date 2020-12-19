import isCircular from 'is-circular';
import find from 'lodash.find';
import mockedAirtableDatasetsFullAfterSanitization from '../../mocks/mockedAirtableDatasetsFullAfterSanitization';
import { mockedAirtableRemoteSchemaFull } from '../../mocks/mockedAirtableRemoteSchemaFull';
import { AirtableDatasets } from '../../types/data/AirtableDatasets';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import { SanitizedAirtableDataset } from '../../types/data/SanitizedAirtableDataset';
import consolidateSanitizedAirtableRecord from './consolidateSanitizedAirtableRecord';

/**
 * @group unit
 * @group utils
 * @group module-fetch-airtable-dataset
 */
describe(`utils/airtableDataset/consolidateSanitizedAirtableRecord.ts`, () => {
  beforeEach(() => {
    global.console = global.muteConsole();
  });

  describe(`consolidateSanitizedAirtableRecord`, () => {
    describe(`should resolve relationships from a sanitized airtable record`, () => {
      describe(`when using the "simple" customer (simple relationships, no nested relationships)`, () => {
        const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsFullAfterSanitization;
        const sanitizedAirtableDataset: SanitizedAirtableDataset = airtableDatasets.sanitized;
        const sanitizedCustomer = <AirtableRecord<Customer>>find(sanitizedAirtableDataset, { '__typename': 'Customer' });
        const consolidatedCustomer: AirtableRecord<Customer> = consolidateSanitizedAirtableRecord(mockedAirtableRemoteSchemaFull, sanitizedAirtableDataset, sanitizedCustomer);

        test(`should contain expected "ref"`, async () => {
          expect(consolidatedCustomer?.ref).toEqual(`integration-test-full-customer-DO-NOT-DELETE`);
        });

        test(`should contain expected "label"`, async () => {
          expect(consolidatedCustomer?.label).toEqual(`Client de tests d'intégration automatisés "full"`);
        });

        test(`should contain expected "labelShort"`, async () => {
          expect(consolidatedCustomer?.labelShort).toEqual(`TEST`);
        });

        test(`should contain expected "availableLanguages"`, async () => {
          expect(consolidatedCustomer?.availableLanguages).toEqual(['fr', 'en']);
        });

        test(`should contain expected "theme"`, async () => {
          expect(consolidatedCustomer?.theme).toBeObject();
          expect(consolidatedCustomer?.theme).toMatchObject({
            '__typename': 'Theme',
            'backgroundColor': null,
            'errorColor': null,
            'id': 'recLbjemuVHx9pZF5',
            'onBackgroundColor': null,
            'onErrorColor': null,
            'onPrimaryColor': null,
            'onSecondaryColor': null,
            'onSurfaceColor': null,
            'primaryColor': 'yellow',
            'primaryColorVariant1': null,
            'secondaryColor': 'purple',
            'secondaryColorVariant1': null,
            'surfaceColor': null,
          });
        });

        test(`should contain expected "modTFP"`, async () => {
          expect(consolidatedCustomer?.modTFP).toBeObject();
          expect(consolidatedCustomer?.modTFP).toMatchObject({
            '__typename': 'ModTFP',
            'id': 'receZErAcGtJG9Pw3',
            'favicon': null,
            'serviceLabel': 'Integration test FULL',
            'serviceLogo': {
              '__typename': 'Asset',
              'id': 'recwFHbyjydAQ8IRe',
              'ref': 'integration-test-full-customer-DO-NOT-DELETE-87',
              'width': 200,
              'height': 300,
              'title': null,
              'alt': null,
              'linkUrl': null,
              'linkTarget': null,
              'url': 'https://dl.airtable.com/.attachments/5372ea6df954ba686c52bcbe2bcf3ba0/ca3ca169/download.jpeg',
              'filename': 'download.jpeg',
              'size': 9570,
              'type': 'image/jpeg',
              'thumbnails': {
                'small': {
                  'url': 'https://dl.airtable.com/.attachmentThumbnails/27ca76e2a2d3d4ba4496aae1c300936d/531829e7',
                  'width': 57,
                  'height': 36,
                },
                'large': {
                  'url': 'https://dl.airtable.com/.attachmentThumbnails/8760c0df0aaf3b11b74266087ce10c93/1cd85eda',
                  'width': 283,
                  'height': 178,
                },
                'full': {
                  'url': 'https://dl.airtable.com/.attachmentThumbnails/542736856db6200d91a4603a2f7bfa02/5d6f055b',
                  'width': 3000,
                  'height': 3000,
                },
              },
              'attachmentId': 'attADEmPJ8ob6rM4s',
            },
            'footerLogo': null,
            'footerCredits': null,
            'footerCopyright': null,
            'solutionsIntroduction': null,
            'termsDescription': null,
            'privacyDescription': null,
            'slsReleaseName': null,
          });
        });

        test(`should contain expected "modChatbot"`, async () => {
          expect(consolidatedCustomer?.modChatbot).toBeObject();
          expect(consolidatedCustomer?.modChatbot).toMatchObject({
            '__typename': 'ModChatbot',
            'id': 'recTaWUWrfU9QJM6n',
            'isEnabled': true,
            'homeTitle': 'FULL Chatbot test',
            'homeSubtitle': null,
            'homeDescription': null,
            'homeButtonLabel': null,
            'dialogIntroduction': null,
          });
        });

        test(`should contain expected "modSLG"`, async () => {
          expect(consolidatedCustomer?.modSLG).toBeNull();
        });

        test(`should contain expected "modSLS"`, async () => {
          expect(consolidatedCustomer?.modSLS).toBeNull();
        });

        test(`should contain expected "campuses"`, async () => {
          expect(consolidatedCustomer?.campuses).toBeArray();
          expect(consolidatedCustomer?.campuses).toBeArrayOfSize(1);
          expect(consolidatedCustomer?.campuses).toContainObject({
            __typename: 'Campus',
            id: 'recWazpXRmqDznXxQ',
            ref: 'integration-test-full-customer-DO-NOT-DELETE-full-campus-1-published',
            label: 'FULL campus 1 (published)',
            educationalProgramSteps: [],
          });
        });

        test(`should contain expected "campuses.place" which should be a circular reference`, async () => {
          expect(isCircular(consolidatedCustomer?.campuses[0].place)).toBeTrue();
          expect(consolidatedCustomer?.campuses[0].place.campus.place.campus.place.campus.place.label).toEqual('FULL place 1 (multioffices)');
        });

        test(`should contain expected "contacts"`, async () => {
          expect(consolidatedCustomer?.contacts).toBeArray();
          expect(consolidatedCustomer?.contacts).toBeArrayOfSize(2);
        });

        test(`should contain expected "educationalPrograms"`, async () => {
          expect(consolidatedCustomer?.educationalPrograms).toBeArray();
          expect(consolidatedCustomer?.educationalPrograms).toBeArrayOfSize(1);
        });

        test(`should contain expected "places"`, async () => {
          expect(consolidatedCustomer?.places).toBeArray();
          expect(consolidatedCustomer?.places).toBeArrayOfSize(3);
        });

        test(`should contain expected "studentSolutions"`, async () => {
          expect(consolidatedCustomer?.studentSolutions).toBeArray();
          expect(consolidatedCustomer?.studentSolutions).toBeArrayOfSize(2);
        });

        test(`should contain expected "studentSolutionsCategories"`, async () => {
          expect(consolidatedCustomer?.studentSolutionsCategories).toBeArray();
          expect(consolidatedCustomer?.studentSolutionsCategories).toBeArrayOfSize(1);
        });
      });
    });
  });
});
