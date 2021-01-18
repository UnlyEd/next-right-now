import isArray from 'lodash.isarray';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import NextLink from 'next/link';
import React from 'react';
import useI18n, { I18n } from '../hooks/useI18n';
import {
  I18nRoute,
  resolveI18nRoute,
} from '../i18nRouter';

type ParamValueToForward = string | number | Array<string | number>;

export type Props = {
  /**
   * Optional decorator for the path that will be shown in the browser URL bar.
   */
  as?: string;

  /**
   * React node as children.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * The path or URL to navigate to.
   */
  href: string;

  /**
   * The active locale is automatically prepended. locale allows for providing a different locale.
   *
   * @default current locale
   */
  locale?: string; // The locale can be specified, but it'll fallback to the current locale if unspecified

  /**
   * Parameters to inject into the url, necessary when using route params (other than `locale`).
   *
   * Example:
   *
   * `/products/[id]` with `params={{ id: 5 }}` becomes `/products/5`
   */
  params?: { [key: string]: ParamValueToForward };

  /**
   * Forces Link to send the href property to its child.
   *
   * @default false
   */
  passHref?: boolean;

  /**
   * Prefetch the page in the background.
   * Any <Link /> that is in the viewport (initially or through scroll) will be preloaded.
   * Prefetch can be disabled by passing prefetch={false}.
   * Pages using Static Generation will preload JSON files with the data for faster page transitions.
   *
   * @default true
   */
  prefetch?: boolean;

  /**
   * Query to inject to the url, necessary when using route query param.
   *
   * Example:
   *
   * `/products` with `query={{ userId: 1 }}` becomes `/products?userId=1`
   */
  query?: { [key: string]: ParamValueToForward };

  /**
   * Replace the current history state instead of adding a new url into the stack.
   *
   * @default false
   */
  replace?: boolean;

  /**
   * Scroll to the top of the page after a navigation.
   *
   * @default true
   */
  scroll?: boolean;

  /**
   * Update the path of the current page without rerunning `getStaticProps`, `getServerSideProps` or `getInitialProps`.
   *
   * @default false
   */
  shallow?: boolean;

  /**
   * Disabled on Storybook, as it crashes the UI.
   */
  wrapChildrenAsLink?: boolean; // Helper to avoid writing redundant code
};

/**
 * Wrapper around the native Next.js <Link> component. Handles localised links.
 *
 * Uses the current active locale by default.
 *
 * [Read why we don't use the official Next.js `Link` component](https://unlyed.github.io/next-right-now/guides/i18n/#official-i18n-routing-implementation) <span className="tip ml-2">Tip</span>
 *
 * @example Recommended usage
 *  <I18nLink href={`/`}>Homepage</I18nLink>
 *  <I18nLink href={`/`} className="customClassName">Homepage</I18nLink>
 *
 * @example When specifying the locale to use (overrides default)
 *  <I18nLink href={`/`} locale={'fr-FR'}>Homepage in "fr-FR" locale</I18nLink>
 *
 * @example The recommended usage is equivalent to this (wrapChildrenAsLink is true, by default)
 *  <I18nLink href={`/`} wrapChildrenAsLink={false}><a>Homepage</a></I18nLink>
 *  <I18nLink href={`/`} wrapChildrenAsLink={false}><a className="customClassName">Homepage</a></I18nLink>
 *
 * @example When using children that use a <a> tag, you must set wrapChildrenAsLink to false to avoid using a link within a link
 *   <I18nLink
 *     href={`/`}
 *     wrapChildrenAsLink={false}
 *   >
 *      <NavLink>Homepage</NavLink>
 *   </I18nLink>
 *
 * @example When using route params (other than "locale"). Ex: /products/5
 *   <I18nLink
 *     href={'/products/[id]'}
 *     params={{
 *       id: 5,
 *     }}
 *   >
 *      Go to product 5
 *   </I18nLink>
 *
 * @example When using route query params. Ex: /products/5?userId=1
 *   <I18nLink
 *     href={'/products/[id]'}
 *     params={{
 *       id: 5,
 *     }}
 *     query={{
 *       userId: 1
 *     }}
 *   >
 *      Go to product 5 with userId 1
 *   </I18nLink>
 *
 * @param props
 */
const I18nLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { locale: currentLocale }: I18n = useI18n();
  const {
    as,
    children,
    className,
    href,
    locale = currentLocale,
    params,
    passHref = true,
    query,
    wrapChildrenAsLink = true,
    ...rest // Should only contain valid next/Link props
  } = props;
  let {
    i18nHref, // eslint-disable-line prefer-const
    i18nAs,
  }: I18nRoute = resolveI18nRoute({ as, href, locale });

  if (!isEmpty(params)) {
    // If any params are provided, replace their name by the provided value
    map(params, (value: ParamValueToForward, key: string | number) => {
      if (isArray(value)) {
        value = value.join(',');
      }
      i18nAs = i18nAs.replace(`[${key}]`, value as string);
    });
  }

  if (!isEmpty(query)) {
    // If any query params are provided, append it to `as`, so it gets forwarded;
    const queryParamsString = Object.keys(query)
      .map((k) => {
        if (isArray(k)) {
          k = k.join(',');
        }
        return `${k}=${query[k]}`;
      })
      .join('&');
    i18nHref += `?${queryParamsString}`;
    i18nAs += `?${queryParamsString}`;
  }

  return (
    <NextLink
      href={i18nHref}
      as={i18nAs}
      {...rest}
      passHref={passHref}
    >
      {wrapChildrenAsLink ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={className}>{children}</a>
      ) : (
        React.cloneElement(children as React.ReactElement)
      )}
    </NextLink>
  );
};

export default I18nLink;
