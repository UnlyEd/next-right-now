/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import AnimatedLoader from '../components/svg/AnimatedLoader';

const Loader: React.FunctionComponent<Prop> = (props: Prop): JSX.Element => {
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

type Prop = {}

export default Loader;
