import Link from 'next/link';
import React from 'react';

const I18nLink = (props: Props): JSX.Element => {
  const {
    children,
    as,
    href,
    locale,
    ...rest // Should only contain valid next/Link props
  } = props;
  let i18nHref = href;
  let i18nAs = as;

  const removeTrailingSlash = (string): string => {
    if (string[string.length - 1] === '/') {
      return string.slice(0, -1);
    }

    return string;
  };

  // TODO check is allowed locale
  if (locale) {
    i18nHref = removeTrailingSlash(`/[locale]${i18nHref}`);

    // Apply default if "as" isn't specified (otherwise, keep provided value)
    if (!as) {
      i18nAs = removeTrailingSlash(`/${locale}${href}`);
    }
  }

  return (
    <Link
      href={i18nHref}
      as={i18nAs}
      {...rest}
    >
      {children}
    </Link>
  );
};

type Props = {
  children: React.ReactElement;
  locale: string;
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
}

export default I18nLink;
