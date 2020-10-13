import { CUSTOMER2 } from '../../mocks/airtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import {
  getFieldBestAvailableTranslation,
  getGenericLocalisedFieldName,
  hasGenericLocalisedField,
  isLocalisedField,
} from './airtableField';

/**
 * @group unit
 * @group utils
 */
describe(`utils/data/airtableField.ts`, () => {
  const allowedLocales = ['en', 'FR']; // Behaviour between lower casing and upper casing should be identical

  describe(`isLocalisedField`, () => {
    describe(`should resolve a field as being a localised field`, () => {
      test(`when the field contains a locale at the end and that locale is allowed`, async () => {
        expect(isLocalisedField('labelEN', allowedLocales)).toEqual(true);
        expect(isLocalisedField('labelFR', allowedLocales)).toEqual(true);
      });
    });

    describe(`should resolve a field as NOT being a localised field`, () => {
      test(`when the field contains a locale at the end and that locale is NOT allowed`, async () => {
        expect(isLocalisedField('labelES', allowedLocales)).toEqual(false);
      });

      test(`when field contains a locale that is not at the end and that locale is allowed`, async () => {
        expect(isLocalisedField('labelENDesc', allowedLocales)).toEqual(false);
        expect(isLocalisedField('FRlabel', allowedLocales)).toEqual(false);
      });
    });
  });

  describe(`getGenericLocalisedFieldName`, () => {
    describe(`should resolve the generic localised field name based on a localised field`, () => {
      test(`when the field name is localised`, async () => {
        expect(getGenericLocalisedFieldName('labelEN')).toEqual('label');
        expect(getGenericLocalisedFieldName('labelFR')).toEqual('label');
      });
    });
  });

  describe(`hasGenericLocalisedField`, () => {
    describe(`should resolve whether a record field name contains a generic localised field`, () => {
      test(`when the record has NOT been localised yet`, async () => {
        expect(hasGenericLocalisedField({ fields: {} }, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ fields: { labelFR: '' } }, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ fields: { labelFR: 'labelFR' } }, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ fields: { labelFR: '', labelEN: '' } }, 'labelFR')).toEqual(false);
      });

      test(`when the record has been localised`, async () => {
        expect(hasGenericLocalisedField({ fields: { label: '', labelFR: '' } }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ fields: { label: false, labelEN: '' } }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ fields: { label: null, labelEN: '' } }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ fields: { label: 'some label', labelEN: '' } }, 'labelFR')).toEqual(true);
      });
    });
  });

  describe(`getFieldBestAvailableTranslation`, () => {
    describe(`should find the best available translation`, () => {
      test(`when the record has the best available translation (order: ['en', 'FR'])`, async () => {
        const record: AirtableRecord<Customer> = CUSTOMER2 as AirtableRecord<Customer>;
        expect(getFieldBestAvailableTranslation(record, 'labelEN', allowedLocales)).toEqual({
          genericLocalisedField: 'label',
          value: record.fields.labelEN,
        });
        expect(getFieldBestAvailableTranslation(record, 'labelFR', allowedLocales)).toEqual({
          genericLocalisedField: 'label',
          value: record.fields.labelEN,
        });
        expect(getFieldBestAvailableTranslation(record, 'termsFR', allowedLocales)).toEqual({
          genericLocalisedField: 'terms',
          value: record.fields.termsEN,
        });
        expect(getFieldBestAvailableTranslation(record, 'termsEN', allowedLocales)).toEqual({
          genericLocalisedField: 'terms',
          value: record.fields.termsEN,
        });
      });

      test(`when the record has the best available translation (order: ['fr', 'EN'])`, async () => {
        const allowedLocales = ['fr', 'EN'];
        const record: AirtableRecord<Customer> = CUSTOMER2 as AirtableRecord<Customer>;
        expect(getFieldBestAvailableTranslation(record, 'labelEN', allowedLocales)).toEqual({
          genericLocalisedField: 'label',
          value: record.fields.labelEN,
        });
        expect(getFieldBestAvailableTranslation(record, 'labelFR', allowedLocales)).toEqual({
          genericLocalisedField: 'label',
          value: record.fields.labelEN,
        });
        expect(getFieldBestAvailableTranslation(record, 'termsFR', allowedLocales)).toEqual({
          genericLocalisedField: 'terms',
          value: record.fields.termsFR,
        });
        expect(getFieldBestAvailableTranslation(record, 'termsEN', allowedLocales)).toEqual({
          genericLocalisedField: 'terms',
          value: record.fields.termsFR,
        });
      });

      test(`when the record don't have the best available translation`, async () => {
        const record: AirtableRecord<Customer> = CUSTOMER2 as AirtableRecord<Customer>;
        expect(getFieldBestAvailableTranslation(record, 'labelFR', allowedLocales)).toEqual({
          genericLocalisedField: 'label',
          value: record.fields.labelEN,
        });
      });

      test(`when the record is already localised`, async () => {
        const record: AirtableRecord<Customer> = { ...CUSTOMER2, fields: { label: 'Any' } } as AirtableRecord<Customer>;
        expect(getFieldBestAvailableTranslation(record, 'labelFR', allowedLocales)).toEqual({});
      });
    });
  });
});
