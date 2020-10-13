import React from 'react';
import TestRenderer from 'react-test-renderer';
import { NavLink } from 'reactstrap';

import i18nContext from '../../stores/i18nContext';
import I18nLink from './I18nLink';

/**
 * @group unit
 * @group components
 */
describe('I18nLink', () => {
  const I18nLinkTest = (props) => {
    const { locale = 'en', href, text = 'Text', ...rest } = props;

    return (
      <i18nContext.Provider value={{ lang: null, locale: locale }}>
        <I18nLink
          href={href}
          {...rest}
        >
          {text}
        </I18nLink>
      </i18nContext.Provider>
    );
  };

  describe('should properly render', () => {
    test('when going to homepage, it should redirect to i18n homepage', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/'} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/en');
      expect(link).toMatchSnapshot();
    });

    test('when using custom CSS class', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/'} className="customClassName" />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/en');
      expect(link.props.className).toEqual('customClassName');
      expect(link).toMatchSnapshot();
    });

    test('when forcing the locale to use', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/'} locale={'fr-FR'} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/fr-FR');
      expect(link).toMatchSnapshot();
    });

    test('when using wrapChildrenAsLink manually using a <a> element', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/'} wrapChildrenAsLink={false} text={<a>Page</a>} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Page']);
      expect(link.props.href).toEqual('/en');
      expect(link).toMatchSnapshot();
    });

    test('when using wrapChildrenAsLink manually using a <NavLink> element', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/'} wrapChildrenAsLink={false} text={<NavLink>Page</NavLink>} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Page']);
      expect(link.props.href).toEqual('/en');
      expect(link.props.className).toEqual('nav-link');
      expect(link).toMatchSnapshot();
    });

    test('when using route params', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/products/[id]'} params={{ id: 5 }} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/en/products/5');
      expect(link).toMatchSnapshot();
    });

    test('when using route params and query route params', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/products/[id]'} params={{ id: 5 }} query={{ userId: 1 }} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/en/products/5?userId=1');
      expect(link).toMatchSnapshot();
    });

    test('when using route params and query route params using nested paths', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/products/favourites/[id]'} params={{ id: 5 }} query={{ userId: 1 }} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/en/products/favourites/5?userId=1');
      expect(link).toMatchSnapshot();
    });

    test('when using route params and query route params using nested paths and forcing locale', () => {
      const renderer = TestRenderer.create(<I18nLinkTest href={'/products/favourites/[id]'} params={{ id: 5 }} query={{ userId: 1 }} locale={'fr'} />);
      const link: any = renderer.toJSON();

      expect(link.type).toEqual('a');
      expect(link.children).toEqual(['Text']);
      expect(link.props.href).toEqual('/fr/products/favourites/5?userId=1');
      expect(link).toMatchSnapshot();
    });
  });
});
