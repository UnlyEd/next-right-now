/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import I18nLink from '../i18n/I18nLink';

type Props = {
  nextSectionHref?: string; // If not defined, then won't show the next section link
};

/**
 * Sidebar footer
 *
 * Displays a Home link shortcut, and an optional link to go to the next section
 *
 * @param props
 */
const SidebarFooter: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { nextSectionHref } = props;
  const { t } = useTranslation();

  return (
    <div
      className={'sidebar-footer'}
      css={css`
        display: flex;
        justify-content: space-around;
      `}
    >
      <I18nLink href={'/'}>
        <FontAwesomeIcon icon={['fas', 'home']} />
        {t('nav.indexPage.link', 'Accueil')}
      </I18nLink>

      {
        nextSectionHref && (
          <>
            {' - '}
            <I18nLink href={nextSectionHref}>
              <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
              Next section
            </I18nLink>
          </>
        )
      }
    </div>
  );
};

export default SidebarFooter;
