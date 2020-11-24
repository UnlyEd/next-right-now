import { prepareGraphCMSLocaleHeader } from './graphcms';

describe(`utils/graphcms.ts`, () => {
  describe(`prepareGraphCMSLocaleHeader`, () => {
    describe(`should clean properly the header locale`, () => {
      test(`when using 1 language`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr'])).toEqual(`fr`);
        expect(prepareGraphCMSLocaleHeader(['FR'])).toEqual(`fr`);
      });

      test(`when using 2 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en'])).toEqual(`fr, en`);
        expect(prepareGraphCMSLocaleHeader(['FR', 'EN'])).toEqual(`fr, en`);
      });

      test(`when using 3 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en', 'es'])).toEqual(`fr, en, es`);
        expect(prepareGraphCMSLocaleHeader(['FR', 'EN', 'ES'])).toEqual(`fr, en, es`);
      });
    });
  });
});
