import filter from 'lodash.filter';
import React from 'react';

import { Product } from '../../types/data/Product';
import Products from './Products';

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

      <Products
        products={productsDraft}
      />
    </>
  );
};

export default AllProducts;
