/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Trans, useTranslation, UseTranslationResponse } from 'react-i18next';
import { Alert, Container } from 'reactstrap';
import uuid from 'uuid/v1';

import Head from '../components/Head';
import { PageProps } from '../types/PageProps';

const fileLabel = 'pages/examples';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Examples: NextPage<PageProps> = (props: PageProps): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering examples page (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: 'examples',
        },
      })}
    >
      {({ logEvent }): JSX.Element => (
        <>
          <LogOnMount eventType="page-displayed" />
          <Head />
          <div
            css={css`
              justify-content: center;
              text-align: center;
              margin-left: auto;
              margin-right: auto;
            `}
          >
            <h1>Code snippet examples</h1>

            <hr />

            <h2>i18n examples</h2>
            <Alert color={'info'}>
              <div>
                Each example shows the rendered version and its code snippet.<br />
                The goal is to showcase real-world examples to help you get started faster and give a wider overview of what's possible.<br />
                <a href={'https://react.i18next.com/'} target="blank" rel={'nofollow noreferrer'}>
                  Check the official documentation
                </a>
              </div>
            </Alert>

            <Container>
              <div>
                {t('examples.i18n.simpleTranslation', 'Traduction simple')}<br />
                <code>{'{t(\'examples.i18n.simpleTranslation\', \'Traduction simple\')}'}</code>
              </div>
              <hr />

              <div>
                {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 1 })}<br />
                <code>{'{t(\'examples.i18n.pluralTranslation\', \'Traduction avec gestion du pluriel\', { count: 1 })}'}</code>
              </div>
              <div>
                {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 2 })}<br />
                <code>{'{t(\'examples.i18n.pluralTranslation\', \'Traduction avec gestion du pluriel\', { count: 2 })}'}</code>
              </div>
              <hr />

              <div>
                <Trans
                  i18nKey={'examples.i18n.dynamicTranslation'}
                >
                  Contenu dynamique : <b>{{ uuid: uuid() }}</b>
                </Trans>
                <br />
                <code>
                  {'<Trans\n' +
                  '  i18nKey="{\'examples.i18n.dynamicTranslation\'}"\n' +
                  '>\n' +
                  '  Contenu dynamique : <b>{{ uuid: uuid() }}</b>\n' +
                  '</Trans>'}
                </code>
              </div>
              <hr />

              <div>
                <Trans
                  i18nKey={'examples.i18n.dynamicPluralTranslation'}
                  count={1}
                >
                  Nous avons trouvé {{ count: 1 }} solution pour vous.
                </Trans>
                <br />
                <code>
                  {'<Trans\n' +
                  '  i18nKey="{\'examples.i18n.dynamicPluralTranslation\'}"\n' +
                  '  count="{1}"\n' +
                  '>\n' +
                  '  Nous avons trouvé {{ count: 1 }} solution pour vous.\n' +
                  '</Trans>'}
                </code>
              </div>
              <div>
                <Trans
                  i18nKey={'examples.i18n.dynamicPluralTranslation'}
                  count={2}
                >
                  Nous avons trouvé {{ count: 2 }} solution pour vous.
                </Trans>
                <br />
                <code>
                  {'<Trans\n' +
                  '  i18nKey="{\'examples.i18n.dynamicPluralTranslation\'}"\n' +
                  '  count="{2}"\n' +
                  '>\n' +
                  '  Nous avons trouvé {{ count: 2 }} solution pour vous.\n' +
                  '</Trans>'}
                </code>
              </div>
              <hr />

            </Container>
          </div>
        </>
      )}
    </Amplitude>
  );

};

export default Examples;
