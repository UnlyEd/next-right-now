/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { CardDeck } from 'reactstrap';
import classnames from 'classnames';

type Props = {
  children: ReactNode;
  maxCards?: number; // Max cards per row
}

/**
 * Wrapper for Reactstrap <Card> component, to display cards as a Deck and apply common styling on all cards
 *
 * @param props
 */
const Cards: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children, maxCards = 3 } = props;

  return (
    <CardDeck
      className={classnames(`max-cards-${maxCards}`)}
      css={css`
        &.max-cards-2 .card {
          min-width: 46%;
          max-width: 46%;
        }

        &.max-cards-3 .card {
          min-width: 30%;
          max-width: 30%;
        }

        .card {
          margin-top: 10px;

          @media (max-width: 991.98px) {
            min-width: 100% !important;
            max-width: 100% !important;
          }

          .card-subtitle {
            font-style: italic;
            text-transform: uppercase;
          }

          .card-text {
            margin-top: 10px;
          }

          .buttons {
            display: flex;
            flex-direction: column;
          }
        }
      `}
    >
      {children}
    </CardDeck>
  );
};

export default Cards;
