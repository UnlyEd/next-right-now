import { css } from '@emotion/core';
import * as React from 'react';

type Props = {
  error?: Error;
  context?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Displays a given error on screen
 *
 * Used by DefaultErrorLayout to display error debug info.
 *
 * @param props
 */
const ErrorDebug = (props: Props): JSX.Element => {
  const { error, context }: Props = props || {};
  const { message, stack } = error || {};

  let stringifiedContext;
  try {
    stringifiedContext = JSON.stringify(context, null, 2);
  } catch (e) {
    stringifiedContext = null;
  }

  return (
    <div
      css={css`
        margin-top: 30px;
        margin-bottom: 30px;
      `}
    >
      <hr />
      <i>
        The below "debug info" are only displayed on non-production stages.<br />
        Note that debug information about the error are also available on the server/browser console.
      </i>

      <h2>Debug information:</h2>

      <pre
        style={{
          fontFamily: 'monospace',
          color: '#666',
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
        <b>Error message</b>:<br />
        <code>{message}</code>
        <hr />

        {
          context && (
            <>
              <b>Error additional context</b>:<br />
              <code>{stringifiedContext}</code>
              <hr />
            </>
          )
        }

        <b>Stack trace</b>:<br />
        <code>{stack}</code>
      </pre>
    </div>
  );
};

export default ErrorDebug;
