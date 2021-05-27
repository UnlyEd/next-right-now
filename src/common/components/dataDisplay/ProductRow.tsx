import { Asset } from '@/modules/core/data/types/Asset';
import { Product } from '@/modules/core/data/types/Product';
import GraphCMSAsset from '@/modules/core/gql/components/GraphCMSAsset';
import { css } from '@emotion/react';
import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import Markdown from './Markdown';

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
        <code>{product?.id}</code>
      </Col>
      <Col>
        <GraphCMSAsset
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
