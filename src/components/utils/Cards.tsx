/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { CardDeck } from 'reactstrap';

type Props = {
  children: ReactNode;
}

/**
 * Wrapper for Reactstrap <Card> component, to display cards as a Deck and apply common styling on all cards
 *
 * @param props
 */
const Cards: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;

  return (
    <CardDeck
      css={css`
        .card {
          .card-subtitle {
            font-style: italic;
            text-transform: uppercase;
          }

          .card-text{
            margin-top: 10px;
          }
        }
      `}
    >
      {children}
    </CardDeck>
  );
};

export default Cards;
