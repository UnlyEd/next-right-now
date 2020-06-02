import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { NextPageContext } from 'next';
import { WithApolloState } from 'next-with-apollo/lib/types';
import App from 'next/app';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import createApolloClient from '../utils/gql/graphql';

// XXX Inspired by https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apollo.js
// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<NormalizedCacheObject> = null;

type initOnContextProps = {
  ctx: NextPageContext;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  apolloState?: WithApolloState<NormalizedCacheObject>;
};

/**
 * Options of the withApollo HOC
 */
type withApolloOptions = {
  useGetInitialProps?: boolean; // If set to true, will inject "getInitialProps" into the page and will use SSR mode
}

/**
 * Injected by HOC "withApollo" into the page
 */
type PageProps = {
  apolloState?: WithApolloState<NormalizedCacheObject>;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  isReadyToRender: boolean;
};

/**
 * Installs the Apollo Client on NextPageContext or NextAppContext.
 * Useful if you want to use apolloClient inside getStaticProps, getStaticPaths or getServerSideProps
 *
 * @param {NextPageContext | NextAppContext} ctx
 */
export const initOnContext = (ctx: initOnContextProps) => {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ useGetInitialProps: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
        'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n',
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx as unknown as NextPageContext);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  // @ts-ignore XXX Ignored because it crashed when upgrading TypeScript from 3.8.3 to 3.9.2 (TODO is this method undefined and it wasn't detected before?)
  apolloClient.toJSON = (): void => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    // @ts-ignore
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (initialState, ctx: NextPageContext): ApolloClient<NormalizedCacheObject> => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx);
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC that provides the apolloContext to a next.js Page or AppTree.
 *
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.useGetInitialProps=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo = ({ useGetInitialProps = false }: withApolloOptions = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: PageProps): ReactNode => {
    let client: ApolloClient<NormalizedCacheObject>;
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined);
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  // If we specifically want to use getInitialProps, or if the component already uses it
  if (useGetInitialProps || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx): Promise<PageProps> | null => {
      const inAppContext = Boolean(ctx.ctx);
      const { apolloClient } = initOnContext(ctx);

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        const { AppTree } = ctx;
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return {
            ...pageProps,
            isReadyToRender: true,
          };
        }

        // Only if dataFromTree is enabled
        if (useGetInitialProps && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import('@apollo/react-ssr');

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            let props;
            if (inAppContext) {
              props = { ...pageProps, apolloClient };
            } else {
              props = { pageProps: { ...pageProps, apolloClient } };
            }

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient,
        isReadyToRender: true,
      };
    };
  }

  return WithApollo;
};

export default withApollo;
