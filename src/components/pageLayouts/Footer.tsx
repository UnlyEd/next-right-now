import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
} from 'reactstrap';

import useCustomer from '../../hooks/useCustomer';
import useUserSession, { UserSession } from '../../hooks/useUserSession';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Asset } from '../../types/data/Asset';
import { Customer } from '../../types/data/Customer';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { SIZE_XS } from '../../utils/assets/logo';
import AirtableAsset from '../assets/AirtableAsset';
import Logo from '../assets/Logo';
import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
import I18nLink from '../i18n/I18nLink';
import DisplayOnBrowserMount from '../rehydration/DisplayOnBrowserMount';

type Props = {};

const Footer: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const { deviceId }: UserSession = useUserSession();
  const customer: Customer = useCustomer();
  const theme = useTheme<CustomerTheme>();
  const { primaryColor, logo: logoAirtable } = theme;
  const logo = logoAirtable as AirtableRecord<Asset>;
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
      css={css`
        background: ${primaryColor};
        padding: 20px 50px;
        color: white;

        a {
          color: white;
        }

        img {
          max-width: 100%;
        }

        .column-center {
          align-self: flex-end;
        }

        .column-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}
    >
      <Row className={'justify-content-end'}>
        <Col md={4} xs={12} className={'column-left text-md-left mt-4'}>
          <AirtableAsset
            id={'footer-logo-organisation-brand'}
            asset={logo}
            linkOverride={{ id: 'link-footer-logo-organisation-brand' }}
          />
        </Col>
        <Col md={4} xs={12} className={'column-center align-items-end mt-4'}>
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
        <Col md={4} xs={12} className={'column-right text-md-right mt-4'}>
          <div>
            <I18nBtnChangeLocale />
          </div>
          <div>
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
