import Link from 'next/link';
import React from 'react';

const I18nLink = (props: Props): JSX.Element => {
  const {
    children,
    as,
    href,
    lang,
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

  // TODO check is allowed lang
  if (lang) {
    i18nHref = removeTrailingSlash(`/[lang]${i18nHref}`);

    // Apply default if "as" isn't specified (otherwise, keep provided value)
    if (!as) {
      i18nAs = removeTrailingSlash(`/${lang}${href}`);
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
  lang: string;
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
}

export default I18nLink;
