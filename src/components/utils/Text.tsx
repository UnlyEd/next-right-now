import React from 'react';

type Props = {
  children: string;
  tag?: string | React.ReactType;
}

/**
 * Automatically break lines for text
 * Allow usage of HTML (but not React components)
 *
 * Avoids relying on <br /> for every line break
 *
 * @example
 * <Text>
 *   {`
 *     First line
 *
 *     Another line, which will respect line break
 *  `}
 * </Text>
 *
 * @param props
 */
export const Text: React.FunctionComponent<Props> = (props) => {
  const { children, tag: Wrapper = 'div' } = props;

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
