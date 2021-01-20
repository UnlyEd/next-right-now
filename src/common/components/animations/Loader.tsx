import { css } from '@emotion/react';
import React from 'react';
import AnimatedLoader from './AnimatedLoader';

export type Props = {}

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
