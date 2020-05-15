/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import * as React from 'react';
import { Button } from 'reactstrap';

const logger = createLogger({
  label: 'components/errors/DefaultErrorLayout',
});

type Props = {
  error: Error;
  context?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Default error layout, used by DefaultLayout to display errors instead of the page's content, when an error is caught
 *
 * Displays a report dialog modal allowing end-users to provide a manual feedback about what happened.
 *
 * TODO make content dynamic (props)
 *
 * @param props
 */
const DefaultErrorLayout = (props: Props): JSX.Element => {
  const { error } = props;
  const errorEventId = Sentry.captureException(error);

  return (
    <div
      css={css`
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;

        .title {
          margin-top: 30px;
          margin-bottom: 30px;
        }
      `}
    >
      <div className={'title'}>
        <h1>Service currently unavailable</h1>
        <pre>Error 500.</pre>
      </div>

      <div>
        <p>
          Try to refresh the page. Please contact our support below if the issue persists.
        </p>
        <Button
          color={'primary'}
          onClick={(): void =>
            // @ts-ignore XXX showReportDialog is not recognised by TS (due to the webpack trick that replaces @sentry/node), but it works just fine
            Sentry.showReportDialog({ eventId: errorEventId })
          }
        >
          Contact technical support
        </Button>
      </div>
    </div>
  );
};

export default DefaultErrorLayout;
