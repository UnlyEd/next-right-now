import { css } from '@emotion/core';
import React from 'react';

import Text from './utils/Text';

type Props = {}

/**
 * This component is a template meant to be duplicated to quickly get started with new React components.
 *
 * @param props
 */
const ComponentTemplate: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <Text
      css={css`
        margin: 30px;
    `}
    >
      {`
        This component is a template meant to be duplicated to quickly get started with new React components.

        Feel free to adapt it at your convenience
      `}
    </Text>
  );
};

export default ComponentTemplate;
