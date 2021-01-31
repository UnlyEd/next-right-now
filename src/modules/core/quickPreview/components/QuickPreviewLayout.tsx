import {
  Amplitude,
  LogOnMount,
} from '@amplitude/react-amplitude';
import { css } from '@emotion/react';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';
import { Container } from 'reactstrap';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import Sentry from '@/modules/core/sentry/sentry';
import QuickPreviewBanner from './QuickPreviewBanner';
import Head, { HeadProps } from '@/layouts/core/components/Head';

const fileLabel = 'modules/core/quickPreview/components/QuickPreviewLayout';
const logger = createLogger({
  label: fileLabel,
});

export type Props = {
  children: React.ReactNode;
  ExplanationTooltipOverlay?: React.FunctionComponent;
  LeftActions?: React.FunctionComponent;
  Nav?: React.FunctionComponent;
  Footer?: React.FunctionComponent;
  headProps: HeadProps;
  pageName: string;
  quickPreviewTitle?: string;
  isFluid?: boolean;
} & SoftPageProps;

/**
 * Handles the positioning of top-level elements within the page
 * Simpler alternative to DefaultLayout, meant to be used for pages that are embedded within other systems (CMS, etc.)
 *
 * It does the following:
 *  - Automatically track page views (Amplitude)
 *
 * @param props
 */
const QuickPreviewLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    ExplanationTooltipOverlay,
    LeftActions,
    Nav,
    Footer,
    headProps = {},
    pageName,
    quickPreviewTitle,
    isFluid = true,
  } = props;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <Amplitude
      eventProperties={(inheritedProps): GenericObject => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: pageName,
        },
      })}
    >
      <Head {...headProps} />
      <LogOnMount eventType="page-displayed" />

      <div className={'quick-preview-layout'}>
        <QuickPreviewBanner
          ExplanationTooltipOverlay={ExplanationTooltipOverlay}
          LeftActions={LeftActions}
          quickPreviewTitle={quickPreviewTitle}
        />
        {
          Nav && (
            <Nav />
          )
        }
        <Container
          fluid={isFluid}
          className={'preview-container'}
          css={css`
            background-color: whitesmoke;
          `}
        >
          {children}
        </Container>
        {
          Footer && (
            <Footer />
          )
        }
      </div>
    </Amplitude>
  );
};

export default QuickPreviewLayout;
