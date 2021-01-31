import {
  css,
  useTheme,
} from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLogger } from '@unly/utils-simple-logger';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import I18nBtnChangeLocale from '@/modules/core/i18n/components/I18nBtnChangeLocale';
import Btn from '@/components/dataDisplay/Btn';
import Tooltip from '@/components/dataDisplay/Tooltip';

const fileLabel = 'modules/core/quickPreview/components/QuickPreviewBanner';
const logger = createLogger({
  label: fileLabel,
});

export type Props = {
  ExplanationTooltipOverlay?: React.FunctionComponent;
  LeftActions?: React.FunctionComponent;
  quickPreviewTitle?: string;
};

/**
 * Banner used by all Quick Preview pages.
 *
 * A Quick Preview page is meant to be used from an external CMS (e.g: Stacker).
 * The banner is meant to provide additional capabilities that focus on improving usability, within the said CMS.
 *
 * The left side of the banner provides page-specific actions.
 * The right side of the banner provides common actions available across all quick previews, such as:
 *  - Flag to change current language
 *  - Refresh button to force refresh the page
 */
const QuickPreviewBanner: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    ExplanationTooltipOverlay = null,
    LeftActions = null,
    quickPreviewTitle,
  } = props;
  const {
    secondaryColor,
    secondaryColorVariant1,
    onSecondaryColor,
  } = useTheme();
  const { t } = useTranslation();
  const router: NextRouter = useRouter();
  const customer: Customer = useCustomer();
  const { availableLanguages } = customer;
  const shouldDisplayI18nButton = availableLanguages?.length > 1;

  return (
    <div className={'quick-preview-banner'}>
      <div
        css={css`
          display: inline-flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          color: ${secondaryColor};
          background-color: ${secondaryColorVariant1};
          border: transparent;

          .left-actions-container,
          .explanations-container,
          .right-actions-container {
            width: calc(100vw / 3); // Each section takes the same width, dynamically calculated based on the available width
          }

          .explanations-container {
            text-align: center;

            .explanations-title {
              display: inline;
            }
          }

          .right-actions-container {
            display: flex;
            flex-direction: row-reverse; // Order elements from right to left

            .change-locale-container {
              display: inline-flex;
              align-items: center;
            }
          }
        `}
      >
        <div className={'left-actions-container'}>
          {
            LeftActions && (
              <LeftActions />
            )
          }
        </div>
        <div className={'explanations-container'}>
          {
            quickPreviewTitle ? (
              <p
                className={'explanations-title'}
                dangerouslySetInnerHTML={{ __html: quickPreviewTitle }}
              />
            ) : (
              <p
                className={'explanations-title'}
              >
                {t('quickPreviewBanner.quickPreviewTitle', `Aperçu rapide`)}
              </p>
            )
          }
          {
            !!ExplanationTooltipOverlay && (
              <Fragment>
                &nbsp;
                <Tooltip
                  overlay={<ExplanationTooltipOverlay />}
                  placement={'bottom'}
                >
                  <FontAwesomeIcon icon={['fas', 'question-circle']} size={'xs'} />
                </Tooltip>
              </Fragment>
            )
          }
        </div>
        <div className={'right-actions-container'}>
          <div className={'refresh-container'}>
            <Btn
              mode={'secondary-reverse'}
              onClick={() => router.reload()}
            >
              <FontAwesomeIcon
                icon={['fas', 'sync']}
              />
              {t('quickPreviewBanner.refresh', `Actualiser`)}
            </Btn>
          </div>
          {
            shouldDisplayI18nButton && (
              <div className={'change-locale-container'}>
                <I18nBtnChangeLocale id={'quick-preview-btn-change-locale'} />

              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default QuickPreviewBanner;
