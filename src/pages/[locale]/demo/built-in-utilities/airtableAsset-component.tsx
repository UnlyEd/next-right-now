import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import DemoPage from '@/layouts/demo/components/DemoPage';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import AirtableAsset from '@/modules/core/airtable/components/AirtableAsset';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Asset } from '@/modules/core/data/types/Asset';
import { Customer } from '@/modules/core/data/types/Customer';
import { Product } from '@/modules/core/data/types/Product';
import { createLogger } from '@unly/utils-simple-logger';
import map from 'lodash.map';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/airtable-component';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDemoStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDemoStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleAirtableAssetComponentPage: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();
  const airtableProducts: AirtableRecord<Product>[] = customer?.products;

  return (
    <DemoLayout
      {...props}
      pageName={'airtable-component'}
      headProps={{
        seoTitle: 'I18nLink component examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>AirtableAsset component examples</h1>

        <Alert color={'info'}>
          <code>{`<AirtableAsset />`}</code> component meant to display assets from Airtable.<br />
          It mostly helps display responsive images that keep a proper aspect ratio.<br />
          <br />
          Learn more about
          <ExternalLink href={'https://support.airtable.com/hc/en-us/articles/360007852173'} suffix={null}>Airtable Attachment field</ExternalLink>.
        </Alert>

        <Alert color={'warning'}>
          Implementation has been kept simple on purpose, to avoid making it too complicated.<br />
          <br />
          Eventually, it could become a standalone component with its own NPM repository.<br />
          <br />
          <ExternalLink href={'https://github.com/vercel/next.js/issues/13905'} suffix={null}>Dealing with images is complicated</ExternalLink>.
          This helper is not meant to cover complex use-cases.
        </Alert>

        <h2>Using native size</h2>

        <Alert color={'info'}>
          This will display the image using it's native size without any kind of control regarding the width/height.
        </Alert>

        {
          map(airtableProducts, (airtableProduct) => {
            const product: Product = airtableProduct;
            const image: Asset = product.images?.[0];

            return (
              <div key={image?.id}>
                <AirtableAsset
                  id={product?.ref}
                  asset={image}
                />
              </div>
            );
          })
        }

        <br />
        <br />

        <Code
          text={`
            {
              map(airtableProducts, (airtableProduct) => {
                const product: Product = airtableProduct.fields;
                const image: Asset = product.images?.[0];

                return (
                  <div key={image?.id}>
                    <AirtableAsset
                      id={product?.ref}
                      asset={image}
                    />
                  </div>
                );
              })
            }

            // Generated example
            <img
              id="vista-al-valle-zapote-honey"
              src="https://dl.airtable.com/OeNybctMTBKLPkbntK8p_jftonpzlxgakoxo9plfq.jpg"
              title="jftonpzlxgakoxo9plfq.jpg"
              alt="jftonpzlxgakoxo9plfq.jpg"
              class="asset-vista-al-valle-zapote-honey"
            />
          `}
        />

        <hr />

        <h2>Override width while keeping image ratio</h2>

        <Alert color={'info'}>
          This will automatically resize the image by applying a specific width but keep the same ratio (height will be auto)
        </Alert>

        {
          map(airtableProducts, (airtableProduct) => {
            const product: Product = airtableProduct;
            const image: Asset = product.images?.[0];

            return (
              <div key={image?.id}>
                <AirtableAsset
                  asset={image}
                  transformationsOverride={{
                    width: 100,
                  }}
                />
              </div>
            );
          })
        }

        <br />
        <br />

        <Code
          text={`
            {
              map(airtableProducts, (airtableProduct) => {
                const product: Product = airtableProduct;
                const image: Asset = product.images?.[0];

                return (
                  <AirtableAsset
                    asset={image}
                    transformationsOverride={{
                      width: 100
                    }}
                  />
                );
              })
            }

            // Generated example
            <img
              id="asset-attlk6ONaDfaZbQTw"
              src="https://dl.airtable.com/OeNybctMTBKLPkbntK8p_jftonpzlxgakoxo9plfq.jpg"
              title="jftonpzlxgakoxo9plfq.jpg"
              alt="jftonpzlxgakoxo9plfq.jpg"
              class="asset-attlk6ONaDfaZbQTw"
              style="width: 100px;"
            />
          `}
        />

        <hr />

        <h2>Override height while keeping image ratio</h2>

        <Alert color={'info'}>
          This will automatically resize the image by applying a specific height but keep the same ratio (width will be auto)
        </Alert>

        {
          map(airtableProducts, (airtableProduct) => {
            const product: Product = airtableProduct;
            const image: Asset = product.images?.[0];

            return (
              <div key={image?.id}>
                <AirtableAsset
                  asset={{
                    ...image,
                    ...image?.thumbnails?.large,
                  }}
                  transformationsOverride={{
                    height: 75,
                  }}
                />
              </div>
            );
          })
        }

        <br />
        <br />

        <Code
          text={`
            {
              map(airtableProducts, (airtableProduct) => {
                const product: Product = airtableProduct;
                const image: Asset = product.images?.[0];

                return (
                  <div key={image?.id}>
                    <AirtableAsset
                      asset={{
                        ...image,
                        ...image?.thumbnails?.large,
                      }}
                      transformationsOverride={{
                        height: 75
                      }}
                    />
                  </div>
                );
              })
            }
          `}
        />

        <hr />

        <h2>Using Airtable thumbnail (small)</h2>

        <Alert color={'info'}>
          This will display the image using Airtable's native <code>small</code> thumbnail.<br />
          Thumbnails are created with similar sizes whenever possible (as long as it doesn't change the asset's ratio).
        </Alert>

        {
          map(airtableProducts, (airtableProduct) => {
            const product: Product = airtableProduct;
            const image: Asset = product.images?.[0];

            return (
              <div key={image?.id}>
                <AirtableAsset
                  asset={{
                    ...image,
                    ...image?.thumbnails?.small,
                  }}
                />
              </div>
            );
          })
        }

        <br />
        <br />

        <Code
          text={`
            {
              map(airtableProducts, (airtableProduct) => {
                const product: Product = airtableProduct;
                const image: Asset = product.images?.[0];

                return (
                  <div key={image?.id}>
                    <AirtableAsset
                      asset={{
                        ...image,
                        ...image?.thumbnails?.small,
                      }}
                    />
                  </div>
                );
              })
            }
          `}
        />

        <hr />

        <h2>Using Airtable thumbnail (large)</h2>

        <Alert color={'info'}>
          This will display the image using Airtable's native <code>large</code> thumbnail.<br />
          Thumbnails are created with similar sizes whenever possible (as long as it doesn't change the asset's ratio).
        </Alert>

        {
          map(airtableProducts, (airtableProduct) => {
            const product: Product = airtableProduct;
            const image: Asset = product.images?.[0];

            return (
              <div key={image?.id}>
                <AirtableAsset
                  asset={{
                    ...image,
                    ...image?.thumbnails?.large,
                  }}
                />
              </div>
            );
          })
        }

        <br />
        <br />

        <Code
          text={`
            {
              map(airtableProducts, (airtableProduct) => {
                const product: Product = airtableProduct;
                const image: Asset = product.images?.[0];

                return (
                  <AirtableAsset
                    asset={{
                      ...image,
                      ...image?.thumbnails?.large,
                    }}
                  />
                );
              })
            }
          `}
        />

      </DemoPage>
    </DemoLayout>
  );
};

export default (ExampleAirtableAssetComponentPage);
