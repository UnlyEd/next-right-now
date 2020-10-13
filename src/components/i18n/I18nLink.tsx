import isArray from 'lodash.isarray';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import NextLink from 'next/link';
import React from 'react';

import useI18n, { I18n } from '../../hooks/useI18n';
import {
  I18nRoute,
  resolveI18nRoute,
} from '../../utils/app/router';

type ParamValueToForward = string | number | Array<string | number>;

type Props = {
  as?: string;
  children: React.ReactNode;
  className?: string;
  href: string;
  locale?: string; // The locale can be specified, but it'll fallback to the current locale if unspecified
  params?: { [key: string]: ParamValueToForward };
  passHref?: boolean;
  prefetch?: boolean;
  query?: { [key: string]: ParamValueToForward };
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  wrapChildrenAsLink?: boolean; // Helper to avoid writing redundant code
};

/**
 * Wrapper around the native Next.js <Link> component. Handles localised links.
 *
 * Use the current active locale by default
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
