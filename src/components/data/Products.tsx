import { css } from '@emotion/core';
import map from 'lodash.map';
import React from 'react';
import { Container } from 'reactstrap';

import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Product } from '../../types/data/Product';
import ProductRow from './ProductRow';

type Props = {
  products: AirtableRecord<Product>[];
}

const Products: React.FunctionComponent<Props> = (props) => {
  const { products } = props;

  return (
    <Container
      css={css`
        .product-container {
          margin: 30px;
          border: 1px solid lightgray;
          padding: 10px;
          border-radius: 5px;

          .product-description {
             font-style: italic;
          }
        }
      `}
    >
      {
        map(products, (productAirtable: AirtableRecord<Product>, i: number) => {
          const product: Product = productAirtable.fields;

          return (
            <ProductRow
              key={i}
              product={product}
            />
          );
        })
      }
    </Container>
  );
};

export default Products;
