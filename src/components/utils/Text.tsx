import React, { DOMAttributes } from 'react';

export type Props = {
  /**
   * React children, usually text.
   */
  children: string;

  /**
   * HTML tag. (`span`, `div`, etc.)
   *
   * @default div
   */
  tag?: string | React.ElementType;
} & DOMAttributes<any>;

/**
 * Automatically break lines for text.
 * Allow usage of HTML (but not React components).
 *
 * Avoids relying on <code>&lt;br /&gt;</code> for every line break.
 *
 * @example
 * <Text>
 *   {`
 *     First line
 *
 *     Another line, which will respect line break
 *  `}
 * </Text>
 */
export const Text: React.FunctionComponent<Props> = (props) => {
  const {
    children,
    tag: Wrapper = 'div',
  } = props;

  return (
    <Wrapper
      style={{ whiteSpace: 'pre-line' }}
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
};

export default Text;
