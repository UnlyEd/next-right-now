/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Product } from '../../types/data/Product';
import Text from '../utils/Text';
import Products from './Products';
import filter from 'lodash.filter';

type Props = {
  products: Product[];
}

const AllProducts: React.FunctionComponent<Props> = (props) => {
  const { products } = props;
  const productsPublished = filter(products, { status: 'PUBLISHED' });
  const productsDraft = filter(products, { status: 'DRAFT' });

  return (
    <>
      <h2>Published products</h2>

      <Products
        products={productsPublished}
      />

      <hr />

      <h2>Draft products</h2>

      <Text>
        {`
          Those products are being created/updated by the NRN community, anybody can manipulate those through <a href="https://nrn-admin.now.sh/#/Product/create" target="_blank">the Admin site</a>.

          Don't hesitate to give it a try, you'll see the list of products below will update because content is fetched for every page request.
        `}
      </Text>

      <Products
        products={productsDraft}
      />
    </>
  );
};

export default AllProducts;
