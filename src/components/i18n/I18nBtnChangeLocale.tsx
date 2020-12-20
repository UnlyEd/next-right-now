import startsWith from 'lodash.startswith';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';

import useI18n, { I18n } from '../../hooks/useI18n';
import { i18nRedirect } from '../../utils/app/router';
import { LANG_FR } from '../../utils/i18n/i18n';
import ToggleLanguagesButton from '../utils/ToggleLanguagesButton';

type Props = {
  id: string;
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
 * @param props
 */
const I18nBtnChangeLocale: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    id,
  } = props;
  let {
    onClick,
  } = props;
  const { lang, locale }: I18n = useI18n();
  const router: NextRouter = useRouter();

  if (!onClick) {
    onClick = (): void => {
      defaultHandleClick(locale, router);
    };
  }

  return (
    <ToggleLanguagesButton
      id={id}
      onClick={onClick}
      className={'btn-change-locale'}
      isChecked={lang === LANG_FR}
    />
  );
};

export default I18nBtnChangeLocale;
