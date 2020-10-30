import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
  id?: string;
  nofollow?: boolean;
  noopener?: boolean;
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
    nofollow = true, // Tell bots not to follow the link when crawling (you may want to disable this depending on your use case)
    noopener = true, // Security, avoids external site opened through your site to have control over your site (always apply "noopener" unless you know what you're doing)
    noreferrer = false, // SEO, avoids external site opened through your site to know they have been opened from your site (don't apply "noreferrer" unless you know what you're doing)
    prefix = ' ', // Helper to avoid link to "stick" with text
    suffix = ' ', // Helper to avoid link to "stick" with text
    ...rest
  } = props;

  return (
    <>
      {prefix}
      <a
        href={href}
        target={'_blank'} // eslint-disable-line react/jsx-no-target-blank
        rel={`${nofollow ? 'nofollow' : ''} ${noopener ? 'noopener' : ''} ${noreferrer ? 'noreferrer' : ''}`}
        {...rest}
      >
        {children}
      </a>
      {suffix}
    </>
  );
};

export default ExternalLink;
