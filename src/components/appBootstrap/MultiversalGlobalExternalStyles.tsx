/**
 * Contains all imports of external CSS libs (.css files) that must be injected in all Next.js pages.
 *
 * This approach is preferred over importing them all one by one within the _app.tsx file, because it's easier to maintain.
 *
 * Also, this file is being imported by both "src/pages/_app.tsx" and ".storybook/preview.js",
 * so that global 3rd party CSS are included when previewing components, too.
 */
import 'animate.css/animate.min.css'; // Loads animate.css CSS file. See https://github.com/daneden/animate.css
import 'bootstrap/dist/css/bootstrap.min.css'; // Loads bootstrap CSS file. See https://stackoverflow.com/a/50002905/2391795
import 'cookieconsent/build/cookieconsent.min.css'; // Loads CookieConsent CSS file. See https://github.com/osano/cookieconsent
import 'rc-tooltip/assets/bootstrap.css';
