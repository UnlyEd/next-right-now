import {
  Amplitude,
  LogOnMount,
} from '@amplitude/react-amplitude';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';
import {
  Trans,
  useTranslation,
} from 'react-i18next';
import {
  Alert,
  Container,
} from 'reactstrap';
import useI18n, { I18n } from '../../hooks/useI18n';
import { GenericObject } from '../../types/GenericObject';
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
  quickPreviewTitle?: string;
} & SoftPageProps;

type Device = 'mobile' | 'tablet' | 'small-desktop' | 'large-desktop' | null;

const DefaultExplanationTooltipOverlay: React.FunctionComponent = (): JSX.Element => {
  return (
    <Trans
      i18nKey={'quickPreviewLayout.quickPreviewTitleHelp'}
    >
      <span>
        Vous visualisez actuellement "l'Aperçu rapide", conçu pour être intégré à un CMS.<br />
        Dans le cadre de cette démo, nous l'affichons depuis le CMS "Stacker".<br />
        Le but est de donner la possibilité d'embarquer du contenu riche depuis votre CMS, à travers l'utilisation d'une <code>iframe</code>.<br />
        De cette manière, les éditeurs peuvent prévisualiser comment le contenu sur lequel ils travaillent s'affichera réellement sur le site final, sans quitter leur CMS.
      </span>
    </Trans>
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
const QuickPreviewLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    ExplanationTooltipOverlay = DefaultExplanationTooltipOverlay,
    headProps = {},
    pageName,
    quickPreviewTitle,
  } = props;
  // const [simulatedDevice, setSimulatedDevice] = useState<Device>();
  const { locale }: I18n = useI18n();
  const { t } = useTranslation();

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
              href={`/api/preview?redirectTo=/${locale}/examples/native-features/example-with-ssg`}
            >
              {t('quickPreviewLayout.enablePreviewMode', `Aller à l'environnement de prévisualisation`)}
            </ExternalLink>
            &nbsp;
            <Tooltip
              overlay={
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('quickPreviewLayout.enablePreviewModeHelp', `Ouvre un nouvel onglet sur <b>l'environnement de prévisualisation</b>, et redirige vers la page d'exemple SSG.<br />
                      Cet environnement de prévisualisation est utile pour voir comment le site se comporte dans son ensemble. Il n'est pas limité à l'aperçu d'un seul élément, contrairement à "l'Aperçu rapide".`),
                  }}
                />}
              placement={'bottom'}
            >
              <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
            </Tooltip>
          </div>
          <div className={'explanations-container'}>
            {
              quickPreviewTitle ? quickPreviewTitle : t('quickPreviewLayout.quickPreviewTitle', `Aperçu rapide`)
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

export default QuickPreviewLayout;
