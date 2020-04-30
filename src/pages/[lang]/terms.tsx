/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { PageProps } from '../../types/PageProps';

const fileLabel = 'pages/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Terms: NextPage<PageProps> = (props: Props): JSX.Element => {
  const { lang } = props;
  console.log('Terms props', props);
  console.log('lang', lang);

  return (
    <div>
      <h1>{lang}</h1>

      <Link
        href={'/[lang]'}
        as={'/fr'}
        passHref
      >
        <a>Index</a>
      </Link>
    </div>
  );
};

type Props = {
  lang: string;
  isStaticRendering: boolean;
} & PageProps;

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
