import { NextRouter } from 'next/router';
import { removeTrailingSlash } from './string';

export type Route = {
  locale: string;
  href: string;
  as?: string;
}

export type I18nRoute = {
  i18nHref: string;
  i18nAs: string;
}

/**
 * Resolve the i18n route based on the route
 *
 * I18n route add the locale at the beginning of the route
 *
 * @example '/terms' => '/fr/terms'
 *
 * @param route
 */
export const resolveI18nRoute = (route: Route): I18nRoute => {
  const { locale, href, as } = route;
  let i18nHref = href;
  let i18nAs = as;

  if (locale) {
    i18nHref = removeTrailingSlash(`/[locale]${i18nHref}`);

    // Apply default if "as" isn't specified (otherwise, keep provided value)
    if (!as) {
      i18nAs = removeTrailingSlash(`/${locale}${href}`);
    }
  }

  return {
    i18nAs,
    i18nHref,
  };
};

/**
 * Resolve the home page based on the given locale
 *
 * @example 'fr-FR' => /fr-FR
 *
 * @param locale
 */
export const resolveI18nHomePage = (locale: string): I18nRoute => {
  return {
    i18nAs: '/[locale]',
    i18nHref: `/${locale}`,
  };
};

/**
 * Resolves whether the "path" is the current active route
 *
 * Doesn't handle multi-nested paths
 *
 * @example isActive({pathname: '/[locale]'}, '') => true
 * @example isActive({pathname: '/[locale]/terms'}, '/terms') => true
 * @example isActive({pathname: '/[locale]/terms'}, '') => false
 *
 * @param router
 * @param path
 */
export const isActive = (router: NextRouter, path: string): boolean => {
  const route = router.pathname.replace('/[locale]', '');
  const currentPaths = route.split('/');

  return currentPaths[currentPaths.length - 1] === path;
};

/**
 * Redirects the current page to the "same" page, but for a different locale
 *
 * @param locale
 * @param router
 */
export const i18nRedirect = (locale, router: NextRouter): void => {
  location.href = `${router.pathname.replace('[locale]', locale)}`;
};
