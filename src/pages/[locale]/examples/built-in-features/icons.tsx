import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/icons';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getExamplesCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleIconsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'icons'}
      headProps={{
        title: 'Icons examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Icons examples, using Font-Awesome</h1>

        <Alert color={'warning'}>
          FA provides a free icons set, and paid ones. NRN only comes with the free set.<br />
          But it is completely possible to use a paid icon set, if you wish so (we do in our Enterprise apps).
        </Alert>

        <hr />

        <p>
          In order to make FA icons usable in both server-side and client-side, you need to manually import those you want to use in the <code>_app</code> component, as follow:
        </p>

        <Code
          text={`
            import { config, library } from '@fortawesome/fontawesome-svg-core';
            import '@fortawesome/fontawesome-svg-core/styles.css';

            // Import your icons, and then add them to the libary
            import { faGithub } from '@fortawesome/free-brands-svg-icons';
            import { faBook, faBookReader, faCoffee, faHome, faUserCog } from '@fortawesome/free-solid-svg-icons';

            // See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
            config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
            library.add(
              faGithub,
              faBook, faBookReader, faCoffee, faHome, faUserCog,
            );
          `}
        />

        <hr />

        <p>
          You can then use FA icons like this:<br />
          <br />
          <FontAwesomeIcon icon={['fab', 'github']} />
          <br />
          <FontAwesomeIcon icon={['fas', 'home']} />
        </p>

        <p>
          Using the below code:
        </p>

        <Code
          text={`
            <FontAwesomeIcon icon={['fab', 'github']} /> // fab stands for FontAwesome "Brand"
            <FontAwesomeIcon icon={['fas', 'home']} /> // fas stands for FontAwesome "Solid"
          `}
        />

        <br />

        <Alert color={'success'}>
          TypeScript support will guide you when writing{' '}
          <code>
            {`<FontAwesomeIcon icon={['fab', 'github']} />`}
          </code>, by telling you if the icon is valid.
        </Alert>

      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleIconsPage);
