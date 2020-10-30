import { css } from '@emotion/core';
import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';

import { Asset } from '../../types/data/Asset';
import { Product } from '../../types/data/Product';
import AirtableAsset from '../assets/AirtableAsset';
import Markdown from '../utils/Markdown';

type Props = {
  product: Product;
}

const ProductRow: React.FunctionComponent<Props> = (props) => {
  const { product } = props;
  const image: Asset = product?.images?.[0];

  return (
    <Row
      key={product?.id}
      className={'product-container'}
      css={css`
        background-color: white;
        border-radius: 5px;
        padding: 20px;
        display: flex;
        align-items: baseline;
      `}
    >
      <Col>
        <AirtableAsset
          key={image?.id}
          id={image?.id}
          asset={image}
          transformationsOverride={{
            height: 100,
          }}
        />
      </Col>
      <Col>
        {product?.title}
      </Col>
      <Col>
        <Markdown text={product?.description} />
      </Col>
      <Col>
        {product?.price || 0}€
      </Col>
    </Row>
  );
};

export default ProductRow;
