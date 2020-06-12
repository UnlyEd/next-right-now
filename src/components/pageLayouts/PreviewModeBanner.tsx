/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { Button } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import usePreviewMode from '../../hooks/usePreviewMode';
import { stringifyQueryParameters } from '../../utils/app/router';
import ExternalLink from '../utils/ExternalLink';
import Tooltip from '../utils/Tooltip';

type Props = {}

const stopPreviewMode = (queryParameters: string): void => {
  window.location.href = `/api/preview?stop=true&redirectTo=${window.location.pathname}${queryParameters}`;
};

const startPreviewMode = (queryParameters: string): void => {
  window.location.href = `/api/preview?redirectTo=${window.location.pathname}${queryParameters}`;
};

const ExplanationTooltipOverlay: React.FunctionComponent = (): JSX.Element => {
  return (
    <span>
      When <b>preview mode</b> is enabled, SSG is by-passed and all pages behave as if they were using SSR.<br />
      It's a great feature when you want to preview content on staging without having to rebuild your whole application.<br />
      <ExternalLink href={'https://nextjs.org/docs/advanced-features/preview-mode'}>Learn more</ExternalLink><br />
      <br />
      Disabling <b>preview mode</b> will make SSG pages go back to their normal behaviour.<br />
      <br />
      <i><b>Tip</b>: Make sure to hard refresh the page (<code>cmd+shift+r</code> on MacOs) after enabling it, to refresh the browser cache.</i><br />
      <i><b>Tip</b>: We enabled <b>preview mode</b> on the <code>production</code> stage for showcase purpose</i><br />
    </span>
  );
};

/**
 * Displays the banner that warns about whether preview mode is enabled or disabled
 *
 * Display a link to enable/disable it
 *
 * @param props
 */
const PreviewModeBanner: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { preview } = usePreviewMode();
  const router: NextRouter = useRouter();
  const queryParameters: string = stringifyQueryParameters(router);

  return (
    <Alert
      color={'warning'}
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
              Preview mode is enabled&nbsp;
              <Tooltip
                overlay={<ExplanationTooltipOverlay />}
                placement={'bottom'}
              >
                <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
              </Tooltip>
            </span>
            <span className={'right'}>
              <Button
                color={'link'}
                onClick={(): void => stopPreviewMode(queryParameters)}
                onKeyPress={(): void => stopPreviewMode(queryParameters)}
              >
                Leave preview mode
              </Button>
            </span>
          </div>
        ) : (
          <div>
            <span>
              Preview mode is disabled&nbsp;
              <Tooltip
                overlay={<ExplanationTooltipOverlay />}
                placement={'bottom'}
              >
                <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
              </Tooltip>
            </span>
            <span className={'right'}>
              <Button
                color={'link'}
                onClick={(): void => startPreviewMode(queryParameters)}
                onKeyPress={(): void => startPreviewMode(queryParameters)}
              >
                Start preview mode
              </Button>
            </span>
          </div>
        )
      }
    </Alert>
  );
};

export default PreviewModeBanner;
