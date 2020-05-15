import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import * as React from 'react';

const logger = createLogger({
  label: 'components/errors/ErrorDebug',
});

type Props = {
  error?: Error;
  context?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  t?: Function;
}

/**
 * TODO Not used at the moment, was used to help debug GraphCMS back in the days, still need some refactoring
 *
 * @param props
 */
const ErrorDebug = (props: Props): JSX.Element => {
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

  if (process.env.APP_STAGE !== 'production') {
    logger.error(message);
    logger.error(stack, 'stack');
    logger.error(stringifiedContext, 'context');
  }

  return (
    <>
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

export default ErrorDebug;
