import { css } from '@emotion/react';
import React from 'react';
import { Container } from 'reactstrap';

type Props = {
  children: React.ReactNode;
}

/**
 * Page wrapper handling the display of the Next.js Page component (as "children").
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 */
const PageContainer: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <Container
      className={'page-container'}
      css={css`
        margin: 0 !important;
        padding: 0 !important;
        max-width: none !important;
      `}
    >
      {children}
    </Container>
  );

};

export default PageContainer;
