import ProductRow from '@/components/dataDisplay/ProductRow';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { getDemoLayoutServerSideProps } from '@/layouts/demo/demoLayoutSSR';
import QuickPreviewLayout from '@/layouts/quickPreview/components/QuickPreviewLayout';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/events';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { Product } from '@/modules/core/data/types/Product';
import { createLogger } from '@/modules/core/logging/logger';
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

const fileLabel = 'pages/[locale]/demo/quick-preview/preview-product';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
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
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getDemoLayoutServerSideProps();

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
 * https://nrn-v2-mst-aptd-at-lcz-sty-c1.now.sh/en/demo/quick-preview/preview-product?ref=kiunyu
 */
const PreviewProductPage: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();
  const airtableProducts: AirtableRecord<Product>[] = customer?.products;
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

  const product = find(airtableProducts, { ref: productRef }) as AirtableRecord<Product>;

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
      pageName={AMPLITUDE_PAGES.PREVIEW_PRODUCT_PAGE}
      headProps={{
        seoTitle: t('quickPreview.pageTitle', `Aperçu produit "{{ title }}" - Next Right Now`, { title: product?.title }),
      }}
    >
      <ProductRow product={product} />
    </QuickPreviewLayout>
  );
};

export default (PreviewProductPage);
