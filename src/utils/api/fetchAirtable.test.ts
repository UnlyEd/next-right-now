import fetchAirtableTable from './fetchAirtableTable';

// TODO "fetch" is not found here - See https://github.com/vercel/next.js/discussions/13678
// Skipped until resolved
describe.skip(`utils/api/fetchAirtable.ts`, () => {
  const results = {};
  describe(`fetchAirtableTable`, () => {
    describe(`should fetch correctly`, () => {
      test(`when not using any option`, async () => {
        expect(await fetchAirtableTable('Customer')).toMatchObject(results);
      });
    });
  });
});
