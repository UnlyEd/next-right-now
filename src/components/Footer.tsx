/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import Link from 'next/link';
import React from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';
import { compose } from 'recompose';

import EnglishFlag from '../components/svg/EnglishFlag';
import FrenchFlag from '../components/svg/FrenchFlag';
import { Customer } from '../types/data/Customer';
import { Theme } from '../types/data/Theme';
import { LANG_EN, LANG_FR } from '../utils/i18n';
import { SIZE_XS } from '../utils/logo';
import { getValue, getValueFallback } from '../utils/record';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import GraphCMSAsset from './GraphCMSAsset';
import Logo from './Logo';
import Tooltip from './Tooltip';

const fileLabel = 'components/Footer';

const Footer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    customer,
    theme,
    lang,
  } = props;
  const { t } = useTranslation();
  const logoSizesMultipliers = [
    {
      size: SIZE_XS,
      multiplier: 1, // We wanna keep the logos in the footer big and visible even on small devices, we've got enough space
    },
  ];

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering footer (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // Resolve values, handle multiple fallback levels
  const copyrightOwner = getValueFallback([
    { record: customer, key: 'label' },
  ]);
  const currentYear = (new Date()).getFullYear();
  return (

    <div
      id="footer"
      className={'footer align-items-center center'}
      css={{
        background: getValue(theme, 'primaryColor'),
        padding: '20px 50px',
        color: 'white',
        a: {
          color: 'white',
        },
        img: {
          maxWidth: '100%',
        },
      }}
    >
      <Row className={'justify-content-end align-items-end'}>
        <Col md={4} xs={12} className={'text-md-left text-center mt-4'}>
          <GraphCMSAsset
            id={'footer-logo-organisation-brand'}
            asset={getValue(customer, 'theme.logo')}
            linkOverride={{ id: 'link-footer-logo-organisation-brand' }}
            transformationsOverride={{
              width: 150,
              height: 200,
            }}
          />
        </Col>
        <Col md={4} xs={12} className={'mt-4'}>
          <p className={'m-0'}>
            {copyrightOwner} - {currentYear}
            <br />
            {t('footer.terms.text', 'Tous droits réservés')}
          </p>
          <Link
            href={`/terms`}
            passHref={true}
          >
            <a>
              <div
                css={{
                  marginTop: '20px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {t('footer.terms.link', 'Conditions générales d\'utilisation')}
              </div>
            </a>
          </Link>
        </Col>
        <Col md={4} xs={12} className={'text-md-right text-center mt-3'}>
          <Button
            onClick={(): void => {
              const universalCookiesManager = new UniversalCookiesManager();
              universalCookiesManager.setLanguage(lang === LANG_FR ? LANG_EN : LANG_FR);
              location.reload();
            }}
            css={css`
              background-color: transparent;
              border: none;
              margin-bottom: 20px;
              transition: 0.5s ease-in-out;

              :hover{
                background-color: transparent;
                border: none;
                box-shadow: 0px 2px 30px -2px rgba(0,0,0,0.66);
                cursor: pointer;
              }

              .small-text {
                font-size: 12px;
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
          <br />
          <Logo
            id={'footer-logo-unly-brand'}
            logo={{
              url: '/static/images/LOGO_Powered_by_UNLY_monochrome_WHITE.svg',
              link: {
                url: 'https://unly.org/',
                target: '_blank',
              },
            }}
            width={100}
            height={50}
            sizesMultipliers={logoSizesMultipliers}
          />
        </Col>
      </Row>
    </div>
  );
};

type Props = {
  customer: Customer;
  theme: Theme;
  t: Function;
  lang: string;
}

export default compose(
  withTranslation(['common']),
)(Footer);
