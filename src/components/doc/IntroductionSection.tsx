import { css } from '@emotion/core';
import React from 'react';
import {
  Alert,
  Jumbotron,
} from 'reactstrap';

import { LogEvent } from '../../types/Amplitude';
import I18nLink from '../i18n/I18nLink';
import ExternalLink from '../utils/ExternalLink';

type Props = {
  // XXX Beware when passing down the "logEvent", because it'll use the props attached from the <Amplitude> tag it comes from
  //  It's not an issue here, because we don't "supercharge" it with additional event/user properties
  //  But, if we had wanted to do so, we should have used a different <Amplitude> component here, and supercharge its properties
  logEvent: LogEvent;
}

/**
 * Introduction documentation section
 *
 * @param props
 */
const IntroductionSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { logEvent } = props;

  return (
    <Jumbotron
      className={'center'}
    >
      <h1>Next Right Now Demo</h1>
      <h2
        css={css`
          font-size: 20px;
        `}
      >
        This demo uses the preset
        <ExternalLink href={`https://github.com/UnlyEd/next-right-now/tree/${process.env.NEXT_PUBLIC_NRN_PRESET}`}>
          <code>{process.env.NEXT_PUBLIC_NRN_PRESET}</code>
        </ExternalLink>
      </h2>

      <ExternalLink
        href={'https://unlyed.github.io/next-right-now/concepts/presets'}
        onClick={(): number => logEvent('open-what-is-preset-doc')}
      >
        What is a preset?
      </ExternalLink>
      &nbsp;-&nbsp;
      <ExternalLink
        href={'https://unlyed.github.io/next-right-now/getting-started/select-preset'}
        onClick={(): number => logEvent('open-see-all-presets-doc')}
      >
        See all presets
      </ExternalLink>

      <hr />

      <Alert color={'info'}>
        Next Right Now (NRN) is a flexible production-grade boilerplate featuring Next.js framework.<br />
        It can be used as a boilerplate to get started your own project, or as a learning resource.
      </Alert>

      <p>
        General documentation about NRN is available at
        <ExternalLink href={'https://unlyed.github.io/next-right-now/'} suffix={null}>https://unlyed.github.io/next-right-now/</ExternalLink>.<br />
        The role of this demo is to showcase what's built-in <b>within the selected preset only</b>.<br />
      </p>

      <Alert color={'warning'}>
        Please note that the documentation is <b>hardcoded in English</b>, so don't expect it to change when switching language.
        Nav/Footer component are localised, as well as dynamic content and i18n examples.<br />
        <br />
        You can switch locale from the footer or by clicking on{' '}
        <I18nLink href={`/`} locale={'fr-FR'}>fr-FR</I18nLink> or <I18nLink href={`/`} locale={'en-US'}>en-US</I18nLink>.
      </Alert>

    </Jumbotron>
  );
};

export default IntroductionSection;
