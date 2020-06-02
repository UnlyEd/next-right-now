/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import startsWith from 'lodash.startswith';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';
import useI18n, { I18n } from '../../hooks/useI18n';
import useUserSession, { UserSession } from '../../hooks/useUserSession';
import customerContext, { CustomerContext } from '../../stores/customerContext';
import { i18nRedirect } from '../../utils/app/router';
import { SIZE_XS } from '../../utils/assets/logo';
import { LANG_FR } from '../../utils/i18n/i18n';
import GraphCMSAsset from '../assets/GraphCMSAsset';
import Logo from '../assets/Logo';
import I18nLink from '../i18n/I18nLink';
import DisplayOnBrowserMount from '../rehydration/DisplayOnBrowserMount';
import EnglishFlag from '../svg/EnglishFlag';
import FrenchFlag from '../svg/FrenchFlag';
import Tooltip from '../utils/Tooltip';

type Props = {};

const Footer: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const router: NextRouter = useRouter();
  const { deviceId }: UserSession = useUserSession();
  const customer: CustomerContext = React.useContext(customerContext);
  const { lang, locale }: I18n = useI18n();
  const theme = customer.theme;
  const { primaryColor, logo } = theme;
  const logoSizesMultipliers = [
    {
      size: SIZE_XS,
      multiplier: 1, // We wanna keep the logos in the footer big and visible even on small devices, we've got enough space
    },
  ];

  // Resolve values, handle multiple fallback levels
  const copyrightOwner = customer?.label;
  const currentYear = (new Date()).getFullYear();

  return (
    <div
      id="footer"
      className={'footer align-items-center center'}
      css={{
        background: primaryColor,
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
            asset={logo}
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
          <I18nLink
            href={`/terms`}
          >
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
          </I18nLink>
          <div
            css={css`
              margin-top: 10px;

              code {
                color: white;
              }

              i {
                cursor: help;
              }
            `}
          >
            <i
              title={'This is only informational, your activity on this website is being tracked for analytics purposes and demonstration on how to perform analytics with Next.js and Amplitude (this uses userSessionContext store provider)'}
            >
              Device id (analytics):<br />
              <DisplayOnBrowserMount
                // When using SSR, we want to render the deviceId immediately because we have access to it through server cookies
                // When using SSG, we need to wait for the browser render because we don't have access to the cookies when generating the static page
                // To test the different behaviours, refresh the both /examples and /products page with JS disabled
                // and notice how the deviceId is properly included in the HTML with SSR (/products), unlike SSG (/examples) where it's empty

                // XXX This example showcase this complex behaviour. You may want to do something similar for a "Profile" section in <Nav>,
                //  that can be rendered using both SSG/SSR depending on the page, where SSR should render the component but SSG should wait for browser re-render
                deps={[deviceId]}
              >
                <code>{deviceId}</code>
              </DisplayOnBrowserMount>
            </i>
          </div>
        </Col>
        <Col md={4} xs={12} className={'text-md-right text-center mt-3'}>
          <Button
            onClick={(): void => {
              // XXX Implementation is being kept simple for the sake of simplicity (it toggles selected language between fr/en)
              //  It doesn't match a real-world use case because there are many possible variations and we can't cover them all
              //  e.g: with country-based locales (fr-FR, en-GB) or without (fr, en)
              const newLocale = startsWith(locale, 'fr') ? 'en' : 'fr';
              i18nRedirect(newLocale, router);
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

export default Footer;
