/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Markdown as MarkdownType } from '../../types/Markdown';

const fileLabel = 'components/utils/Markdown';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type Renderers = {
  [key in ReactMarkdown.NodeType]?: string | ReactMarkdown.Renderer<any>;
}

type Props = {
  text: MarkdownType;
  renderers?: Renderers;
}

const defaultRenderers: Renderers = {};

/**
 * Display "text" property as Markdown, using the "react-markdown" library
 *
 * @param props
 */
const Markdown: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { text, renderers = defaultRenderers } = props;
  console.log('text', text);

  try {
    return (
      <ReactMarkdown
        source={text}
        // @ts-ignore
        renderers={renderers}
        linkTarget={'_blank'}
      />
    );

  } catch (e) {
    // Markdown conversion might crash depending on the content, and we must absolutely avoid that - See https://github.com/rexxars/react-markdown/issues/229
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
