import {
  css,
  Global,
} from '@emotion/core';

import {
  NRN_DEFAULT_FONT,
  NRN_DEFAULT_SECONDARY_COLOR,
} from '../../constants';
import { CustomerTheme } from '../../types/data/CustomerTheme';

type Props = {
  customerTheme: CustomerTheme;
}

/**
 * Those styles are applied
 *  - universally (browser + server)
 *  - globally (applied to all pages), through Layouts
 *
 * XXX Note that primaryColor, primaryAltColor and secondaryColor don't necessarily follow best practices regarding colors management.
 *  I personally recommend to take a look at https://material.io/design/color/the-color-system.html#color-theme-creation, those guidelines may fit your use-case
 *  Don't hesitate to share best practices around those, this does the job for simple use-cases
 *
 * @param props
 */
const MultiversalGlobalStyles: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { customerTheme } = props;
  const { primaryColor } = customerTheme;
  const primaryAltColor = primaryColor; // Helper for "primary alternative color", for customers with 2 primary colors (currently unused)
  const secondaryColor = NRN_DEFAULT_SECONDARY_COLOR;
  const primaryFont = NRN_DEFAULT_FONT; // You could allow custom font per customer from Theme.font (that's what we do in our proprietary app)

  return (
    <Global
      styles={css`
        html {
          // Until our custom font hasn't been applied, use those fallback fonts
          &:not(.wf-active) {
            body.nrn {
              * {
                font-family: sans-serif;
              }
            }
          }

          // Once our font has been applied, use it
          &.wf-active {
            body.nrn {
              * {
                font-family: "${primaryFont}", sans-serif !important;
              }
            }
          }
        }

        // Only applied to the main application
        body.nrn {
          background-color: #f5f5f5;

          #__next{
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }

        // Applied to all containers marked with ".nrn" - XXX could be grouped with the other one above?
        .nrn {
          .container {
            justify-content: center;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .container-white {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
          }

          .simulated-mobile {
            max-width: 575px;
          }

          .simulated-tablet {
            max-width: 767px;
          }

          .simulated-small-desktop {
            max-width: 992px;
          }

          .simulated-large-desktop {
            max-width: 1900px;
          }

          // ----------- Utilities -----------

          b, .b, strong {
            color: ${primaryColor};
            font-weight: bold;
          }

          a {
           color: ${primaryColor} !important;
          }

          .page-container {
            background-color: #f5f5f5;
            min-height: 400px; // Avoids sidebar to display on top of the footer low height pages

            @media (max-width: 991.98px) {
              min-height: 300px;
            }
          }

          .center {
            text-align: center;
          }

          .center-block {
            text-align: center;
            margin: auto;
          }

          .pcolor, [class*="primary_color"] {
            color: ${primaryColor};
            fill: ${primaryColor}; // For SVG
          }

          .pacolor {
            color: ${primaryAltColor};
          }

          .scolor {
            color: ${secondaryColor};
          }

          .pbgcolor {
            background-color: ${primaryColor};
          }

          .pabgcolor {
            background-color: ${primaryAltColor};
          }

          .sbgcolor {
            background-color: ${secondaryColor};
          }

          .btn-border{
             background-color: transparent;
             color: ${primaryColor};
             border: 1.5px solid ${primaryColor};
             border-radius: 30px;
             margin: 5px;
             padding: 5px 12px 5px 12px;
             white-space: nowrap;
             display: inline-block; // Necessary so that <a> and <button> behave identically
          }

          .btn-link {
            @media (min-width: 992px) {
              padding: 0; // Avoid padding to make it display as a link would for desktop only
            }
          }

          label {
            cursor: pointer;
          }

          button {
            cursor: pointer;
            outline: none !important; // Overrides bootstrap color around the button

            &.btn-primary {
              color: ${secondaryColor};
              background-color: ${primaryAltColor};
              border-color: ${primaryAltColor};

              &:active, &:focus {
                box-shadow: 0 0 0 0.2rem ${primaryAltColor};
              }
            }

            &.btn-outline-secondary {
              color: ${primaryAltColor};
              background-color: ${secondaryColor};

              &:active, &:focus {
                box-shadow: 0 0 0 0.2rem ${secondaryColor};
              }
            }

            &.btn-primary, &.btn-outline-secondary {
              &:hover,
              &:active,
              &:focus {
                opacity: 0.8;
              }
            }

            &.disabled {
              cursor: not-allowed;
            }
          }

          .info-label {
            display: inline-block;
            border-radius: 60px;
            border: none;
            background-color: #C9D0F6;
            color: #0028FF;
            padding: 10px 15px 7px 14px;
            margin: 1px;
          }

          .select {
            // Overrides react select styles everywhere
            *  {
              color: ${primaryColor} !important;
            }
          }

          [class*="fa-"], [class*="fal-"], [class*="fas-"], [class*="far-"] {
            margin-right: 5px;
          }

          .animated {
            // Delay control (latency)
            &.delay-100ms {
              animation-delay: 0.1s;
            }

            &.delay-200ms {
              animation-delay: 0.2s;
            }

            &.delay-400ms {
              animation-delay: 0.4s;
            }

            &.delay-600ms {
              animation-delay: 0.6s;
            }

            // Duration control (speed)
            &.duration-100ms {
              animation-duration: 0.1s;
            }

            &.duration-200ms {
              animation-duration: 0.2s;
            }

            &.duration-300ms {
              animation-duration: 0.3s;
            }

            &.duration-400ms {
              animation-duration: 0.4s;
            }

            &.duration-600ms {
              animation-duration: 0.6s;
            }

            &.duration-3000ms {
              animation-duration: 3s;
            }

            &.duration-6000ms {
              animation-duration: 6s;
            }
          }

          .fade {
            opacity: 1 !important; // Overrides default bootstrap behaviour to avoid make-believe SSR doesn't work on the demo, when JS is disabled - See https://github.com/UnlyEd/next-right-now/issues/9
          }
        }

        // Overrides of CookieConsent
        .cc-revoke {
          border: 1px solid lightgrey;
        }

        .cc-btn.cc-allow {
          background-color: ${primaryColor} !important;
          color: white !important;

          &:hover {
            opacity: 0.8;
          }
        }

        .cc-btn.cc-deny {
          color: darkgrey !important;
        }
      `}
    />
  );
};

export default MultiversalGlobalStyles;
