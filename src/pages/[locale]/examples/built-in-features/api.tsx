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
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/api';
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

const ExampleApiPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'api'}
      headProps={{
        title: 'API examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>API examples, using Airtable vendor</h1>

        <Alert color={'info'}>
          We wrote a helper <code>fetchCustomer</code> that handles a lot of things.<br />
          It basically reconciliates all data that belongs to a customer and resolved nested deps. <br />
          It also handles i18n fields and resolves the best value to use based on the wanted locale and available translations.<br />
        </Alert>

        <Code
          text={`
            // Fetches all Airtable tables and returns a consolidated Customer object with all relations resolved
            // Relations are only resolved on the two first levels (to avoid circular dependencies)
            const customer: AirtableRecord<Customer> = await fetchCustomer(bestCountryCodes);

            // "customer" print:
            {
              "id": "reci9HYsoqd1xScsi",
              "fields": {
                "id": "reci9HYsoqd1xScsi",
                "termsEN": "# Those are the terms for {customerLabel}.\\n\\nBut ... Who wanna get bothered with **terms**?\\nNot me\\nMe neither it's boring\\n\\n- List element\\n- List element\\n- List element\\n",
                "terms": "# Voici les conditions générales d'utilisation pour {customerLabel}.\\n\\nMais... Qui a envie de lire des **CGU** ?\\n\\n- List element\\n- List element\\n- List element\\n",
                "termsFR": "# Voici les conditions générales d'utilisation pour {customerLabel}.\\n\\nMais... Qui a envie de lire des **CGU** ?\\n\\n- List element\\n- List element\\n- List element\\n",
                "labelFR": "Client 1",
                "label": "Client 1",
                "users": [
                  "rec5Ren090l6vGJDf"
                ],
                "previewBaseUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app",
                "products": [
                  {
                    "id": "reck5THYBOd0ryd5Z",
                    "fields": {
                      "id": 1,
                      "titleEN": "Vista Al Valle Zapote Honey",
                      "title": "Vista Al Valle Zapote Honey",
                      "descriptionEN": "Plummy taste and syrupy texture\\n",
                      "description": "Café au sirop\\n",
                      "customer": {
                        "id": "reci9HYsoqd1xScsi",
                        "fields": {
                          "termsEN": "# Those are the terms for {customerLabel}.\\n\\nBut ... Who wanna get bothered with **terms**?\\nNot me\\nMe neither it's boring\\n\\n- List element\\n- List element\\n- List element\\n",
                          "termsFR": "# Voici les conditions générales d'utilisation pour {customerLabel}.\\n\\nMais... Qui a envie de lire des **CGU** ?\\n\\n- List element\\n- List element\\n- List element\\n",
                          "labelFR": "Client 1",
                          "users": [
                            "rec5Ren090l6vGJDf"
                          ],
                          "previewBaseUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app",
                          "products": [
                            "reck5THYBOd0ryd5Z",
                            "recFSrY2znI6Z8Dbj"
                          ],
                          "theme": [
                            "recrcZANU6L73OA9v"
                          ],
                          "ref": "customer1",
                          "previewTermsUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/terms?fullPagePreview=1&updatedAt=2020-06-14T11:38:58.000Z"
                        },
                        "createdTime": "2020-06-02T14:01:51.000Z",
                        "__typename": "Customer"
                      },
                      "price": 10,
                      "images": [
                        {
                          "id": "attlk6ONaDfaZbQTw",
                          "url": "https://dl.airtable.com/OeNybctMTBKLPkbntK8p_jftonpzlxgakoxo9plfq.jpg",
                          "filename": "jftonpzlxgakoxo9plfq.jpg",
                          "size": 34481,
                          "type": "image/jpeg",
                          "thumbnails": {
                            "small": {
                              "url": "https://dl.airtable.com/qVbclResT9magEgEnERA_jftonpzlxgakoxo9plfq.jpg",
                              "width": 56,
                              "height": 36
                            },
                            "large": {
                              "url": "https://dl.airtable.com/p8e2P2cTKq817hQdo0yw_jftonpzlxgakoxo9plfq.jpg",
                              "width": 256,
                              "height": 163
                            }
                          },
                          "__typename": "Asset"
                        }
                      ],
                      "descriptionFR": "Café au sirop\\n",
                      "status": "PUBLISHED",
                      "imagesTitle": "Vista Al Valle Zapote Honey",
                      "ref": "vista-al-valle-zapote-honey",
                      "previewUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/quick-preview/preview-product?ref=vista-al-valle-zapote-honey&updatedAt=2020-06-11T14:15:08.000Z"
                    },
                    "createdTime": "2020-06-02T14:04:46.000Z",
                    "__typename": "Product"
                  },
                  {
                    "id": "recFSrY2znI6Z8Dbj",
                    "fields": {
                      "id": 2,
                      "titleEN": "Big City",
                      "title": "Big City",
                      "descriptionEN": "Some awesome **description 2**\\n\\nYou can even [use links][1]\\n\\n  [1]: https://bluebottlecoffee.com/releases/costa-rica-vista-al-valle-honey\\n",
                      "description": "Super longue **description**\\n\\nVous pouvez même [utiliser des liens][1]\\n\\n  [1]: https://bluebottlecoffee.com/releases/costa-rica-vista-al-valle-honey\\n",
                      "customer": {
                        "id": "reci9HYsoqd1xScsi",
                        "fields": {
                          "termsEN": "# Those are the terms for {customerLabel}.\\n\\nBut ... Who wanna get bothered with **terms**?\\nNot me\\nMe neither it's boring\\n\\n- List element\\n- List element\\n- List element\\n",
                          "termsFR": "# Voici les conditions générales d'utilisation pour {customerLabel}.\\n\\nMais... Qui a envie de lire des **CGU** ?\\n\\n- List element\\n- List element\\n- List element\\n",
                          "labelFR": "Client 1",
                          "users": [
                            "rec5Ren090l6vGJDf"
                          ],
                          "previewBaseUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app",
                          "products": [
                            "reck5THYBOd0ryd5Z",
                            "recFSrY2znI6Z8Dbj"
                          ],
                          "theme": [
                            "recrcZANU6L73OA9v"
                          ],
                          "ref": "customer1",
                          "previewTermsUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/terms?fullPagePreview=1&updatedAt=2020-06-14T11:38:58.000Z"
                        },
                        "createdTime": "2020-06-02T14:01:51.000Z",
                        "__typename": "Customer"
                      },
                      "price": 23,
                      "images": [
                        {
                          "id": "att6JU52f5PlMuiRu",
                          "url": "https://dl.airtable.com/Uvg7ldEEQpqKhR3NKTGt_348s.jpg",
                          "filename": "348s.jpg",
                          "size": 17866,
                          "type": "image/jpeg",
                          "thumbnails": {
                            "small": {
                              "url": "https://dl.airtable.com/8C4cVNCES89lt6PnFH5W_348s.jpg",
                              "width": 36,
                              "height": 36
                            },
                            "large": {
                              "url": "https://dl.airtable.com/TdSPVnVQISc0P0EdiiQw_348s.jpg",
                              "width": 256,
                              "height": 256
                            }
                          },
                          "__typename": "Asset"
                        }
                      ],
                      "descriptionFR": "Super longue **description**\\n\\nVous pouvez même [utiliser des liens][1]\\n\\n  [1]: https://bluebottlecoffee.com/releases/costa-rica-vista-al-valle-honey\\n",
                      "status": "PUBLISHED",
                      "imagesTitle": "Big City",
                      "ref": "big-city",
                      "previewUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/quick-preview/preview-product?ref=big-city&updatedAt=2020-06-14T11:42:38.000Z"
                    },
                    "createdTime": "2020-06-02T14:04:46.000Z",
                    "__typename": "Product"
                  }
                ],
                "theme": {
                  "id": "recrcZANU6L73OA9v",
                  "fields": {
                    "id": 1,
                    "customer": {
                      "id": "reci9HYsoqd1xScsi",
                      "fields": {
                        "termsEN": "# Those are the terms for {customerLabel}.\\n\\nBut ... Who wanna get bothered with **terms**?\\nNot me\\nMe neither it's boring\\n\\n- List element\\n- List element\\n- List element\\n",
                        "termsFR": "# Voici les conditions générales d'utilisation pour {customerLabel}.\\n\\nMais... Qui a envie de lire des **CGU** ?\\n\\n- List element\\n- List element\\n- List element\\n",
                        "labelFR": "Client 1",
                        "users": [
                          "rec5Ren090l6vGJDf"
                        ],
                        "previewBaseUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app",
                        "products": [
                          "reck5THYBOd0ryd5Z",
                          "recFSrY2znI6Z8Dbj"
                        ],
                        "theme": [
                          "recrcZANU6L73OA9v"
                        ],
                        "ref": "customer1",
                        "previewTermsUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/terms?fullPagePreview=1&updatedAt=2020-06-14T11:38:58.000Z"
                      },
                      "createdTime": "2020-06-02T14:01:51.000Z",
                      "__typename": "Customer"
                    },
                    "primaryColor": "red",
                    "logo": {
                      "id": "attPS7KMD2GYafnlr",
                      "url": "https://dl.airtable.com/Qj697gmbRLff6kiHcF71_mark.png",
                      "filename": "mark.png",
                      "size": 4904,
                      "type": "image/png",
                      "thumbnails": {
                        "small": {
                          "url": "https://dl.airtable.com/v51rtFINSuuxo3MwXvsG_small_mark.png",
                          "width": 36,
                          "height": 36
                        },
                        "large": {
                          "url": "https://dl.airtable.com/oqRnvriRey2urg6KJYlA_large_mark.png",
                          "width": 191,
                          "height": 193
                        },
                        "full": {
                          "url": "https://dl.airtable.com/AfwEuXK5TZu7dCIZq3qf_full_mark.png",
                          "width": 191,
                          "height": 193
                        }
                      },
                      "__typename": "Asset"
                    },
                    "logoTitle": "Awesome-looking logo",
                    "previewUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app?fullPagePreview=1&updatedAt=2020-06-14T11:07:45.000Z"
                  },
                  "createdTime": "2020-06-02T14:06:19.000Z",
                  "__typename": "Theme"
                },
                "ref": "customer1",
                "previewTermsUrl": "https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/terms?fullPagePreview=1&updatedAt=2020-06-14T11:38:58.000Z"
              },
              "createdTime": "2020-06-02T14:01:51.000Z",
              "__typename": "Customer"
            }
          `}
        />

        <br />

        <p>
          The above code is what we actually use in <code>getCommonStaticProps</code>, to fetch data that are shared by all SSG pages.
        </p>

        <hr />

        <Alert color={'info'}>
          We use a cache using disk storage during build time (for SSG pages), so that each page doesn't have to fetch the Airtable API.<br />
          This is very important when generating static pages, otherwise we end up making hundreds of API calls (3 calls per page, because we fetch 3 tables). <br />
          Storing cache in memory doesn't work, because each page generation is executed in different processes (or so) and don't share the same memory (RAM).<br />
          Creating files like this requires a writable disk,
          <ExternalLink
            href={'https://github.com/vercel/next.js/discussions/13765#discussioncomment-22703'}
            suffix={null}
          >which is the case with Vercel</ExternalLink>.
        </Alert>

        <Code
          text={`
            const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;
            const { records: airtableCustomers } = await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'), {
              enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development',
              storage: { type: 'disk', options: { filename: 'CustomerTable' } },
            });
          `}
        />

        <br />

        <p>
          The above code is part of what we actually use in <code>fetchCustomer</code>, to fetch data from all tables.
        </p>

      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleApiPage);
