import { GenericObject } from '../../types/GenericObject';
import {
  decodeQueryParameterToJSON,
  encodeJSONToQueryParameter,
  filterExternalAbsoluteUrl,
} from './url';

/**
 * @group unit
 * @group utils
 */
export const data = {
  'organisation': {
    'ref': 'customer1',
    'logo': {
      'linkUrl': null,
      'linkTarget': '_blank',
      'classes': null,
      'style': null,
      'mimeType': 'image/png',
      '__typename': 'Asset',
    },
    'theme': {
      'primaryColor': '#1134e6',
      'primaryAltColor': '#203a51',
      'secondaryColor': 'white',
      'font': 'neuzeit-grotesk',
      '__typename': 'Theme',
      'primaryColorG1': '#ffffff',
    },
  },
};
export const encodedData = '%7B%22organisation%22%3A%7B%22ref%22%3A%22customer1%22%2C%22logo%22%3A%7B%22linkUrl%22%3Anull%2C%22linkTarget%22%3A%22_blank%22%2C%22classes%22%3Anull%2C%22style%22%3Anull%2C%22mimeType%22%3A%22image%2Fpng%22%2C%22__typename%22%3A%22Asset%22%7D%2C%22theme%22%3A%7B%22primaryColor%22%3A%22%231134e6%22%2C%22primaryAltColor%22%3A%22%23203a51%22%2C%22secondaryColor%22%3A%22white%22%2C%22font%22%3A%22neuzeit-grotesk%22%2C%22__typename%22%3A%22Theme%22%2C%22primaryColorG1%22%3A%22%23ffffff%22%7D%7D%7D';

describe(`utils/js/url.ts`, () => {
  describe(`encodeJSONToQueryParameter`, () => {
    test(`should encode a JS object into a url-compatible string`, async () => {
      expect(encodeJSONToQueryParameter(data)).toEqual(encodedData);
    });
  });

  describe(`decodeQueryParameterToJSON`, () => {
    test(`should decode a url-compatible string into a JS object`, async () => {
      expect(decodeQueryParameterToJSON(encodedData)).toEqual(data);
    });
  });

  describe(`encodeQueryParameter <> decodeQueryParameter <> encodeQueryParameter`, () => {
    test(`should encode and decode multiple times without altering data`, async () => {
      const _decodedData: GenericObject = decodeQueryParameterToJSON(encodedData);
      expect(_decodedData).toEqual(data);

      const _encodedData: string = encodeJSONToQueryParameter(_decodedData);
      expect(_encodedData).toEqual(encodedData);

      const _decodedDataAgain: GenericObject = decodeQueryParameterToJSON(_encodedData);
      expect(_decodedDataAgain).toEqual(data);
    });
  });

  describe(`filterExternalAbsoluteUrl`, () => {
    test(`should not allow external absolute urls (use default fallback)`, async () => {
      expect(filterExternalAbsoluteUrl('')).toEqual('/');
      expect(filterExternalAbsoluteUrl('https://google.com')).toEqual('/');
      expect(filterExternalAbsoluteUrl('http://google.com')).toEqual('/');
      expect(filterExternalAbsoluteUrl('//google.com')).toEqual('/');
    });

    test(`should fallback to given fallback value when provided`, async () => {
      expect(filterExternalAbsoluteUrl('', '/test')).toEqual('/test');
    });

    test(`should allow internal relative urls`, async () => {
      expect(filterExternalAbsoluteUrl('/google.com')).toEqual('/google.com');
      expect(filterExternalAbsoluteUrl('/google.com?test')).toEqual('/google.com?test');
    });
  });
});
