import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import {
  Alert,
  Container,
} from 'reactstrap';
import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import I18nLink from '../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import Markdown from '../../../../components/utils/Markdown';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/md-as-jsx';
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

const ExampleMarkdownAsJSXPage: NextPage<Props> = (props): JSX.Element => {
  const markdownTooltipExample = '<Tooltip text="This is a tooltip text written as text and interpreted as JSX component at runtime"><Button>Some text with a tooltip on click/hover</Button></Tooltip>';

  return (
    <DefaultLayout
      {...props}
      pageName={'md-as-jsx'}
      headProps={{
        title: 'Markdown as JSX examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Markdown as JSX components examples, using <code>markdown-to-jsx</code> library</h1>

        <Alert color={'info'}>
          This is an advanced feature that is completely optional.<br />
          <br />
          The ability to convert, at runtime, Markdown text into real JSX components is a game changer.<br />
          It's a very powerful feature, that should be used with care.<br />
          <br />
          It allows to embed rich-content (JSX) that can be configured on external systems, such as a CMS.<br />
          The below examples use Airtable as such CMS.<br />
          <br />
          Basically, from Airtable, we use some markdown within a "Long text" variable.<br />
          This variable is then fetched from NRN (using Airtable REST API).<br />
          Then, that's where the magic happens. We convert the text into JSX, using <code>markdown-to-jsx</code> library.<br />
          <br />
          It works based on an allowed list of JSX components. You configure yourself which HTML tag gets converted into what JSX component.
        </Alert>

        <Alert color={'warning'}>
          There are some limits at what this feature can/should do.<br />
          For instance, you can't specify <code>complex props</code> (i.e: JSX components, arrays, objects, anything that isn't scalar) of JSX components within Markdown, it's not allowed.<br />
          So, you can only use it with component that don't require input props.<br />
          <br />
          But, those components can have an internal state, and can also depend on shared states (Redux, MobX, etc.) even though we don't show such examples here.<br />
          <br />
          When using this feature, you should first ask yourself what components you want to make available from a third-party system (CMS).<br />
          You may also need to rewrite part of your existing components to take into account the above listed limitations.<br />
          <br />
          Also, the concept of "separation of concerns" is very important here, you need to take special care not doing "too much" from Markdown, because you don't want to debug JSX components initialised at runtime, believe me.<br />
          Also, you probably want to have good unit/component testing to avoid undetected runtime regressions.
        </Alert>

        <Alert color={'info'}>
          Personally, I intend to use this feature to allow my customers to configure part of the site layout.<br />
          Basically, I'd build a few pre-made components that are available, and configure which ones are actually being used by each customer.<br />
          It's a great way to provide great customisation per-customer, and can also be used to work around limitations or issues.<br />
          <br />
          Like any great power, use it with care, it's quite easy to make a mess of it that becomes unmaintainable, you don't want to do that.
        </Alert>

        <Container>
          <h2>Configuration of our <code>Markdown</code> component and allowed list of JSX components</h2>

          <div>
            Below is our <code>Markdown</code> component, which abstracts away the internals of <code>markdown-to-jsx</code> with proper defaults for our app.<br />
            <br />
            <Code
              text={`
                import * as Sentry from '@sentry/node';
                import { createLogger } from '@unly/utils-simple-logger';
                import deepmerge from 'deepmerge';
                import MarkdownToJSX, { MarkdownOptions } from 'markdown-to-jsx';
                import React from 'react';
                import { Alert, Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, UncontrolledDropdown as Dropdown } from 'reactstrap';
                import { Markdown as MarkdownType } from '../../types/Markdown';
                import I18nBtnChangeLocale from '../i18n/I18nBtnChangeLocale';
                import I18nLink from '../i18n/I18nLink';
                import Tooltip from './SimpleTooltip';

                const fileLabel = 'components/utils/Markdown';
                const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
                  label: fileLabel,
                });

                type Props = {
                  text: MarkdownType;
                  markdownOptions?: MarkdownOptions;
                }

                const defaultMarkdownOptions: MarkdownOptions = {
                  // Make some of our own components available
                  overrides: { // See https://github.com/probablyup/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation
                    // All links should open in a new tab, and ensure proper security by default
                    a: {
                      component: 'a',
                      props: {
                        rel: 'noopener', // Security, avoids external site opened through your site to have control over your site
                        target: '_blank',
                      },
                    },

                    // Reactstrap whitelisted components
                    Alert,
                    Button,
                    Col,
                    Dropdown,
                    DropdownItem,
                    DropdownMenu,
                    DropdownToggle,
                    Nav,
                    NavItem,
                    NavLink,
                    Row,

                    // Our own components
                    I18nLink,
                    I18nBtnChangeLocale,
                    Tooltip,
                  },
                };

                /**
                 * Display "text" property as Markdown, using the "markdown-to-jsx" library
                 *
                 * @param props
                 */
                const Markdown: React.FunctionComponent<Props> = (props): JSX.Element => {
                  const { text, markdownOptions: _markdownOptions } = props;
                  const markdownOptions = deepmerge(defaultMarkdownOptions, _markdownOptions || {});

                  // If providing a non-string input (like "null" or "undefined") then markdown-to-jsx will crash with "Cannot read property 'replace' of undefined" - See https://github.com/probablyup/markdown-to-jsx/issues/314
                  if(typeof text !== 'string'){
                    return null;
                  }

                  try {
                    return (
                      <MarkdownToJSX
                        options={markdownOptions}
                      >
                        {text}
                      </MarkdownToJSX>
                    );

                  } catch (e) {
                    // Markdown conversion might crash depending on the content, and we must absolutely avoid that
                    logger.error(e);
                    Sentry.withScope((scope): void => {
                      scope.setContext('props', props);
                      Sentry.captureException(e);
                    });

                    return (
                      <>
                        {text}
                      </>
                    );
                  }
                };

                export default Markdown;

              `}
            />
          </div>
          <br />

          <hr />

          <h2>Usage example with <code>Tooltip</code> component</h2>

          The <code>Tooltip</code> HTML tag is mapped to <code>SimpleTooltip</code>, which has been created especially for being used within Markdown, because our <code>Tooltip</code> JSX component requires complex props, and thus wasn't usable as Markdown.<br />
          <br />
          <Markdown
            text={markdownTooltipExample}
          />

          <br />
          <br />
          <Code
            text={`
              const markdownTooltipExample = '<Tooltip text="This is a tooltip text written as text and interpreted as JSX component at runtime"><Button>Some text with a tooltip on click/hover</Button></Tooltip>';

              <Markdown
                text={markdownTooltipExample}
              />
            `}
          />
          <br />

          <hr />

          <h2>Live example with the Terms page</h2>

          A more complete example, featuring more components and the ability for you to change the content through Stacker is available on the <I18nLink href={'/terms'}>Terms</I18nLink> page.<br />
          <br />
          You can use it to play around with HTML, Markdown and JSX components and see how it gets rendered.

        </Container>
      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleMarkdownAsJSXPage);
