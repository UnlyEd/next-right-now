/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import map from 'lodash.map';
import React from 'react';
import { Container } from 'reactstrap';
import { AirtableRecord } from '../../types/data/AirtableRecord';

import { Asset } from '../../types/data/Asset';
import { Product } from '../../types/data/Product';
import AirtableAsset from '../assets/AirtableAsset';

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
        map(products, (productAirtable: AirtableRecord<Product>) => {
          const product: Product = productAirtable.fields;

          return (
            <div
              key={product?.id}
              className={'product-container'}
            >
              {
                map(product.images, (image: Asset) => {
                  return (
                    <AirtableAsset
                      key={image?.id}
                      id={image?.id}
                      asset={image}
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
