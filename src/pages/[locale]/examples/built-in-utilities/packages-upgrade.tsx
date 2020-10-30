import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/packages-upgrade';
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

const PackagesUpgradePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'packages-upgrade'}
      headProps={{
        title: 'Packages upgrade examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Packages upgrade examples</h1>

        <Alert color={'warning'}>
          Upgrading packages is a necessary step in any non-trivial application.<br />
          And upgrading any package, even to a <code>patch</code> version, <b>can result in a completely broken app</b>.<br />
        </Alert>

        <p>
          In order to reduce risks associated with packages, we've made some very opinionated decisions about how to handle our dependencies, by default.<br />
          Those decisions are based on years of experience with production systems, and are meant to avoid breaking production apps unexpectedly.<br />
          <br />
          First of all, we only install <b>fixed</b> versions.<br />
          For example, <code>"@amplitude/react-amplitude": "1.0.0"</code>, the <code>"1.0.0"</code> is a fixed version, it won't change unless we manually/expressively do it.<br />
          We don't use any automation like <code>"^1.0.0"</code> or <code>"&gt;1.0.0"</code><br />
          <br />
          Also, we configured NPM/Yarn to
          <ExternalLink href={'https://stackoverflow.com/a/30659125/2391795'}>always install fixed versions by default</ExternalLink>
          using <code>npm config set save-exact true</code><br />
        </p>

        <Alert color={'success'}>
          Using only fixed versions ensures there won't be any packages difference between your development, staging and production environments.<br />
          This alone reduces the risks tremendously. Coupled with <code>yarn.lock</code> file, it makes your deployments much safer.
        </Alert>

        <p>
          In order to simplify packages upgrade, we provide a small utility tool (which is nothing more than an alias to a <code>yarn</code> command that too few people know about).
        </p>

        <Code
          text={`
            yarn packages:upgrade

            yarn run v1.22.0
            $ yarn upgrade-interactive --latest
            info Color legend :
             "<red>"    : Major Update backward-incompatible updates
             "<yellow>" : Minor Update backward-compatible features
             "<green>"  : Patch Update backward-compatible bug fixes
            ? Choose which packages to update. (Press <space> to select, <a> to toggle all, <i> to invert selection)
             devDependencies
               name                              range   from       to      url
            ❯◯ @next/bundle-analyzer             latest  9.4.1   ❯  9.4.2   https://github.com/vercel/next.js#readme
             ◯ @types/jest                       latest  25.2.2  ❯  25.2.3  https://github.com/DefinitelyTyped/DefinitelyTyped.git
             ◯ @types/webfontloader              latest  1.6.30  ❯  1.6.31  https://github.com/DefinitelyTyped/DefinitelyTyped.git
             ◯ @typescript-eslint/eslint-plugin  latest  2.33.0  ❯  3.0.0   https://github.com/typescript-eslint/typescript-eslint#readme
             ◯ @typescript-eslint/parser         latest  2.33.0  ❯  3.0.0   https://github.com/typescript-eslint/typescript-eslint#readme
             ◯ cypress                           latest  4.5.0   ❯  4.6.0   https://github.com/cypress-io/cypress
             ◯ eslint                            latest  7.0.0   ❯  7.1.0   https://eslint.org
             ◯ now                               latest  17.1.1  ❯  19.0.1  https://vercel.com
             ◯ typescript                        latest  3.9.2   ❯  3.9.3   https://www.typescriptlang.org/

             dependencies
               name                              range   from       to      url
             ◯ i18next-locize-backend            latest  4.0.8   ❯  4.0.9   https://github.com/locize/i18next-locize-backend
             ◯ locize-lastused                   latest  3.0.4   ❯  3.0.5   https://github.com/locize/locize-lastused
             ◯ next                              latest  9.4.1   ❯  9.4.2   https://nextjs.org
             ◯ rc-tooltip                        latest  4.0.3   ❯  4.2.0   http://github.com/react-component/tooltip
             ◯ react-i18next                     latest  11.4.0  ❯  11.5.0  https://github.com/i18next/react-i18next
          `}
        />
        <br />

        <p>
          The main advantage of upgrading your packages this way is that it's <b>interactive</b>.<br />
          You can go through all packages using up/down keyboard arrows, and select those you want to update by pressing the space bar.
        </p>

        <Alert color={'danger'}>
          We strongly recommend to <b>upgrade packages one by one</b>, instead of multiple packages at once.<br />
          And then, commit each change independently, and push them independently too.<br />
          This alone, will save you tons of time if any package creates a regression, because even if you don't catch the regression immediately
          (it may only affect part of your UI/workflow that isn't covered by any automated test).<br />
          Then you'll still have the ability to compared each deployment afterwards, and figure out when did the regression occur first, and thus know which package caused it.<br />
          <br />
          Doing this will definitely <b>save you hours</b> of digging around compared to a easy massive upgrade of all deps at once.<br />
          <br />
          To save up some time, we recommend grouping related packages upgrade together. For example, we usually upgrade all apollo-related packages at once. <br />
          Not only it reduces the amount of commits/pushes/deployments, but also it makes sense because sometimes those related package are meant to be updated together.<br />
          It's usually the case with eslint, react, typescript, etc. In the end, it's up to you to learn what feels right to group together.
        </Alert>

        <Alert color={'success'}>
          It's <ExternalLink href={'https://github.com/UnlyEd/next-right-now/pull/27'}>exactly how we do it</ExternalLink>
          and it has saved us quite a few hours.<br />
          If you look at the above PR, you'll notice we did some 31 commits to update 39 packages in total.<br />
          We ran into very tough bugs (crossed regression caused by 2 different packages, one of them through a <code>patch</code> version upgrade)&nbsp;
          and it would have been very hard (not to say impossible) to figure out the root cause if we had upgraded everything at once.
        </Alert>

      </DocPage>
    </DefaultLayout>
  );
};

export default (PackagesUpgradePage);
