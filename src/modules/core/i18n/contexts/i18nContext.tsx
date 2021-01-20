import React from 'react';

export type I18nContext = {
  locale: string; // e.g: fr, fr-FR, en, en-US, en-GB
  lang: string; // e.g: fr, en
}

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import i18nContext from './src/stores/i18nContext';
 *  const { locale, lang }: I18nContext = React.useContext(i18nContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const i18nContext = React.createContext<I18nContext>(null);

export default i18nContext;
