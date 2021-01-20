import { ReactLinkProps } from '@/modules/core/react/types/ReactLinkProps';
import React, { Fragment } from 'react';

export type Props = {
  /**
   * React children, usually text.
   */
  children: React.ReactNode;

  /**
   * CSS classes.
   */
  className?: string;

  /**
   * The path or URL to navigate to.
   */
  href: string;

  /**
   * Tell bots not to follow the link when crawling (you may want to disable this depending on your use case).
   *
   * @default true
   */
  nofollow?: boolean;

  /**
   * Security, avoids external site opened through your site to have control over your site (always apply "noopener" unless you know what you're doing).
   *
   * @default true
   */
  noopener?: boolean;

  /**
   * SEO, avoids external site opened through your site to know they have been opened from your site (don't apply "noreferrer" unless you know what you're doing).
   *
   * @default false
   */
  noreferrer?: boolean;

  /**
   * Helper to avoid link to "stick" with text.
   *
   * @default " " (whitespace)
   */
  prefix?: string;

  /**
   * Helper to avoid link to "stick" with text.
   *
   * @default " " (whitespace)
   */
  suffix?: string;
} & Partial<ReactLinkProps>;

/**
 * Link that point to an external website.
 *
 * Use sane default for proper SEO (noreferrer disabled by default), security (nofollow enabled by default) and display (prefix/suffix).
 */
const ExternalLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    href,
    nofollow = true,
    noopener = true,
    noreferrer = false,
    prefix = ' ',
    suffix = ' ',
    ...rest
  } = props;

  return (
    <Fragment>
      {prefix}
      {/*// @ts-ignore*/}
      <a
        href={href}
        target={'_blank'} // eslint-disable-line react/jsx-no-target-blank
        rel={`${nofollow ? 'nofollow' : ''} ${noopener ? 'noopener' : ''} ${noreferrer ? 'noreferrer' : ''}`}
        {...rest}
      >
        {children}
      </a>
      {suffix}
    </Fragment>
  );
};

export default ExternalLink;
