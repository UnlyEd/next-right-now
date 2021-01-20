import I18nLink from '@/modules/core/i18n/components/I18nLink';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  previousSectionHref?: string; // If not defined, then won't show the previous section link
  nextSectionHref?: string; // If not defined, then won't show the next section link
};

const HomePageLink: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <I18nLink href={'/'}>
      <FontAwesomeIcon icon={['fas', 'home']} />
      {t('nav.indexPage.link', 'Accueil')}
    </I18nLink>
  );
};

const NextSectionLink: React.FunctionComponent<{ nextSectionHref: string }> = (props) => {
  const { nextSectionHref } = props;

  return (
    <I18nLink href={nextSectionHref}>
      <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
      Next section
    </I18nLink>
  );
};

const PreviousSectionLink: React.FunctionComponent<{ previousSectionHref: string }> = (props) => {
  const { previousSectionHref } = props;

  return (
    <I18nLink href={previousSectionHref}>
      <FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />
      Previous section
    </I18nLink>
  );
};

/**
 * Sidebar footer
 *
 * Displays a Home link shortcut, and an optional link to go to the next section
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const SidebarFooter: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    nextSectionHref,
    previousSectionHref,
  } = props;

  return (
    <div
      className={'sidebar-footer'}
      css={css`
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      `}
    >
      {
        previousSectionHref && nextSectionHref && (
          <>
            <PreviousSectionLink previousSectionHref={previousSectionHref} />
            {' - '}
            <NextSectionLink nextSectionHref={nextSectionHref} />
            <HomePageLink />
          </>
        )
      }

      {
        !previousSectionHref && nextSectionHref && (
          <>
            <HomePageLink />
            {' - '}
            <NextSectionLink nextSectionHref={nextSectionHref} />
          </>
        )
      }

      {
        previousSectionHref && !nextSectionHref && (
          <>
            <PreviousSectionLink previousSectionHref={previousSectionHref} />
            {' - '}
            <HomePageLink />
          </>
        )
      }
    </div>
  );
};

export default SidebarFooter;
