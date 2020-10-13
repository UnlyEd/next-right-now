import React from 'react';
import TestRenderer from 'react-test-renderer';

import AirtableAsset from './AirtableAsset';

const defaultLogoUrl = 'https://dl.airtable.com/lA5gmGBQheUvmuX616wU_monochromelogo.png';
const defaultLogoTarget = '_blank';

/**
 * @group unit
 * @group components
 */
describe('components/assets/AirtableAsset', () => {
  describe('should properly render an asset from Airtable', () => {
    describe('when the asset is used as an image (<img>)', () => {
      test('when relying on default "logo" property, it should apply the internal default properties', () => {
        const id = 'test';
        const renderer = TestRenderer
          .create(<AirtableAsset
            id={id}
            asset={{
              url: defaultLogoUrl,
            }}
          />);
        const img: any = renderer.toJSON();

        expect(img.props.id).toEqual(id);
        expect(img.props.src).toEqual(defaultLogoUrl);
        expect(img.props.title).toEqual(undefined);
        expect(img.props.alt).toEqual(defaultLogoUrl);
        expect(img.props.className).toEqual(`asset-${id}`);
        expect(img.props.style).toEqual({});
        expect(img).toMatchSnapshot();
      });

      test('when using "logo" property, it should apply the properties correctly', () => {
        const id = 'test';
        const title = 'Test asset';
        const classes = 'test-class1 test-class2';
        const style = { paddingTop: 5 };
        const renderer = TestRenderer
          .create(<AirtableAsset
            id={id}
            asset={{
              url: defaultLogoUrl,
              title: title,
              alt: title,
              classes: classes,
              style: style,
            }}
          />);
        const img: any = renderer.toJSON();

        expect(img.props.id).toEqual(id);
        expect(img.props.src).toEqual(defaultLogoUrl);
        expect(img.props.title).toEqual(title);
        expect(img.props.alt).toEqual(title);
        expect(img.props.className).toEqual(`asset-${id} ${classes}`);
        expect(img.props.style).toEqual(style);
        expect(img).toMatchSnapshot();
      });

      describe('when using custom defaults', () => {
        test('which should be properly applied', () => {
          const id = 'test';
          const title = 'Test asset';
          const classes = 'test-class1 test-class2';
          const style = { paddingTop: 5 };
          const renderer = TestRenderer
            .create(<AirtableAsset
              id={id}
              asset={{
                url: defaultLogoUrl,
                title: title,
                alt: title,
              }}
              defaults={{
                classes: classes,
                style: style,
              }}
            />);
          const img: any = renderer.toJSON();

          expect(img.props.id).toEqual(id);
          expect(img.props.src).toEqual(defaultLogoUrl);
          expect(img.props.title).toEqual(title);
          expect(img.props.alt).toEqual(title);
          expect(img.props.className).toEqual(`asset-${id} ${classes}`);
          expect(img.props.style).toEqual(style);
          expect(img).toMatchSnapshot();
        });
      });

      describe('when using custom override', () => {
        test('when used with the "logo" property, it should override the logo props with the override values', () => {
          const id = 'test';
          const title = 'Test asset';
          const classes = 'test-class1 test-class2';
          const style = { paddingTop: 5 };
          const renderer = TestRenderer
            .create(<AirtableAsset
              id={id}
              asset={{
                url: defaultLogoUrl,
                title: title,
                alt: title,
              }}
              override={{
                classes: classes,
                style: style,
              }}
            />);
          const img: any = renderer.toJSON();

          expect(img.props.id).toEqual(id);
          expect(img.props.src).toEqual(defaultLogoUrl);
          expect(img.props.title).toEqual(title);
          expect(img.props.alt).toEqual(title);
          expect(img.props.className).toEqual(`asset-${id} ${classes}`);
          expect(img.props.style).toEqual(style);
          expect(img).toMatchSnapshot();
        });

        test('when used with the "defaults" property, it should override defaults and asset properties with the overridden values', () => {
          const id = 'test';
          const title = 'Test asset';
          const classes = 'test-class1 test-class2';
          const style = { paddingTop: 5 };
          const renderer = TestRenderer
            .create(<AirtableAsset
              id={id}
              asset={{
                url: defaultLogoUrl,
                title: title,
                alt: title,
                classes: 'should-not-be-applied',
                style: { paddingTop: 1 }, // Should be overridden
              }}
              defaults={{
                classes: 'should-not-be-applied2',
                style: { paddingTop: 3 }, // Should be overridden
              }}
              override={{
                classes: classes,
                style: style,
              }}
            />);
          const img: any = renderer.toJSON();

          expect(img.props.id).toEqual(id);
          expect(img.props.src).toEqual(defaultLogoUrl);
          expect(img.props.title).toEqual(title);
          expect(img.props.alt).toEqual(title);
          expect(img.props.className).toEqual(`asset-${id} ${classes}`);
          expect(img.props.style).toEqual(style);
          expect(img).toMatchSnapshot();
        });
      });

      test('when using multiple "transformations" properties, it should apply all transformations', () => {
        const id = 'test';
        const title = 'Test asset';
        const classes = 'test-class1 test-class2';
        const style = { paddingTop: 5, width: 500, height: 300 };
        const renderer = TestRenderer
          .create(<AirtableAsset
            id={id}
            asset={{
              url: defaultLogoUrl,
              title: title,
              alt: title,
              classes: classes,
              style: style,
              defaultTransformations: {
                width: 500,
                height: 300,
              },
            }}
          />);
        const img: any = renderer.toJSON();

        expect(img.props.id).toEqual(id);
        expect(img.props.src).toEqual(defaultLogoUrl);
        expect(img.props.title).toEqual(title);
        expect(img.props.alt).toEqual(title);
        expect(img.props.className).toEqual(`asset-${id} ${classes}`);
        expect(img.props.style).toEqual(style);
        expect(img).toMatchSnapshot();
      });

      test('when using a single "transformations" property, it should apply this transformation', () => {
        const id = 'test';
        const title = 'Test asset';
        const classes = 'test-class1 test-class2';
        const style = { paddingTop: 5, width: 500 };
        const renderer = TestRenderer
          .create(<AirtableAsset
            id={id}
            asset={{
              url: defaultLogoUrl,
              title: title,
              alt: title,
              classes: classes,
              style: style,
              defaultTransformations: {
                width: 500,
              },
            }}
          />);
        const img: any = renderer.toJSON();

        expect(img.props.id).toEqual(id);
        expect(img.props.src).toEqual(defaultLogoUrl);
        expect(img.props.title).toEqual(title);
        expect(img.props.alt).toEqual(title);
        expect(img.props.className).toEqual(`asset-${id} ${classes}`);
        expect(img.props.style).toEqual(style);
        expect(img).toMatchSnapshot();
      });

      test('when using "transformationsOverride" property, it should only use the override and ignore the default transformations', () => {
        const id = 'test';
        const title = 'Test asset';
        const classes = 'test-class1 test-class2';
        const style = { paddingTop: 5, height: 300 };
        const renderer = TestRenderer
          .create(<AirtableAsset
            id={id}
            asset={{
              url: defaultLogoUrl,
              title: title,
              alt: title,
              classes: classes,
              style: style,
              defaultTransformations: {
                width: 500,
              },
            }}
            transformationsOverride={{
              height: 300,
            }}
          />);
        const img: any = renderer.toJSON();

        expect(img.props.id).toEqual(id);
        expect(img.props.src).toEqual(defaultLogoUrl);
        expect(img.props.title).toEqual(title);
        expect(img.props.alt).toEqual(title);
        expect(img.props.className).toEqual(`asset-${id} ${classes}`);
        expect(img.props.style).toEqual(style);
        expect(img).toMatchSnapshot();
      });
    });
  });

  describe('when the asset is used as a link(<a>) containing an image (<img>)', () => {
    test('when relying on default "logo" property', () => {
      const id = 'test';
      const linkUrl = 'https://google.com';
      const renderer = TestRenderer
        .create(<AirtableAsset
          id={id}
          asset={{
            url: defaultLogoUrl,
            linkUrl: linkUrl,
          }}
        />);
      const link: any = renderer.toJSON();
      const img: any = renderer.root.findByType('img');

      expect(img.props.id).toEqual(id);
      expect(img.props.src).toEqual(defaultLogoUrl);
      expect(img.props.title).toEqual(undefined);
      expect(img.props.alt).toEqual(defaultLogoUrl);
      expect(img.props.className).toEqual(`asset-${id}`);
      expect(img.props.style).toEqual({});
      expect(img.props).toMatchSnapshot();

      expect(link.props.id).toEqual(null);
      expect(link.props.href).toEqual(linkUrl);
      expect(link.props.target).toEqual('_blank');
      expect(link).toMatchSnapshot();
    });

    test('when using "linkOverride" property', () => {
      const id = 'test';
      const title = 'Test asset';
      const classes = 'test-class1 test-class2';
      const style = { paddingTop: 5 };
      const linkId = 'link-test';
      const linkUrl = 'https://google.com';

      const renderer = TestRenderer
        .create(<AirtableAsset
          id={id}
          asset={{
            url: defaultLogoUrl,
            title: title,
            alt: title,
            classes: classes,
            style: style,
            linkUrl: linkUrl,
          }}
          linkOverride={{
            id: linkId,
            classes: classes,
            style: style,
          }}
        />);
      const link: any = renderer.toJSON();
      const img: any = renderer.root.findByType('img');

      expect(img.props.id).toEqual(id);
      expect(img.props.src).toEqual(defaultLogoUrl);
      expect(img.props.title).toEqual(title);
      expect(img.props.alt).toEqual(title);
      expect(img.props.className).toEqual(`asset-${id} ${classes}`);
      expect(img.props.style).toEqual(style);
      expect(img.props).toMatchSnapshot();

      expect(link.props.id).toEqual(linkId);
      expect(link.props.href).toEqual(linkUrl);
      expect(link.props.target).toEqual('_blank');
      expect(link.props.className).toEqual(`asset-link-${id} ${classes}`);
      expect(link.props.style).toEqual(style);
      expect(link).toMatchSnapshot();
    });

    test('when using "linkOverride" property to override the link url', () => {
      const id = 'test';
      const title = 'Test asset';
      const classes = 'test-class1 test-class2';
      const style = { paddingTop: 5 };
      const linkId = 'link-test';
      const linkUrl = 'https://google.com';
      const overriddenLinkUrl = 'https://overridden.com';

      const renderer = TestRenderer
        .create(<AirtableAsset
          id={id}
          asset={{
            url: defaultLogoUrl,
            title: title,
            alt: title,
            classes: classes,
            style: style,
            linkUrl: linkUrl,
          }}
          linkOverride={{
            id: linkId,
            url: overriddenLinkUrl,
            classes: classes,
            style: style,
          }}
        />);
      const link: any = renderer.toJSON();
      const img: any = renderer.root.findByType('img');

      expect(img.props.id).toEqual(id);
      expect(img.props.src).toEqual(defaultLogoUrl);
      expect(img.props.title).toEqual(title);
      expect(img.props.alt).toEqual(title);
      expect(img.props.className).toEqual(`asset-${id} ${classes}`);
      expect(img.props.style).toEqual(style);
      expect(img.props).toMatchSnapshot();

      expect(link.props.id).toEqual(linkId);
      expect(link.props.href).toEqual(overriddenLinkUrl);
      expect(link.props.target).toEqual('_blank');
      expect(link.props.className).toEqual(`asset-link-${id} ${classes}`);
      expect(link.props.style).toEqual(style);
      expect(link).toMatchSnapshot();
    });

    test('when using "onClick" property', () => {
      const id = 'test';
      const title = 'Test asset';
      const classes = 'test-class1 test-class2';
      const style = { paddingTop: 5 };
      const linkId = 'link-test';
      const linkUrl = 'https://google.com';
      const overriddenLinkUrl = 'https://overridden.com';
      const onClick = () => 'clicked';

      const renderer = TestRenderer
        .create(<AirtableAsset
          id={id}
          asset={{
            url: defaultLogoUrl,
            title: title,
            alt: title,
            classes: classes,
            style: style,
            linkUrl: linkUrl,
          }}
          linkOverride={{
            id: linkId,
            url: overriddenLinkUrl,
            classes: classes,
            style: style,
          }}
          onClick={onClick}
        />);
      const link: any = renderer.toJSON();
      const img: any = renderer.root.findByType('img');

      expect(img.props.id).toEqual(id);
      expect(img.props.src).toEqual(defaultLogoUrl);
      expect(img.props.title).toEqual(title);
      expect(img.props.alt).toEqual(title);
      expect(img.props.className).toEqual(`asset-${id} ${classes}`);
      expect(img.props.style).toEqual(style);
      expect(img.props).toMatchSnapshot();

      expect(link.props.id).toEqual(linkId);
      expect(link.props.href).toEqual(overriddenLinkUrl);
      expect(link.props.target).toEqual('_blank');
      expect(link.props.className).toEqual(`asset-link-${id} ${classes}`);
      expect(link.props.style).toEqual(style);
      expect(link.props.onClick).toBeInstanceOf(Function);
      expect(link.props.onClick()).toEqual('clicked');
      expect(link).toMatchSnapshot();
    });

  });
});
