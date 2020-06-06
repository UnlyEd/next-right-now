/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
// @ts-ignore
import Content from './TestMDXPage.mdx';

const ContentWithMDX: React.FunctionComponent = (): JSX.Element => {
  return (
    <div
      css={css`
        text-align: left !important;
      `}
    >
      <Content />
    </div>
  );
};

export default ContentWithMDX;
