import { Product } from '@/modules/core/data/types/Product';
import { css } from '@emotion/react';
import map from 'lodash.map';
import React from 'react';
import { Container } from 'reactstrap';
import ProductRow from './ProductRow';

type Props = {
  products: Product[];
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
        map(products, (product: Product, i: number) => {
          return (
            <ProductRow
              key={product.id}
              product={product}
            />
          );
        })
      }
    </Container>
  );
};

export default Products;
