import { getGenericLocalisedFieldName, hasGenericLocalisedField, isLocalisedField } from './airtableField';

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
        expect(hasGenericLocalisedField({}, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ labelFR: '' }, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ labelFR: 'labelFR' }, 'labelFR')).toEqual(false);
        expect(hasGenericLocalisedField({ labelFR: '', labelEN: '' }, 'labelFR')).toEqual(false);
      });

      test(`when the record has been localised`, async () => {
        expect(hasGenericLocalisedField({ label: '', labelFR: '' }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ label: false, labelEN: '' }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ label: null, labelEN: '' }, 'labelFR')).toEqual(true);
        expect(hasGenericLocalisedField({ label: 'some label', labelEN: '' }, 'labelFR')).toEqual(true);
      });
    });
  });
});
