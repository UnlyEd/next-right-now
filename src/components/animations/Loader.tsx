import { css } from '@emotion/core';
import React from 'react';

import AnimatedLoader from '../svg/AnimatedLoader';

type Props = {}

const Loader: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <div
      css={css`
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      `}
    >
      <AnimatedLoader />
    </div>
  );
};

export default Loader;
