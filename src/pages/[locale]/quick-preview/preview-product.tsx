import { createLogger } from '@unly/utils-simple-logger';
import find from 'lodash.find';
import {
  GetServerSideProps,
  NextPage,
} from 'next';
import {
  NextRouter,
  useRouter,
} from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'reactstrap';
import ProductRow from '../../../components/data/ProductRow';
import QuickPreviewLayout from '../../../components/pageLayouts/QuickPreviewLayout';
import { AirtableRecord } from '../../../types/data/AirtableRecord';
import { Product } from '../../../types/data/Product';
import { OnlyBrowserPageProps } from '../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../../types/pageProps/SSRPageProps';
import { getExamplesCommonServerSideProps } from '../../../utils/nextjs/SSR';

const fileLabel = 'pages/[locale]/airtable-live-preview/preview-product';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {}

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * Fetches all products and customer in one single GQL query
 * We only need one
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getExamplesCommonServerSideProps;

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

/**
 * This page is meant to be used from a CMS. We use Stacker in this demo.
 * Creating a Stacker iframe with url equals to
 * https://nrn-v2-mst-aptd-at-lcz-sty-c1.now.sh/quick-preview/preview-product?ref=kiunyu
 */
const PreviewProductPage: NextPage<Props> = (props): JSX.Element => {
  const { customer: airtableCustomer } = props;
  const customer = airtableCustomer?.fields;
  const airtableProducts: AirtableRecord<Product>[] = customer?.products as AirtableRecord<Product>[];
  const router: NextRouter = useRouter();
  const { query } = router;
  const productRef = query?.ref;
  const { t } = useTranslation();

  if (!productRef) {
    return (
      <Alert color={'danger'}>
        {t('quickPreview.noProvidedRef', 'Vous devez fournir une <code>ref</code> pour prévisualiser un élément.')}
      </Alert>
    );
  }

  const airtableProduct: AirtableRecord<Product> = find(airtableProducts, { fields: { ref: productRef } });
  const product: Product = airtableProduct?.fields;

  if (!product) {
    return (
      <Alert color={'warning'}>
        {t('quickPreview.refNotFound', `L'élément "{{ productRef }}" n'existe pas.`, { productRef })}
      </Alert>
    );
  }

  return (
    <QuickPreviewLayout
      {...props}
      pageName={'preview-product'}
      headProps={{
        title: t('quickPreview.pageTitle', `Aperçu produit "{{ title }}" - Next Right Now`, { title: product?.title }),
      }}
    >
      <ProductRow product={product} />
    </QuickPreviewLayout>
  );
};

export default (PreviewProductPage);
