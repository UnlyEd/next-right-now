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
 * Display "text" property as source code, using the "react-code-blocks" library
 *
 * Pre-configured with theme color, and default sane options for ease of use
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
