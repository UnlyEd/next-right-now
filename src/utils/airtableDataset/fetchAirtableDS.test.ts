import find from 'lodash.find';
import { mockedAirtableRemoteSchemaFull } from '../../mocks/mockedAirtableRemoteSchemaFull';
import { mockedAirtableRemoteSchemaSimple } from '../../mocks/mockedAirtableRemoteSchemaSimple';
import { mockedSimpleCustomerLanguages } from '../../mocks/mockedCustomer';
import { RawAirtableRecordsSet } from '../../types/airtableDataset/RawAirtableRecordsSet';
import { RawAirtableRecord } from '../../types/airtableNativeAPI/RawAirtableRecord';
import { Customer } from '../../types/data/Customer';
import { Theme } from '../../types/data/Theme';
import fetchAirtableDS from './fetchAirtableDS';

/**
 * @group integration
 * @group utils
 * @group module-fetch-airtable-dataset
 */
describe(`utils/airtableDataset/fetchAirtableDS.ts`, () => {
  beforeEach(() => {
    global.console = global.muteConsole();
  });

  describe(`fetchAirtableDS`, () => {
    const supportedLanguages = mockedSimpleCustomerLanguages;

    describe(`should fetch the given dataset correctly`, () => {
      test(`when using the "simple" schema (simple relationships, no nested relationships)`, async () => {
        const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDS(mockedAirtableRemoteSchemaSimple, supportedLanguages);
        console.log('rawAirtableRecordsSets - mockedAirtableRemoteSchemaSimple', JSON.stringify(rawAirtableRecordsSets, null, 2));
        const customerRawAirtableRecordsSet: RawAirtableRecordsSet = find(rawAirtableRecordsSets, { __typename: 'Customer' });
        const themeRawAirtableRecordsSet: RawAirtableRecordsSet = find(rawAirtableRecordsSets, { __typename: 'Theme' });

        // Customer
        expect(customerRawAirtableRecordsSet.__typename).toEqual('Customer');
        expect(customerRawAirtableRecordsSet.records, `Only the record related to the customer should be fetched, no more`).toHaveLength(1);

        const customerRawAirtableRecord: RawAirtableRecord<Customer> = customerRawAirtableRecordsSet.records[0];
        expect(customerRawAirtableRecord.fields.labelFR).toBeDefined();
        expect(customerRawAirtableRecord.fields.labelEN).toBeDefined();
        expect(customerRawAirtableRecord.fields.label, `The "label" shouldn't be fetched from the API but resolved during the "sanitize" phase instead.`).not.toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShortFR, `The "labelShortF" should be empty (on purpose)`).not.toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShortEN).toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShort, `The "label" shouldn't be fetched from the API but resolved during the "sanitize" phase instead.`).not.toBeDefined();

        // Theme
        expect(themeRawAirtableRecordsSet.__typename).toEqual('Theme');
        expect(themeRawAirtableRecordsSet.records, `Only the record related to the customer should be fetched, no more`).toHaveLength(1);

        const themeRawAirtableRecord: RawAirtableRecord<Theme> = themeRawAirtableRecordsSet.records[0];
        expect(themeRawAirtableRecord.fields.primaryColor).toBeDefined();
        expect(themeRawAirtableRecord.fields.secondaryColor, `The "secondaryColor" should be empty (on purpose)`).not.toBeDefined();
      });

      test(`when using the "full" schema`, async () => {
        const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDS(mockedAirtableRemoteSchemaFull, supportedLanguages);
        console.log('rawAirtableRecordsSets - mockedAirtableRemoteSchemaFull', JSON.stringify(rawAirtableRecordsSets, null, 2));
        const customerRawAirtableRecordsSet: RawAirtableRecordsSet = find(rawAirtableRecordsSets, { __typename: 'Customer' });
        const themeRawAirtableRecordsSet: RawAirtableRecordsSet = find(rawAirtableRecordsSets, { __typename: 'Theme' });

        // Customer
        expect(customerRawAirtableRecordsSet.__typename).toEqual('Customer');
        expect(customerRawAirtableRecordsSet.records, `Only the record related to the customer should be fetched, no more`).toHaveLength(1);

        const customerRawAirtableRecord: RawAirtableRecord<Customer> = customerRawAirtableRecordsSet.records[0];
        expect(customerRawAirtableRecord.fields.labelFR).toBeDefined();
        expect(customerRawAirtableRecord.fields.labelEN).toBeDefined();
        expect(customerRawAirtableRecord.fields.label, `The "label" shouldn't be fetched from the API but resolved during the "sanitize" phase instead.`).not.toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShortFR, `The "labelShortF" should be empty (on purpose)`).not.toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShortEN).toBeDefined();
        expect(customerRawAirtableRecord.fields.labelShort, `The "label" shouldn't be fetched from the API but resolved during the "sanitize" phase instead.`).not.toBeDefined();

        // Theme
        expect(themeRawAirtableRecordsSet.__typename).toEqual('Theme');
        expect(themeRawAirtableRecordsSet.records, `Only the record related to the customer should be fetched, no more`).toHaveLength(1);

        const themeRawAirtableRecord: RawAirtableRecord<Theme> = themeRawAirtableRecordsSet.records[0];
        expect(themeRawAirtableRecord.fields.primaryColor).toBeDefined();
        expect(themeRawAirtableRecord.fields.secondaryColor).toBeDefined();
      });

      // XXX Used to fetch other schemas to get the JSON and use it in other tests
      // test(`when using the "simple" customer (simple relationships, no nested relationships)`, async () => {
      //   const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDS(mockedAirtableLocalSchemaAsset, supportedLanguages);
      //   console.log('rawAirtableRecordsSets - mockedAirtableLocalSchemaAsset', JSON.stringify(rawAirtableRecordsSets, null, 2));
      // });
    });
  });
});
