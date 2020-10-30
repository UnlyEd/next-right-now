import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import startsWith from 'lodash.startswith';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';
import { Button } from 'reactstrap';

import useI18n, { I18n } from '../../hooks/useI18n';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { i18nRedirect } from '../../utils/app/router';
import { LANG_FR } from '../../utils/i18n/i18n';
import EnglishFlag from '../svg/EnglishFlag';
import FrenchFlag from '../svg/FrenchFlag';
import Tooltip from '../utils/Tooltip';

type Props = {
  onClick?: (any) => void;
}

/**
 * XXX Implementation is being kept simple for the sake of simplicity (it toggles selected language between fr/en)
 *  It doesn't match a real-world use case because there are many possible variations and we can't cover them all
 *  e.g: with country-based locales (fr-FR, en-GB) or without (fr, en)
 *
 * @param currentLocale
 * @param router
 */
const defaultHandleClick = (currentLocale: string, router): void => {
  const newLocale = startsWith(currentLocale, 'fr') ? 'en' : 'fr';
  i18nRedirect(newLocale, router);
};

/**
 * Button that changes the current language used by the application
 *
 * XXX Current UI is not particularly pretty, if you want to contribute to improve this particular component, you're welcome!
 *
 * @param props
 */
const I18nBtnChangeLocale: React.FunctionComponent<Props> = (props): JSX.Element => {
  let {
    onClick,
  } = props;
  const { lang, locale }: I18n = useI18n();
  const router: NextRouter = useRouter();
  const { primaryColor } = useTheme<CustomerTheme>();

  if (!onClick) {
    onClick = (): void => {
      defaultHandleClick(locale, router);
    };
  }

  return (
    <Button
      onClick={onClick}
      className={'btn-change-locale'}
      css={css`
        background-color: ${primaryColor};
        color: white;
        border: none;
        margin-bottom: 20px;
        transition: 0.5s ease-in-out;

        :hover {
          background-color: ${primaryColor};
          border: none;
          box-shadow: 0 2px 30px -2px rgba(0,0,0,0.66);
          cursor: pointer;
        }

        :active, :focus {
          background-color: ${primaryColor} !important;
          border: none !important;
          box-shadow: 0 2px 30px -2px rgba(0,0,0,0.66) !important;
        }

        .small-text {
          font-size: 12px;
          cursor: pointer;
        }
      `}
    >
      {lang === LANG_FR ? (
        <Tooltip
          overlay={<span><EnglishFlag />English</span>}
        >
          <span
            className={'small-text'}
          >
            <FrenchFlag />
            FR
          </span>
        </Tooltip>
      ) : (
        <Tooltip
          overlay={<span><FrenchFlag />Français</span>}
        >
          <span
            className={'small-text'}
          >
            <EnglishFlag />
            EN
          </span>
        </Tooltip>
      )}
    </Button>
  );
};

export default I18nBtnChangeLocale;
