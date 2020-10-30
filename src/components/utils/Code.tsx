import React from 'react';
import {
  CodeBlock,
  dracula,
} from 'react-code-blocks';
import { CSSStyles } from '../../types/CSSStyles';

type Props = {
  codeBlockStyle?: CSSStyles;
  codeContainerStyle?: CSSStyles;
  text: string;
}

const defaultCodeBlockStyle = {
  textAlign: 'left',
};

const defaultCodeContainerStyle = {
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
  const { codeBlockStyle, codeContainerStyle, text } = props;

  return (
    <CodeBlock
      codeBlockStyle={codeBlockStyle || defaultCodeBlockStyle}
      codeContainerStyle={codeContainerStyle || defaultCodeContainerStyle}
      text={text}
      language={'tsx'}
      showLineNumbers={true}
      theme={dracula}
      wrapLines
    />
  );
};

export default Code;
