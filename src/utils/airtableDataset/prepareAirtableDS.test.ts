import map from 'lodash.map';
import reduce from 'lodash.reduce';
import size from 'lodash.size';
import mockedAirtableRecordsSetFull from '../../mocks/mockedAirtableRecordsSetFull';
import mockedAirtableRecordsSetSimple from '../../mocks/mockedAirtableRecordsSetSimple';
import { RawAirtableRecordsSet } from '../../types/airtableDataset/RawAirtableRecordsSet';
import { RawAirtableRecord } from '../../types/airtableNativeAPI/RawAirtableRecord';
import { AirtableDatasets } from '../../types/data/AirtableDatasets';
import prepareAirtableDS from './prepareAirtableDS';

/**
 * @group unit
 * @group utils
 * @group module-fetch-airtable-dataset
 */
describe(`utils/airtableDataset/prepareAirtableDS.ts`, () => {
  beforeEach(() => {
    // global.console = global.muteConsole();
  });

  describe(`prepareAirtableDS`, () => {
    describe(`should prepare the airtable dataset`, () => {
      describe(`when using the "simple" customer (simple relationships, no nested relationships)`, () => {
        const airtableDatasets: AirtableDatasets = prepareAirtableDS(mockedAirtableRecordsSetSimple);
        const totalRecordsCount = reduce(mockedAirtableRecordsSetSimple, (sum: number, recordsSet: RawAirtableRecordsSet) => sum + size(recordsSet.records), 0);
        // console.log('airtableDatasets', JSON.stringify(airtableDatasets, null, 2));

        test(`should contain as many "raw" records as they were records given: ${totalRecordsCount}`, async () => {
          expect(Object.keys(airtableDatasets.raw)).toHaveLength(totalRecordsCount);
        });

        test(`should contain the __typename field in every records`, async () => {
          map(airtableDatasets.raw, (airtableRecord: RawAirtableRecord) => {
            expect(airtableRecord.__typename).toBeDefined();
          });
        });

        test(`should init the "rawSanitized" and "consolidated" property with an empty object`, async () => {
          expect(airtableDatasets.sanitized).toEqual({});
        });
      });

      describe(`when using the "full" customer`, () => {
        const airtableDatasets: AirtableDatasets = prepareAirtableDS(mockedAirtableRecordsSetFull);
        const totalRecordsCount = reduce(mockedAirtableRecordsSetFull, (sum: number, recordsSet: RawAirtableRecordsSet) => sum + size(recordsSet.records), 0);
        // console.log('airtableDatasets', JSON.stringify(airtableDatasets, null, 2));

        test(`should contain as many "raw" records as they were records given: ${totalRecordsCount}`, async () => {
          expect(Object.keys(airtableDatasets.raw)).toHaveLength(totalRecordsCount);
        });

        test(`should contain the __typename field in every records`, async () => {
          map(airtableDatasets.raw, (airtableRecord: RawAirtableRecord) => {
            expect(airtableRecord.__typename).toBeDefined();
          });
        });

        test(`should init the "rawSanitized" and "consolidated" property with an empty object`, async () => {
          expect(airtableDatasets.sanitized).toEqual({});
        });
      });
    });
  });
});
