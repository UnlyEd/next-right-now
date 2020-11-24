import filter from 'lodash.filter';
import React from 'react';

import { Product } from '../../types/data/Product';
import Products from './Products';

type Props = {
  products: Product[];
}

const AllProducts: React.FunctionComponent<Props> = (props) => {
  const { products } = props;
  const productsPublished = filter(products, { stage: 'PUBLISHED' });
  const productsDraft = filter(products, { stage: 'DRAFT' });

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
