import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';
import {
  Trans,
  useTranslation,
} from 'react-i18next';
import { Button } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';

import usePreviewMode, { PreviewMode } from '../../hooks/usePreviewMode';
import { stringifyQueryParameters } from '../../utils/app/router';
import {
  startPreviewMode,
  stopPreviewMode,
} from '../../utils/nextjs/previewMode';
import ExternalLink from '../utils/ExternalLink';
import Tooltip from '../utils/Tooltip';

type Props = {}

const ExplanationTooltipOverlay: React.FunctionComponent = (): JSX.Element => {
  return (
    <Trans
      i18nKey={'previewModeBanner.previewModeTitleHelp'}
    >
      <span>
        When the Next.js <b>preview mode</b> is enabled, SSG is by-passed and all pages behave as if they were using SSR.<br />
        It's a great feature when you want to preview content on staging without having to rebuild your whole application.<br />
        <ExternalLink href={'https://nextjs.org/docs/advanced-features/preview-mode'}>Learn more</ExternalLink><br />
        <br />
        Disabling <b>preview mode</b> will make SSG pages go back to their normal behaviour, but we decided to always enforce it in the staging stage (force opt-in).<br />
        <br />
        We also decided the preview mode won't be enabled in the production stage, because we want to preview content only in staging, and see the real data in production.<br />
        This is a choice, it could be implemented differently, but it's what makes the most sense to us, considering our publication workflow.<br />
        <br />
        On SSR pages, the <b>preview mode</b> has no effect and is being ignored.
      </span>
    </Trans>
  );
};

/**
 * The behaviour of this component is completely different based on the stage the application is running within.
 *
 * Development: Display the banner and allow to enable/disable preview mode (for testing purposes)
 * Staging: Displays the banner that highlights the fact we're running inside a "preview environment"
 * Production: Doesn't display anything
 *
 * @param props
 */
const PreviewModeBanner: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { preview }: PreviewMode = usePreviewMode();
  const router: NextRouter = useRouter();
  const queryParameters: string = stringifyQueryParameters(router);
  const { t } = useTranslation();

  if (process.env.NEXT_PUBLIC_APP_STAGE === 'production') {
    return null;
  }

  return (
    <Alert
      color={preview ? 'warning' : 'info'}
      css={css`
        display: flex;
        position: relative;
        flex-direction: row;
        justify-content: center;
        text-align: center;

        @media (max-width: 991.98px) {
          flex-direction: column;

          .right {
            display: block;
          }
        }

        @media (min-width: 992px) {
          .right {
            position: absolute;
            right: 20px;
          }
        }

        [class*="fa-"] {
          margin-bottom: 1px
        }
      `}
    >
      {
        preview ? (
          <div>
            <span>
              {t(`previewModeBanner.previewModeEnabledTitle`, `Vous êtes sur l'environnement de prévisualisation`)}
              &nbsp;
              <Tooltip
                overlay={<ExplanationTooltipOverlay />}
                placement={'bottom'}
              >
                <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
              </Tooltip>
            </span>

            {
              process.env.NEXT_PUBLIC_APP_STAGE === 'development' && (
                <span className={'right'}>
                  <Button
                    color={'link'}
                    onClick={(): void => stopPreviewMode(queryParameters)}
                    onKeyPress={(): void => stopPreviewMode(queryParameters)}
                  >
                    {t(`previewModeBanner.stopPreviewMode`, `Stopper l'environnement de prévisualisation`)}
                  </Button>
                </span>
              )
            }
          </div>
        ) : (
          <div>
            <span>
              {t(`previewModeBanner.previewModeDisabledTitle`, `L'environnement de prévisualisation est désactivé`)}
              &nbsp;
              <Tooltip
                overlay={<ExplanationTooltipOverlay />}
                placement={'bottom'}
              >
                <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
              </Tooltip>
            </span>

            {
              process.env.NEXT_PUBLIC_APP_STAGE === 'development' && (
                <span className={'right'}>
                  <Button
                    color={'link'}
                    onClick={(): void => startPreviewMode(queryParameters)}
                    onKeyPress={(): void => startPreviewMode(queryParameters)}
                  >
                    {t(`previewModeBanner.startPreviewMode`, `Démarrer l'environnement de prévisualisation`)}
                  </Button>
                </span>
              )
            }
          </div>
        )
      }
    </Alert>
  );
};

export default PreviewModeBanner;
