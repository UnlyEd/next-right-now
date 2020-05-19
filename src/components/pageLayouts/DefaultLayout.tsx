/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import React from 'react';
import { Container } from 'reactstrap';
import ErrorPage from '../../pages/_error';
import { SoftPageProps } from '../../types/pageProps/SoftPageProps';
import DefaultErrorLayout from '../errors/DefaultErrorLayout';
import Footer from './Footer';
import Head, { HeadProps } from './Head';
import Nav from './Nav';

const fileLabel = 'components/pageLayouts/DefaultLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  headProps: HeadProps;
  pageName: string;
} & SoftPageProps;

/**
 * The layout handle the positioning of elements within the page
 *
 * This Layout component adds a Nav/Footer component, and the Page component in between
 * Also, it automatically track page views (Amplitude)
 *
 * It also handle errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback)
 *
 * @param props
 */
const DefaultLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    isInIframe = false, // Won't be defined server-side
    headProps = {},
    pageName,
  } = props;

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: pageName,
        },
      })}
    >
      <Head {...headProps} />
      <LogOnMount eventType="page-displayed" />

      {/* Loaded from components/Head - See https://github.com/mikemaccana/outdated-browser-rework */}
      <div
        id="outdated"
        style={{ display: 'none' }}
      ></div>

      {
        !isInIframe && (
          <Nav />
        )
      }

      <div
        className={classnames('page-container', isInIframe ? 'is-iframe' : 'is-not-iframe')}
      >
        {
          // If an error happened, we display it instead of displaying the page
          // We display a custom error instead of the native Next.js error by providing children (removing children will display the native Next.js error)
          error ? (
            <ErrorPage
              statusCode={500}
              isReadyToRender={true}
              err={error}
            >
              <DefaultErrorLayout
                error={error}
              />
            </ErrorPage>
          ) : (
            <Container
              css={css`
                margin-top: 50px;
                margin-bottom: 50px;
              `}
            >
              {children}
            </Container>
          )
        }
      </div>

      {
        !isInIframe && (
          <Footer />
        )
      }
    </Amplitude>
  );
};

export default DefaultLayout;
