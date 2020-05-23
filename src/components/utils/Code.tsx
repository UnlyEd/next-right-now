/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

type Props = {
  text: string;
}

/**
 * Documentation page
 *
 * Basically wraps the children in a white container
 *
 * @param props
 */
const Code: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { text } = props;

  return (
    <CodeBlock
      codeBlockStyle={{
        textAlign: 'left',
      }}
      text={text}
      language={'tsx'}
      showLineNumbers={true}
      theme={dracula}
      wrapLines
    />
  );
};

export default Code;
