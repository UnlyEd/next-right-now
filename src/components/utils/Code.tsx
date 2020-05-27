/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

type Props = {
  codeBlockStyle?: object;
  text: string;
}

const defaultCodeBlockStyle = {
  textAlign: 'left',
};

/**
 * Documentation page
 *
 * Basically wraps the children in a white container
 *
 * @param props
 */
const Code: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { codeBlockStyle, text } = props;

  return (
    <CodeBlock
      codeBlockStyle={codeBlockStyle || defaultCodeBlockStyle}
      text={text}
      language={'tsx'}
      showLineNumbers={true}
      theme={dracula}
      wrapLines
    />
  );
};

export default Code;
