/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import MarkdownToJSX, { MarkdownOptions } from 'markdown-to-jsx';
import React from 'react';
import { Markdown as MarkdownType } from '../../types/Markdown';
import deepmerge from 'deepmerge';

const fileLabel = 'components/utils/Markdown';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type Props = {
  text: MarkdownType;
  markdownOptions?: MarkdownOptions;
}

const defaultMarkdownOptions: MarkdownOptions = {
  overrides: {
    a: {
      component: 'a',
      props: {
        rel: 'noopener', // Security, avoids external site opened through your site to have control over your site
        target: '_blank',
      },
    },
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
