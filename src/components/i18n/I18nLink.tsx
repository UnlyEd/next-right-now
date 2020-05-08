import Link from 'next/link';
import React from 'react';
import useI18n, { I18n } from '../../hooks/useI18n';
import { I18nRoute, resolveI18nRoute } from '../../utils/app/router';

const I18nLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    as,
    children,
    href,
    ...rest // Should only contain valid next/Link props
  } = props;
  const { locale }: I18n = useI18n();
  const {
    i18nHref,
    i18nAs,
  }: I18nRoute = resolveI18nRoute({ as, href, locale });

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
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
}

export default I18nLink;
