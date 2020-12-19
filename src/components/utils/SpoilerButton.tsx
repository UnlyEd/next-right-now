import classnames from 'classnames';
import React, { useState } from 'react';

type Props = {
  previewElement: JSX.Element;
  spoilerElement: JSX.Element;
  className?: string;
  href: string;
  target?: string;
  id?: string;
}

/**
 * Displays a preview element until the preview is clicked, then displays the spoiler element.
 * Meant to be used to hide some information until the preview is clicked.
 *
 * The spoiler element is a link, which redirects to another web page, or can open the email/phone native.
 * Doesn't have built-in analytics event support. Those need to be implemented by the caller.
 *
 * XXX Defining the "key" attributes will ensure each instance is treated completely separately and won't share its state with another instance.
 *
 * The elements types are hardcoded:
 *  - previewElement is a clickable <span> element
 *  - spoilerElement is a clickable <a> element
 */
const SpoilerButton: React.FunctionComponent<Props> = (props): JSX.Element => {
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

export default SpoilerButton;
