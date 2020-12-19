import find from 'lodash.find';
import mockedAirtableDatasetsAssetBeforeSanitization from '../../mocks/mockedAirtableDatasetsAssetBeforeSanitization';
import mockedAirtableDatasetsFullBeforeSanitization from '../../mocks/mockedAirtableDatasetsFullBeforeSanitization';
import mockedAirtableDatasetsSimpleBeforeSanitization from '../../mocks/mockedAirtableDatasetsSimpleBeforeSanitization';
import {
  mockedAirtableLocalSchemaAsset,
  mockedAirtableLocalSchemaCustomer,
} from '../../mocks/mockedAirtableLocalSchemas';
import { mockedAirtableRemoteSchemaFull } from '../../mocks/mockedAirtableRemoteSchemaFull';
import { mockedAirtableRemoteSchemaSimple } from '../../mocks/mockedAirtableRemoteSchemaSimple';
import { mockedSimpleCustomerLanguages } from '../../mocks/mockedCustomer';
import { RawAirtableRecord } from '../../types/airtableNativeAPI/RawAirtableRecord';
import { AirtableDatasets } from '../../types/data/AirtableDatasets';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Asset } from '../../types/data/Asset';
import { Customer } from '../../types/data/Customer';
import { RawAirtableDataset } from '../../types/data/RawAirtableDataset';
import { SanitizedAirtableDataset } from '../../types/data/SanitizedAirtableDataset';
import sanitizeRawAirtableDS from './sanitizeRawAirtableDS';

/**
 * @group unit
 * @group utils
 * @group module-fetch-airtable-dataset
 */
describe(`utils/airtableDataset/sanitizeRawAirtableDS.ts`, () => {
  beforeEach(() => {
    global.console = global.muteConsole();
  });

  describe(`sanitizeRawAirtableDS`, () => {
    const supportedLanguages = mockedSimpleCustomerLanguages;

    describe(`should sanitize the raw airtable dataset`, () => {
      describe(`when using the "simple" customer (simple relationships, no nested relationships)`, () => {
        const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsSimpleBeforeSanitization;
        const rawAirtableDatasetCopy: RawAirtableDataset = JSON.parse(JSON.stringify(airtableDatasets.raw));
        const rawAirtableDataset: RawAirtableDataset = airtableDatasets.raw;
        const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableRemoteSchemaSimple, airtableDatasets, supportedLanguages);
        const sanitizedCustomer = <AirtableRecord<Customer>>find(sanitizedAirtableDataset, { '__typename': 'Customer' });
        const rawCustomer = <RawAirtableRecord<Customer>>find(rawAirtableDataset, { '__typename': 'Customer' });

        test(`should not mutate the raw dataset when applying any transformation`, async () => {
          expect(rawAirtableDatasetCopy, `The "raw" dataset should stay unchanged after going through the sanitization phase (no mutation)`).toMatchObject(JSON.parse(JSON.stringify(rawAirtableDataset)));
        });

        describe(`[Step A-1] should apply table transformation: "isExtendedAttachmentTable"`, () => {
          const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsAssetBeforeSanitization; // XXX The actual value of airtableDatasets doesn't matter for this test
          const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableLocalSchemaAsset, airtableDatasets, supportedLanguages);
          const sanitizedAsset = <AirtableRecord<Asset>>find(sanitizedAirtableDataset, { '__typename': 'Asset' });

          test(`when "attachmentFieldName" point towards a valid airtable attachment`, async () => {
            expect(sanitizedAsset.attachmentId).toBeString();
            expect(sanitizedAsset.url).toBeString();
          });
        });

        describe(`[Step B-1] should apply record transformation: "transformRawValue"`, () => {
          test(`when "transformRawValue" is a function`, async () => {
            expect(sanitizedCustomer.stackerBaseUrl, `Should use rawRecord.fields.productionBaseUrl which should resolve to null even though it defines defaultRawValue and defaultSanitizedValue because those don't mutate the raw airtable record`).toBeNull();
          });
        });

        describe(`[Step B-2] should apply record transformation: "defaultRawValue"`, () => {
          test(`when "defaultRawValue" and "defaultSanitizedValue" are both set, it should only use "defaultRawValue"`, async () => {
            expect(sanitizedCustomer.productionBaseUrl, `The default value should be applied by the "defaultRawValue" transformation as described in the mockedAirtableSchemaSimple`).toBeString();
            expect(sanitizedCustomer.productionBaseUrl, `The default value should be applied by the "defaultRawValue" transformation as described in the mockedAirtableSchemaSimple`).toEqual('https://unly.org');
          });
        });

        describe(`[Step B-3] should apply record transformation: "asSingleRecord"`, () => {
          test(`when used on an "asAttachment" field`, async () => {
            expect(sanitizedCustomer.cmsLogo, `Should convert the cmsLogo array into an object too because asSingleRecord is described in the field`).toBeObject();
          });

          test(`when used on a relationship field`, async () => {
            expect(sanitizedCustomer.theme, 'Should be a string that contain the airtable id of the relationship').toBeString();
          });
        });

        describe(`[Step B-4] should apply record transformation: "asAttachment" and auto inject attachment fields`, () => {
          test(`when one field is selected`, async () => {
            expect(sanitizedCustomer.cmsLogo).toMatchObject({ url: 'https://dl.airtable.com/.attachments/70228f72a55c6ec28b5426b475a90e19/f50e39b8/download.jpeg' });
          });
        });

        describe(`[Step B-5] should apply record transformation: "isI18n" and resolve best translation`, () => {
          test(`when both FR/EN are provided`, async () => {
            expect(sanitizedCustomer.label, `The label should use the FR language because supportedLanguages starts with 'fr'`).toStartWith(rawCustomer.fields.labelFR);
          });

          test(`when only EN is provided (as fallback language)`, async () => {
            expect(sanitizedCustomer.labelShort, `The labelShort should use the EN language because the 'fr' value is undefined and supportedLanguages fallbacks to 'en'`).toStartWith(rawCustomer.fields.labelShortEN);
          });
        });

        describe(`[Step B-6] should apply record transformation: "transformSanitizedValue"`, () => {
          test(`when transformSanitizedValue is a function`, async () => {
            expect(sanitizedCustomer.ref, `The ref should be applied a transformation as described in the mockedAirtableSchemaSimple`).toStartWith('pre-transformed-');
          });
        });

        describe(`[Step B-7] should apply record transformation: "defaultSanitizedValue"`, () => {
          test(`when defaultSanitizedValue is an array`, async () => {
            expect(sanitizedCustomer.availableLanguages, `The availableLanguages should be applied by the "defaultSanitizedValue" transformation as described in the mockedAirtableSchemaSimple`).toEqual(['fr']);
          });
        });

        describe(`[Step B-9] should apply record transformation: "automated default value" (this on is built-in and cannot be deactivated)`, () => {
          const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsSimpleBeforeSanitization; // XXX The actual value of airtableDatasets doesn't matter for this test
          const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableLocalSchemaCustomer, airtableDatasets, supportedLanguages);
          const sanitizedCustomer = <AirtableRecord<Customer>>find(sanitizedAirtableDataset, { '__typename': 'Customer' });

          test(`when the field is not a relationship and is undefined`, async () => {
            expect(sanitizedCustomer['someFieldThatDoesNotExist'], `The field "someFieldThatDoesNotExist" doesn't exist on Airtable and should be converted from undefined to null because it's not a relationship`).toEqual(null);
          });

          test(`when the field is a relationship and is undefined`, async () => {
            expect(sanitizedCustomer['someFieldThatDoesNotExist2'], `The field "someFieldThatDoesNotExist2" doesn't exist on Airtable and should be converted from undefined to an empty array because it's a relationship`).toEqual([]);
          });
        });

        describe(`[Step B-10] should apply record transformation: "renameAs"`, () => {
          test(`when renameAs is a string`, async () => {
            expect(sanitizedCustomer.previewBaseUrl, `The field "previewBaseUrl" from airtable should have been deleted and renamed as described in mockedAirtableSchemaSimple`).not.toBeDefined();
            expect(sanitizedCustomer['previewBaseUrl2'], `A new field "previewBaseUrl2" should be created, as described in the mockedAirtableSchemaSimple`).toEqual('https://unly.org');
          });
        });
      });

      describe(`when using the "full" customer`, () => {
        const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsFullBeforeSanitization;
        const rawAirtableDatasetCopy: RawAirtableDataset = JSON.parse(JSON.stringify(airtableDatasets.raw));
        const rawAirtableDataset: RawAirtableDataset = airtableDatasets.raw;
        const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableRemoteSchemaFull, airtableDatasets, supportedLanguages);
        const sanitizedCustomer = <AirtableRecord<Customer>>find(sanitizedAirtableDataset, { '__typename': 'Customer' });
        const rawCustomer = <RawAirtableRecord<Customer>>find(rawAirtableDataset, { '__typename': 'Customer' });

        test(`should not mutate the raw dataset when applying any transformation`, async () => {
          expect(rawAirtableDatasetCopy, `The "raw" dataset should stay unchanged after going through the sanitization phase (no mutation)`).toMatchObject(JSON.parse(JSON.stringify(rawAirtableDataset)));
        });

        // describe(`[Step A-1] should apply table transformation: "isExtendedAttachmentTable"`, () => {
        //   const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsAssetBeforeSanitization; // XXX The actual value of airtableDatasets doesn't matter for this test
        //   const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableLocalSchemaAsset, airtableDatasets, supportedLanguages);
        //   const sanitizedAsset = <AirtableRecord<Asset>>find(sanitizedAirtableDataset, { '__typename': 'Asset' });
        //
        //   test(`when "attachmentFieldName" point towards a valid airtable attachment`, async () => {
        //     expect(sanitizedAsset.attachmentId).toBeString();
        //     expect(sanitizedAsset.url).toBeString();
        //   });
        // });
        //
        // describe(`[Step B-1] should apply record transformation: "transformRawValue"`, () => {
        //   test(`when "transformRawValue" is a function`, async () => {
        //     expect(sanitizedCustomer.stackerBaseUrl).toBeString();
        //   });
        // });
        //
        // describe(`[Step B-2] should apply record transformation: "defaultRawValue"`, () => {
        //   test(`when "defaultRawValue" and "defaultSanitizedValue" are both set, it should only use "defaultRawValue"`, async () => {
        //     expect(sanitizedCustomer.productionBaseUrl, `The default value should be applied by the "defaultRawValue" transformation as described in the mockedAirtableSchemaSimple`).toBeString();
        //     expect(sanitizedCustomer.productionBaseUrl, `The default value should be applied by the "defaultRawValue" transformation as described in the mockedAirtableSchemaSimple`).toEqual('https://unly.org');
        //   });
        // });
        //
        // describe(`[Step B-3] should apply record transformation: "asSingleRecord"`, () => {
        //   test(`when used on an "asAttachment" field`, async () => {
        //     expect(sanitizedCustomer.cmsLogo, `Should convert the cmsLogo array into an object too because asSingleRecord is described in the field`).toBeObject();
        //   });
        //
        //   test(`when used on a relationship field`, async () => {
        //     expect(sanitizedCustomer.theme, 'Should be a string that contain the airtable id of the relationship').toBeString();
        //   });
        // });
        //
        // describe(`[Step B-4] should apply record transformation: "asAttachment" and auto inject attachment fields`, () => {
        //   test(`when one field is selected`, async () => {
        //     expect(sanitizedCustomer.cmsLogo).toMatchObject({ url: 'https://dl.airtable.com/.attachments/70228f72a55c6ec28b5426b475a90e19/f50e39b8/download.jpeg' });
        //   });
        // });
        //
        // describe(`[Step B-5] should apply record transformation: "isI18n" and resolve best translation`, () => {
        //   test(`when both FR/EN are provided`, async () => {
        //     expect(sanitizedCustomer.label, `The label should use the FR language because supportedLanguages starts with 'fr'`).toStartWith(rawCustomer.fields.labelFR);
        //   });
        //
        //   test(`when only EN is provided (as fallback language)`, async () => {
        //     expect(sanitizedCustomer.labelShort, `The labelShort should use the EN language because the 'fr' value is undefined and supportedLanguages fallbacks to 'en'`).toStartWith(rawCustomer.fields.labelShortEN);
        //   });
        // });
        //
        // describe(`[Step B-6] should apply record transformation: "transformSanitizedValue"`, () => {
        //   test(`when transformSanitizedValue is a function`, async () => {
        //     expect(sanitizedCustomer.ref, `The ref should be applied a transformation as described in the mockedAirtableSchemaSimple`).toStartWith('pre-transformed-');
        //   });
        // });
        //
        // describe(`[Step B-7] should apply record transformation: "defaultSanitizedValue"`, () => {
        //   test(`when defaultSanitizedValue is an array`, async () => {
        //     expect(sanitizedCustomer.availableLanguages, `The availableLanguages should be applied by the "defaultSanitizedValue" transformation as described in the mockedAirtableSchemaSimple`).toEqual(['fr']);
        //   });
        // });
        //
        // describe(`[Step B-8] should apply record transformation: "automated default value" (this on is built-in and cannot be deactivated)`, () => {
        //   const airtableDatasets: AirtableDatasets = mockedAirtableDatasetsSimpleBeforeSanitization; // XXX The actual value of airtableDatasets doesn't matter for this test
        //   const sanitizedAirtableDataset: SanitizedAirtableDataset = sanitizeRawAirtableDS(mockedAirtableLocalSchemaCustomer, airtableDatasets, supportedLanguages);
        //   const sanitizedCustomer = <AirtableRecord<Customer>>find(sanitizedAirtableDataset, { '__typename': 'Customer' });
        //
        //   test(`when the field is not a relationship and is undefined`, async () => {
        //     expect(sanitizedCustomer['someFieldThatDoesNotExist'], `The field "someFieldThatDoesNotExist" doesn't exist on Airtable and should be converted from undefined to null because it's not a relationship`).toEqual(null);
        //   });
        //
        //   test(`when the field is a relationship and is undefined`, async () => {
        //     expect(sanitizedCustomer['someFieldThatDoesNotExist2'], `The field "someFieldThatDoesNotExist2" doesn't exist on Airtable and should be converted from undefined to an empty array because it's a relationship`).toEqual([]);
        //   });
        // });
        //
        // describe(`[Step B-9] should apply record transformation: "renameAs"`, () => {
        //   test(`when renameAs is a string`, async () => {
        //     expect(sanitizedCustomer.previewBaseUrl, `The field "previewBaseUrl" from airtable should have been deleted and renamed as described in mockedAirtableSchemaSimple`).not.toBeDefined();
        //     expect(sanitizedCustomer['previewBaseUrl2'], `A new field "previewBaseUrl2" should be created, as described in the mockedAirtableSchemaSimple`).toEqual('https://unly.org');
        //   });
        // });
      });
    });
  });
});
