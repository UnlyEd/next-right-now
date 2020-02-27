import * as Sentry from '@sentry/node';
import { NextPageContext } from 'next';
import Error, { ErrorProps as NextErrorProps } from 'next/error';
import React from 'react';

// XXX See https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
const NRNError = (props: NRNErrorProps): JSX.Element => {
  const { statusCode, isSSRReadyToRender, err, children = null } = props;

  if (!isSSRReadyToRender && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
  }

  return (
    <>
      {
        // Render the children if provided, or return the native Error component from Next
        children ? (
          children
        ) : (
          <Error statusCode={statusCode} />
        )
      }
    </>
  );
};

NRNError.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err, asPath } = props;
  // @ts-ignore
  const errorInitialProps: ErrorProps = await Error.getInitialProps({ res, err });

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.isSSRReadyToRender = true;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404, isSSRReadyToRender: true };
    }

    if (err) {
      Sentry.captureException(err);

      return errorInitialProps;
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      Sentry.captureException(err);

      return errorInitialProps;
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    // @ts-ignore
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );

  return errorInitialProps;
};

export declare type NRNErrorProps = {
  err: Error;
  statusCode: number;
  isSSRReadyToRender: boolean;
  children?: React.ReactElement;
}

export declare type ErrorProps = {
  isSSRReadyToRender: boolean;
} & NextErrorProps;

export default NRNError;
