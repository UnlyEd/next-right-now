/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLogger } from '@unly/utils-simple-logger';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { Alert, Container } from 'reactstrap';
import useI18n, { I18n } from '../../hooks/useI18n';
import { SoftPageProps } from '../../types/pageProps/SoftPageProps';
import Sentry from '../../utils/monitoring/sentry';
import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
import ExternalLink from '../utils/ExternalLink';
import Tooltip from '../utils/Tooltip';
import Head, { HeadProps } from './Head';

const fileLabel = 'components/pageLayouts/ItemPreviewLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  children: React.ReactNode;
  ExplanationTooltipOverlay?: React.FunctionComponent;
  headProps: HeadProps;
  pageName: string;
  previewTitle?: string;
} & SoftPageProps;

type Device = 'mobile' | 'tablet' | 'small-desktop' | 'large-desktop' | null;

const DefaultExplanationTooltipOverlay: React.FunctionComponent = (): JSX.Element => {
  return (
    <span>
      The content displayed below is an <b>item preview</b> meant to be displayed within a CMS.<br />
      For the purpose of this demo, we display it from within Stacker.<br />
      The goal is to grant the possibility to embed rich content right into your CMS, through the use of an <code>iframe</code>.<br />
      This way, editors can preview how the content you're working on will display on the actual site.
    </span>
  );
};

/**
 * Handles the positioning of top-level elements within the page
 * Simpler alternative to DefaultLayout, meant to be used for pages that are embedded within other systems (CMS, etc.)
 *
 * It does the following:
 *  - Automatically track page views (Amplitude)
 *
 * @param props
 */
const ItemPreviewLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    ExplanationTooltipOverlay = DefaultExplanationTooltipOverlay,
    headProps = {},
    pageName,
    previewTitle,
  } = props;
  // const [simulatedDevice, setSimulatedDevice] = useState<Device>();
  const router: NextRouter = useRouter();
  const currentUrl = router?.asPath;
  const { locale }: I18n = useI18n();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

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

      <div
        // className={classnames({
        //   'simulated-mobile': simulatedDevice === 'mobile',
        //   'simulated-tablet': simulatedDevice === 'tablet',
        //   'simulated-small-desktop': simulatedDevice === 'small-desktop',
        //   'simulated-large-desktop': simulatedDevice === 'large-desktop',
        // })}
      >
        <Alert
          color={'info'}
          tag={'div'}
          css={css`
          display: flex;
          justify-content: space-between;

          .change-locale-container {
            text-align: right;
          }

          .explanations-container {
            text-align: center;
          }
        `}
        >
          <div className={'left-actions-container'}>
            <ExternalLink
              href={`/api/preview?redirectTo=/${locale}`}
            >
              Preview whole site
            </ExternalLink>
            &nbsp;
            <Tooltip
              overlay={<span>
                This will open a new tab where <b>preview mode</b> is enabled for the whole site and redirect to the homepage.<br />
                Preview mode is useful to preview how the whole site behaves. It isn't limited to previewing a single item.
              </span>}
              placement={'bottom'}
            >
              <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
            </Tooltip>
          </div>
          <div className={'explanations-container'}>
            {
              previewTitle ? previewTitle : 'This is an item preview'
            }
            &nbsp;
            <Tooltip
              overlay={<ExplanationTooltipOverlay />}
              placement={'bottom'}
            >
              <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
            </Tooltip>
          </div>
          <div className={'right-actions-container'}>
            <div className={'change-locale-container'}>
              {/* XXX Commented for now because the setSimulatedDevice doesn't actually simulates a device but only change the max-width, which isn't really what we want */}
              {/* TODO Find a better implementation */}
              {/*<UncontrolledButtonDropdown>*/}
              {/*  <DropdownToggle caret color="primary">*/}
              {/*    Simulate device*/}
              {/*  </DropdownToggle>*/}
              {/*  <DropdownMenu>*/}
              {/*    <DropdownItem onClick={(): void => setSimulatedDevice('mobile')}>*/}
              {/*      Mobile*/}
              {/*    </DropdownItem>*/}
              {/*    <DropdownItem onClick={(): void => setSimulatedDevice('tablet')}>*/}
              {/*      Tablet*/}
              {/*    </DropdownItem>*/}
              {/*    <DropdownItem onClick={(): void => setSimulatedDevice('small-desktop')}>*/}
              {/*      Small desktop*/}
              {/*    </DropdownItem>*/}
              {/*    <DropdownItem onClick={(): void => setSimulatedDevice('large-desktop')}>*/}
              {/*      Large desktop*/}
              {/*    </DropdownItem>*/}
              {/*    <DropdownItem onClick={(): void => setSimulatedDevice(null)}>*/}
              {/*      Reset*/}
              {/*    </DropdownItem>*/}
              {/*  </DropdownMenu>*/}
              {/*</UncontrolledButtonDropdown>*/}
              {/*{' '}*/}
              <I18nBtnChangeLocale />
            </div>
          </div>
        </Alert>

        <Container
          fluid
          className={'preview-container'}
          css={css`
          background-color: whitesmoke;
        `}
        >
          {children}
        </Container>
      </div>
    </Amplitude>
  );
};

export default ItemPreviewLayout;
