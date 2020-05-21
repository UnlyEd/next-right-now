import Link from 'next/link';
import React from 'react';
import useI18n, { I18n } from '../../hooks/useI18n';
import { I18nRoute, resolveI18nRoute } from '../../utils/app/router';

type Props = {
  children: React.ReactElement | string;
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string; // The locale can be specified, but it'll fallback to the current locale if unspecified
  wrapChildrenAsLink?: boolean; // Helper to avoid writing redundant code
};

/**
 * Wrapper around the native Next.js <Link> component. Handles localised links.
 *
 * Use the current active locale by default
 *
 * @example Recommended usage
 *  <I18nLink href={`/`}>Homepage</I18nLink>
 *
 * @example When specifying the locale to use (overrides default)
 *  <I18nLink href={`/`} locale={'fr-FR'}>Homepage in "fr-FR" locale</I18nLink>
 *
 * @example The recommended usage is equivalent to this (wrapChildrenAsLink is true, by default)
 *  <I18nLink href={`/`} wrapChildrenAsLink={false}><a>Homepage</a></I18nLink>
 *
 * @example When using children that use a <a> tag, you must set wrapChildrenAsLink to false to avoid using a link within a link
 *   <I18nLink
 *     href={`/`}
 *     wrapChildrenAsLink={false}
 *   >
 *      <NavLink>Homepage</NavLink>
 *   </I18nLink>
 *
 * @param props
 */
const I18nLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { locale: currentLocale }: I18n = useI18n();
  const {
    as,
    children,
    href,
    locale = currentLocale,
    passHref = true,
    wrapChildrenAsLink = true,
    ...rest // Should only contain valid next/Link props
  } = props;
  const { i18nHref, i18nAs }: I18nRoute = resolveI18nRoute({
    as,
    href,
    locale,
  });

  return (
    <Link href={i18nHref} as={i18nAs} {...rest} passHref={passHref}>
      {wrapChildrenAsLink ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{children}</a>
      ) : (
        React.cloneElement(children as React.ReactElement)
      )}
    </Link>
  );
};

export default I18nLink;
