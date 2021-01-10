import {
  css,
  useTheme,
} from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NRN_CO_BRANDING_LOGO_URL } from '../../constants';
import useCustomer from '../../hooks/useCustomer';
import { CSSStyles } from '../../types/CSSStyles';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Asset } from '../../types/data/Asset';
import { Customer } from '../../types/data/Customer';
import { SIZE_XS } from '../../utils/assets/logo';
import AirtableAsset from '../assets/AirtableAsset';
import Logo from '../assets/Logo';
import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
import I18nLink from '../i18n/I18nLink';

type Props = {
  style?: CSSStyles;
};

const Footer: React.FunctionComponent<Props> = (props) => {
  const {
    style,
  } = props;
  const { t } = useTranslation();
  const customer: Customer = useCustomer();
  const { availableLanguages } = customer;
  const shouldDisplayI18nButton = availableLanguages?.length > 1;
  const theme = useTheme();
  const {
    backgroundColor,
    onBackgroundColor,
    logo,
  } = theme;
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

        #footer-logo {
          max-width: 200px; // Opinionated limit
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
        <AirtableAsset
          id={'footer-logo'}
          asset={logo as AirtableRecord<Asset>}
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
