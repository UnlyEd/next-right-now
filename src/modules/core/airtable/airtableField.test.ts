import { CUSTOMER2 } from '../testing/mocks/mockedRawAirtableDataset';
import { getFieldBestAvailableTranslation } from './airtableField';

/**
 * @group unit
 * @group utils
 */
describe(`utils/data/airtableField.ts`, () => {
  const allowedLocales = ['en', 'FR']; // Behaviour between lower casing and upper casing should be identical

  describe(`getFieldBestAvailableTranslation`, () => {
    describe(`should find the best available translation`, () => {
      test(`when the record has the best available translation (order: ['en', 'FR'])`, async () => {
        const record = CUSTOMER2;
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
      });

      test(`when the record has the best available translation (order: ['fr', 'EN'])`, async () => {
        const allowedLocales = ['fr', 'EN'];
        const record = CUSTOMER2;
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
      });

      test(`when the record don't have the best available translation`, async () => {
        const record = CUSTOMER2;
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
      });

      test(`when the record is already localised, it should ignore the existing localisation`, async () => {
        const record = {
          ...CUSTOMER2, fields:
            {
              label: 'Any',
              labelEN: CUSTOMER2.fields.labelEN,
            },
        };
        expect(getFieldBestAvailableTranslation(record, 'label', allowedLocales)).toEqual(record.fields.labelEN);
      });
    });
  });
});
