import { TFunction } from 'i18next';
import { CustomerTheme } from '../../types/data/CustomerTheme';

/**
 * Initialise the Cookie Consent UI popup
 * Relies on Osano open source "cookieconsent" software (v3) https://github.com/osano/cookieconsent
 *
 * @param theme
 * @param t
 *
 * @see https://www.osano.com/cookieconsent/documentation/
 * @see https://www.osano.com/cookieconsent/documentation/javascript-api/
 * @see https://www.osano.com/cookieconsent/download/
 */
const init = (theme: CustomerTheme, t: TFunction): void => {
  const { primaryColor } = theme;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('cookieconsent'); // XXX Requiring it will make it available in the browser (cannot be used properly as a module)

  // @ts-ignore
  const cc = window.cookieconsent;

  // Use https://www.osano.com/cookieconsent/download/ "Start Coding" to use the UI configuration builder
  // See https://www.osano.com/cookieconsent/documentation/javascript-api/ for advanced API options and documentation
  const cookieConsentSettings = {
    autoOpen: true,
    autoAttach: true,
    type: 'opt-out', //
    revokable: true,
    dismissOnScroll: false,
    dismissOnTimeout: false,
    dismissOnWindowClick: false,
    whitelistPage: [],
    blacklistPage: [],
    location: true, // XXX Can also be an object with advanced configuration to implement your own geolocation resolvers
    cookie: {
      name: 'cookieconsent_status',
      path: '/',
      domain: '',
      expiryDays: 365,
      secure: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Always use a secure cookie on non-dev stages
    },
    palette: {
      popup: {
        background: '#fff',
      },
      button: {
        background: '#fff',
        text: primaryColor,
      },
    },
    theme: 'classic',
    position: 'bottom-right',
    content: {
      header: 'Cookies used on the website!',
      message: 'This website uses cookies to improve your experience.',
      dismiss: 'Got it!',
      allow: 'Allow cookies',
      deny: 'Decline',
      link: 'Learn more',
      href: '/terms',
      target: '', // Use "_blank" if you use an external "href" value
      close: '&#x274c;',
      policy: 'Cookie Policy',
    },
    // elements: {
    //   header: '<span class="cc-header"></span>',
    //   message: '<span id="cookieconsent:desc" class="cc-message"></span>',
    //   messagelink: '<span id="cookieconsent:desc" class="cc-message"> <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a></span>',
    //   dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss"></a>',
    //   allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow"></a>',
    //   deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny"></a>',
    //   link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a>',
    //   close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close"></span>',
    // },
    // window: '<div role="”dialog”" aria-label="”cookieconsent”" aria-describedby="”cookieconsent:desc”" class="”cc-window" ”></div>',
    // compliance: {
    //   'info': '<div class="cc-compliance"></div>',
    //   'opt-in': '<div class="cc-compliance cc-highlight"></div>',
    //   'opt-out': '<div class="cc-compliance cc-highlight"></div>',
    // },
    onInitialise: function(status) {
      console.info('onInitialise', status);
    },
    onPopupOpen: function() {
      console.info('onPopupOpen');
    },
    onPopupClose: function() {
      console.info('onPopupClose');
    },
    onStatusChange: function(status, chosenBefore) {
      console.info('onStatusChange', status, chosenBefore);
    },
    onRevokeChoice: function() {
      console.info('onRevokeChoice');
    },
  };
  cc.initialise(cookieConsentSettings);

  // THis is v4...
  // cc.on('initialized', (...args) => console.log(args));
  // cc.on('error', console.error);
  // cc.on('popupOpened', () => console.log('Popup Open'));
  // cc.on('popupClosed', () => console.log('Popup Closed'));
  // cc.on('revokeChoice', () => console.log('Popup Reset'));
  // cc.on('statusChanged', (...args) => console.log(args));

};

export default init;
