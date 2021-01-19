import { CSSStyles } from '@/modules/core/css/types/CSSStyles';
import React from 'react';
import {
  CodeBlock,
  dracula,
} from 'react-code-blocks';
import { CodeBlockProps } from 'react-code-blocks/dist/components/CodeBlock';

export type Props = {
  /**
   * The style object to apply to the `CodeBlock` text directly i.e `fontSize` and such. [See `codeBlockStyle` type](https://github.com/rajinwonderland/react-code-blocks/blob/31e391b30a1f2835aaad4275f542329239761182/packages/react-code-blocks/src/components/CodeBlock.tsx#L19)
   */
  codeBlockStyle?: CSSStyles;

  /**
   * The style object that accesses the style parameter on the `codeTagProps` property on the `Code` component. [See `codeContainerStyle` type](https://github.com/rajinwonderland/react-code-blocks/blob/31e391b30a1f2835aaad4275f542329239761182/packages/react-code-blocks/src/components/CodeBlock.tsx#L19)
   */
  codeContainerStyle?: CSSStyles;

  /**
   * The code to be formatted.
   */
  text: string;
} & Partial<CodeBlockProps>;

const defaultCodeBlockStyle = {
  textAlign: 'left',
};

const defaultCodeContainerStyle = {
  textAlign: 'left',
};

/**
 * Displays "text" property as source code, using [`react-code-blocks` library](https://github.com/rajinwonderland/react-code-blocks).
 *
 * Pre-configured with theme color, and sane default options for ease of use.
 *
 * All props aren't specified in their documentation. [See `CodeBlockProps` type](https://github.com/rajinwonderland/react-code-blocks/blob/31e391b30a1f2835aaad4275f542329239761182/packages/react-code-blocks/src/components/CodeBlock.tsx#L6-L35)
 *
 * @param props
 */
const Code: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    codeBlockStyle,
    codeContainerStyle,
    text,
  } = props;

  return (
    <CodeBlock
      codeBlockStyle={codeBlockStyle || defaultCodeBlockStyle}
      codeContainerStyle={codeContainerStyle || defaultCodeContainerStyle}
      text={text}
      language={'tsx'}
      showLineNumbers={true}
      theme={dracula}
      wrapLines
      {...props}
    />
  );
};

export default Code;
