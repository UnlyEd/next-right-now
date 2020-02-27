import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import * as React from 'react';
import { Button } from 'reactstrap';

const logger = createLogger({
  label: 'pages/error',
});

/**
 * We don't want to log errors when running in the browser in production environment.
 * In any other circumstances, we should log the debug message to help debug the issue. (dev, staging, and from prod server)
 *
 * @return {boolean}
 */
export const shouldLog = (): boolean => {
  if (process.env.APP_STAGE === 'production') {
    return !isBrowser();
  } else {
    return true;
  }
};

const ErrorDebug = (props: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error, context }: Props = props;
  const { message, stack } = error;

  let stringifiedContext;
  try {
    stringifiedContext = JSON.stringify(context, null, 2);
  } catch (e) {
    stringifiedContext = null;
  }

  Sentry.configureScope((scope) => {
    scope.setExtra('context', stringifiedContext);
  });
  const errorEventId = Sentry.captureException(error);

  if (shouldLog()) {
    logger.error(message);
    logger.error(stack, 'stack');
    logger.error(stringifiedContext, 'context');
  }

  // @ts-ignore
  return (
    <>
      <div>
        Service unavailable.
      </div>

      <div>
        <p>
          <Button
            color={'primary'}
            onClick={(): void =>
              // @ts-ignore XXX showReportDialog is not recognised but works fine due to the webpack trick that replaces @sentry/node
              Sentry.showReportDialog({ eventId: errorEventId })
            }
          >
            Send a report
          </Button>
        </p>
        <p>
          <Button
            onClick={(): void => {
              window.location.reload(true);
            }}
          >
            Refresh the page
          </Button>
        </p>
      </div>

      {
        process.env.APP_STAGE !== 'production' && (
          <pre
            style={{
              fontFamily: 'monospace',
              color: '#666',
              border: '1px solid #ddd',
              background: '#f4f4f4',
              pageBreakInside: 'avoid',
              fontSize: '15px',
              lineHeight: 1.6,
              overflow: 'auto',
              padding: '1em 1.5em',
              display: 'block',
              wordWrap: 'break-word',
            }}
          >
            <b>Message</b>:<br />
            <code>{message}</code>
            <hr />
            <b>Context</b>:<br />
            <code>{stringifiedContext}</code>
            <hr />
            <b>Stack</b>:<br />
            <code>{stack}</code>
            <hr />
          </pre>
        )
      }
    </>
  );
};

type Props = {
  error?: Error;
  context?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  t?: Function;
}

export default ErrorDebug;
