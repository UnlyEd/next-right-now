/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
  children: React.ReactElement | string;
  className?: string;
  href: string;
  id?: string;
  nofollow?: boolean;
  noreferrer?: boolean;
  onClick?: (any) => void;
  prefix?: string;
  suffix?: string;
}

/**
 * Link that point to an external website
 *
 * Use sane default for proper SEO (noreferrer disabled by default), security (nofollow enabled by default) and display (prefix/suffix)
 *
 * @param props
 */
const ExternalLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    href,
    nofollow = true,
    noreferrer = false,
    prefix = ' ', // Helper to avoid link to "stick" with text
    suffix = ' ', // Helper to avoid link to "stick" with text
    ...rest
  } = props;

  return (
    <a
      href={href}
      target={'_blank'} // eslint-disable-line react/jsx-no-target-blank
      rel={`${nofollow ? 'nofollow': ''} ${noreferrer ? 'noreferrer': ''}`}
      {...rest}
    >
      {prefix}{children}{suffix}
    </a>
  );
};

export default ExternalLink;
