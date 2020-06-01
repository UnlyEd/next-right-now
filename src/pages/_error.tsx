import * as Sentry from '@sentry/node';
import get from 'lodash.get';
import { NextPageContext } from 'next';
import NextError, { ErrorProps as NextErrorProps } from 'next/error';
import React from 'react';

export type ErrorPageProps = {
  err: Error;
  statusCode: number;
  isReadyToRender: boolean;
  children?: React.ReactElement;
}

export type ErrorProps = {
  isReadyToRender: boolean;
} & NextErrorProps;

/**
 * We override the native Next.js _error page in order to handle more use-cases, and display errors using our own error layout.
 *
 * This implementation is backward-compatible with the native implementation.
 * It'll capture all exception and forward them to Sentry.
 * It'll rely on the native "next/error" UI implementation if none is provided.
 *
 * It is used by the the "src/components/pageLayouts/DefaultLayout.tsx" file, so that all page use our custom "DefaultErrorLayout" by default.
 *
 * @example With custom error
 *   <ErrorPage
 *    statusCode={500}
 *    isReadyToRender={true}
 *    err={error}
 *   >
 *    <DefaultErrorLayout
 *    // We display a custom error instead of the native Next.js error by providing children (removing children will display the native Next.js error)
 *    error={error}
 *    />
 *   </ErrorPage>
 *
 * @example With native error
 *   <ErrorPage
 *    statusCode={500}
 *    isReadyToRender={true}
 *    err={error}
 *   />
 *
 * @param props
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js Inspiration about Sentry implementation
 * @see https://github.com/vercel/next.js/discussions/12913 Discussion about hybrid SSG/SSR apps considerations
 */
const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { statusCode, isReadyToRender, err, children = null } = props;
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    console.debug('ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  }

  // TODO rename to "forceLogTopLevelError" = true and provide false in "DefaultErrorLayout"
  if (!isReadyToRender && err) {
    // XXX getInitialProps is not called for top-level errors - See https://github.com/vercel/next.js/issues/8592
    // As a workaround, we pass err via _app and src/components/appBootstrap/MultiversalAppBootstrap.tsx so it can be captured
    Sentry.captureException(err);
  }

  return (
    <>
      {
        // Render the children if provided, or return the native NextError component from Next
        children ? (
          children
        ) : (
          <NextError
            statusCode={statusCode}
            // Only display title in non-production stages, to avoid leaking debug information to end-users
            // When "null" is provided, it'll fallback to Next.js default message (based on the statusCode)
            title={process.env.NEXT_PUBLIC_APP_STAGE !== 'production' ? get(err, 'message', null) : null}
          />
        )
      }
    </>
  );
};

/**
 * TODO Doc - Is this only called when the error happens server-side?
 *  What's the point of getInitialProps when using SSG or hybrid apps?
 *
 * @param props
 */
ErrorPage.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err, asPath } = props;
  const errorInitialProps: ErrorProps = await NextError.getInitialProps({ res, err } as NextPageContext) as ErrorProps;
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    console.debug('ErrorPage.getInitialProps - Unexpected error caught, it was captured and sent to Sentry. Error details:', err);
  }

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.isReadyToRender = true;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    // XXX Opinionated: Record an exception in Sentry for 404, if you don't want this then uncomment the below code
    // if (res.statusCode === 404) {
    //   return { statusCode: 404, isReadyToRender: true };
    // }

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
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );

  return errorInitialProps;
};

export default ErrorPage;
