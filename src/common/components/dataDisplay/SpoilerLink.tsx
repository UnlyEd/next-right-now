import classnames from 'classnames';
import React, { useState } from 'react';

export type Props = {
  /**
   * Element displayed within a `span`, until it is clicked.
   *
   * Is hidden once clicked.
   */
  previewElement: JSX.Element;

  /**
   * Element displayed within a `Link` once the preview element has been clicked.
   *
   * Redirects to another web page, or can open the email/phone using the browser's native feature.
   *
   * Doesn't have built-in analytics event support. Those need to be implemented by the caller.
   */
  spoilerElement: JSX.Element;

  /**
   * CSS classes.
   */
  className?: string;

  /**
   * The path or URL to navigate to.
   *
   * Usually something like "tel:XXXXX" or "mailto:john.doe@somewhere.com"
   */
  href: string;

  /**
   * Link target.
   *
   * @default _blank
   */
  target?: string;

  /**
   * HTML id attribute. Must be unique.
   */
  id?: string;
}

/**
 * Displays a preview element until the preview is clicked, then displays the spoiler element.
 * Meant to be used to hide some information until the preview is clicked.
 *
 * > <span className="tip">XXX</span> Defining the "key" attributes will ensure each instance is treated completely separately and won't share its state with another instance.
 */
const SpoilerLink: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    previewElement,
    spoilerElement,
    className,
    href,
    target = '_blank',
    id = null,
  } = props;
  const [isPreview, setIsPreview] = useState(true);

  if (isPreview) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <span
        className={classnames('preview-button', className, 'is-preview')}
        key={id}
        onClick={(): void => setIsPreview(false)}
      >
        {previewElement}
      </span>
    );
  } else {
    return (
      <a
        href={href}
        target={target}
        className={classnames('preview-button', className, 'is-spoiler')}
        key={id}
      >
        {spoilerElement}
      </a>
    );
  }
};

export default SpoilerLink;
