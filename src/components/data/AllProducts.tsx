import filter from 'lodash.filter';
import map from 'lodash.map';
import React from 'react';

import { Product } from '../../types/data/Product';
import Products from './Products';

type Props = {
  products: Product[];
}

const AllProducts: React.FunctionComponent<Props> = (props) => {
  const { products } = props;
  const productsPublished = [];
  map(products, (productInStage: { documentInStages: Product[] } & Product) => {
    const productsInStage: Product[] = productInStage?.documentInStages; // Contains an array of 1 element, when there is a PUBLISHED record (otherwise is empty)
    map(productsInStage, (product: Product) => {
      if(product?.stage === 'PUBLISHED'){
        productsPublished.push(product);
      }
    });
  });
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
