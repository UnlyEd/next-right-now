/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Jumbotron } from 'reactstrap';

import I18nLink from '../i18n/I18nLink';
import Text from '../utils/Text';

type Props = {
  // XXX Beware when passing down the "logEvent", because it'll use the props attached from the <Amplitude> tag it comes from
  //  It's not an issue here, because we don't "supercharge" it with additional event/user properties
  //  But, if we had wanted to do so, we should have used a different <Amplitude> component here, and supercharge its properties
  logEvent: Function;
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
      <h3> This demo uses the preset <code>{process.env.NRN_PRESET}</code></h3>

      <a
        href={'https://unlyed.github.io/next-right-now/concepts/presets'}
        target={'_blank'} // eslint-disable-line react/jsx-no-target-blank
        rel={'noopener'}
        onClick={(): void => {
          logEvent('open-what-is-preset-doc');
        }}
      >
        What is a preset?
      </a>
      &nbsp;-&nbsp;
      <a
        href={'https://unlyed.github.io/next-right-now/getting-started/select-preset'}
        target={'_blank'} // eslint-disable-line react/jsx-no-target-blank
        rel={'noopener'}
        onClick={(): void => {
          logEvent('open-see-all-presets-doc');
        }}
      >
        See all presets
      </a>

      <hr />

      <Text>
        {`
          The purpose of this demo is to showcase what features are built-in <b>within the selected preset</b>.

          Please note that the documentation is <b>hardcoded in English</b>, so don't expect it to change when switching language.
          Nav/Footer component are localised, as well as dynamic content and i18n examples.
        `}
      </Text>

      You can switch locale from the footer or by on <I18nLink href={`/`} locale={'fr-FR'}>fr-FR</I18nLink> or <I18nLink href={`/`} locale={'en-US'}>en-US</I18nLink>.
    </Jumbotron>
  );
};

export default IntroductionSection;
