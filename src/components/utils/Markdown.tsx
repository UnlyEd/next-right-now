import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import MarkdownToJSX, { MarkdownOptions } from 'markdown-to-jsx';
import React from 'react';
import {
  Alert,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown as Dropdown,
} from 'reactstrap';

import { Markdown as MarkdownType } from '../../types/Markdown';
import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
import I18nLink from '../i18n/I18nLink';
import Tooltip from './SimpleTooltip';

const fileLabel = 'components/utils/Markdown';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type Props = {
  text: MarkdownType;
  markdownOptions?: MarkdownOptions;
}

const defaultMarkdownOptions: MarkdownOptions = {
  // Make some of our own components available
  overrides: { // See https://github.com/probablyup/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation
    // All links should open in a new tab, and ensure proper security by default
    a: {
      component: 'a',
      props: {
        rel: 'noopener', // Security, avoids external site opened through your site to have control over your site
        target: '_blank',
      },
    },

    // Reactstrap whitelisted components
    Alert,
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Row,

    // Our own components
    I18nLink,
    I18nBtnChangeLocale,
    Tooltip,
  },
};

/**
 * Display "text" property as Markdown, using the "markdown-to-jsx" library
 *
 * @param props
 */
const Markdown: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { text, markdownOptions: _markdownOptions } = props;
  const markdownOptions = deepmerge(defaultMarkdownOptions, _markdownOptions || {});

  // If providing a non-string input (like "null" or "undefined") then markdown-to-jsx will crash with "Cannot read property 'replace' of undefined" - See https://github.com/probablyup/markdown-to-jsx/issues/314
  if (typeof text !== 'string') {
    return null;
  }

  try {
    return (
      <MarkdownToJSX
        options={markdownOptions}
      >
        {text}
      </MarkdownToJSX>
    );

  } catch (e) {
    // Markdown conversion might crash depending on the content, and we must absolutely avoid that
    logger.error(e);
    Sentry.withScope((scope): void => {
      scope.setContext('props', props);
      Sentry.captureException(e);
    });

    return (
      <>
        {text}
      </>
    );
  }
};

export default Markdown;
