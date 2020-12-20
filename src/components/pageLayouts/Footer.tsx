import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NRN_CO_BRANDING_LOGO_URL } from '../../constants';
import useCustomer from '../../hooks/useCustomer';
import useUserSession, { UserSession } from '../../hooks/useUserSession';
import { CSSStyles } from '../../types/CSSStyles';
import { Asset } from '../../types/data/Asset';
import { Customer } from '../../types/data/Customer';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { SIZE_XS } from '../../utils/assets/logo';
import GraphCMSAsset from '../assets/GraphCMSAsset';
import Logo from '../assets/Logo';
import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
import I18nLink from '../i18n/I18nLink';
import DisplayOnBrowserMount from '../rehydration/DisplayOnBrowserMount';

type Props = {
  style?: CSSStyles;
};

const Footer: React.FunctionComponent<Props> = (props) => {
  const {
    style,
  } = props;
  const { t } = useTranslation();
  const { deviceId }: UserSession = useUserSession();
  const customer: Customer = useCustomer();
  const { availableLanguages } = customer;
  const shouldDisplayI18nButton = availableLanguages?.length > 1;
  const theme = useTheme<CustomerTheme>();
  const { backgroundColor, onBackgroundColor, logo } = theme;
  const logoSizesMultipliers = [
    {
      size: SIZE_XS,
      multiplier: 1, // We wanna keep the logos in the footer big and visible even on small devices, we've got enough space
    },
  ];
  const copyrightOwner = customer?.label;
  const currentYear = (new Date()).getFullYear();

  return (
    <div
      id="footer"
      className={'footer'}
      style={style}
      css={css`
        color: ${onBackgroundColor};
        background-color: ${backgroundColor};
        padding: 20px 50px;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        @media (max-width: 991.98px) {
          flex-direction: column;
          padding: 20px;
          height: 40vh;
        }
      }

      img {
        max-width: 300px;
      }

      .column-center {
        align-self: flex-end;
      }

      .column-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .credits {
        opacity: 0.35;
        margin-left: 20px
      }

      .credits-container {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 991.98px) {
          display: block;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      }

      .links {
        color: ${onBackgroundColor};

        @media (max-width: 991.98px) {
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      }
      `}
    >
      <section className="credits-container">
        <GraphCMSAsset
          id={'footer-logo'}
          asset={logo}
          linkOverride={{ id: 'link-footer-logo' }}
        />
        <div className={'credits'}>
          <p className={'m-0'}>
            {copyrightOwner} - {currentYear}
            <br />
            {t('footer.terms.text', 'Tous droits réservés')}
          </p>
        </div>
      </section>

      <section className={'links'}>
        <I18nLink
          href={`/terms`}
        >
          <div>
            {t('footer.terms.link', 'Conditions générales d\'utilisation')}
          </div>
        </I18nLink>
        <I18nLink
          href={`/privacy`}
        >
          <div>
            {t('footer.privacy.link', 'Politique de confidentialité')}
          </div>
        </I18nLink>
        <div
          css={css`
            margin-top: 10px;

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
      </section>
      {
        shouldDisplayI18nButton && (
          <div>
            <I18nBtnChangeLocale id={'footer-btn-change-locale'} />
          </div>
        )
      }
      <section>
        <div>
          <Logo
            id={'footer-logo-unly-brand'}
            logo={{
              url: NRN_CO_BRANDING_LOGO_URL,
              link: {
                url: 'https://github.com/unlyEd',
                target: '_blank',
              },
            } as unknown as Asset}
            width={100}
            height={50}
            sizesMultipliers={logoSizesMultipliers}
          />
        </div>
      </section>
    </div>
  );
};

export default Footer;
