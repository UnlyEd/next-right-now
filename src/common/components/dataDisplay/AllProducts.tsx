import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Product } from '@/modules/core/data/types/Product';
import filter from 'lodash.filter';
import React from 'react';
import Products from './Products';

type Props = {
  products: AirtableRecord<Product>[];
}

const AllProducts: React.FunctionComponent<Props> = (props) => {
  const { products } = props;
  const productsPublished: AirtableRecord<Product>[] = filter(products, { status: 'PUBLISHED' });
  const productsDraft: AirtableRecord<Product>[] = filter(products, { status: 'DRAFT' });

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
