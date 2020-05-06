/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import map from 'lodash.map';
import React from 'react';
import { Container } from 'reactstrap';

import { Asset } from '../types/data/Asset';
import { Product } from '../types/data/Product';
import GraphCMSAsset from './GraphCMSAsset';

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
        map(products, (product: Product) => {
          return (
            <div
              key={product?.id}
              className={'product-container'}
            >
              {
                map(product.images, (image: Asset) => {
                  return (
                    <GraphCMSAsset
                      key={image?.id}
                      id={image?.id}
                      asset={image}
                      transformationsOverride={{
                        width: 75,
                        height: 100,
                      }}
                    />
                  );
                })
              }

              <h2 className={'product-title'}>
                {product?.title} - ${product?.price || 0}
              </h2>

              <div className={'product-description'}>
                {product?.description}
              </div>
            </div>
          );
        })
      }
    </Container>
  );
};

export default Products;
