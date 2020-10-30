import filter from 'lodash.filter';
import React from 'react';

import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Product } from '../../types/data/Product';
import Products from './Products';

type Props = {
  products: AirtableRecord<Product>[];
}

const AllProducts: React.FunctionComponent<Props> = (props) => {
  const { products } = props;
  const productsPublished: AirtableRecord<Product>[] = filter(products, { fields: { status: 'PUBLISHED' } });
  const productsDraft: AirtableRecord<Product>[] = filter(products, { fields: { status: 'DRAFT' } });

  return (
    <>
      <h2>Published products</h2>

      <Products
        products={productsPublished}
      />

      <hr />

      <h2>Draft products</h2>

      <Products
        products={productsDraft}
      />
    </>
  );
};

export default AllProducts;
