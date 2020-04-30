/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import I18nLink from '../../components/I18nLink';

const fileLabel = 'pages/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Terms: NextPage<Props> = (props): JSX.Element => {
  const { lang } = props;
  console.log('Terms props', props);
  console.log('lang', lang);

  return (
    <div>
      <h1>{lang}</h1>

      <I18nLink
        lang={lang}
        href={'/'}
        passHref
      >
        <a>Index</a>
      </I18nLink>
    </div>
  );
};

type Props = {
  lang: string;
  isStaticRendering: boolean;
};

export const getStaticProps: GetStaticProps<any, any> = async (props) => {
  console.log('getStaticProps', props);
  return {
    props: {
      lang: props?.params?.lang,
      isStaticRendering: true,
    },
    // revalidate: false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: 'fr' } }, { params: { lang: 'en' } }],
    fallback: false,
  };
};

export default Terms;
