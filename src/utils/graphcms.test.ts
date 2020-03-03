import { prepareGraphCMSLocaleHeader } from './graphcms';

describe(`utils/graphcms.ts`, () => {
  describe(`prepareGraphCMSLocaleHeader`, () => {
    describe(`should clean properly the header locale`, () => {
      test(`when using 1 language`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr'])).toEqual(`FR`);
      });

      test(`when using 2 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en'])).toEqual(`FR, EN`);
      });

      test(`when using 3 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en', 'es'])).toEqual(`FR, EN, ES`);
      });
    });
  });
});
