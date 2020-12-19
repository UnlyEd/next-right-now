import { css } from '@emotion/core';
import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import Btn from './Btn';

type Props = {}

const Buttons: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <Fragment>
      <Row
        css={css`
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn>
          Default
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn transparent={true}>
          Default transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'}>
          Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'} transparent={true}>
          Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'}>
          Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'} transparent={true}>
          Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-variant'}>
          Variant
        </Btn>
      </Row>

      <Row
        css={css`
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'}>
          Secondary
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'} transparent={true}>
          Secondary transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'}>
          Secondary Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'} transparent={true}>
          Secondary Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'}>
          Secondary Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'} transparent={true}>
          Secondary Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-variant'}>
          Secondary Variant
        </Btn>
      </Row>
      <br />
      <br />
      <br />
      <Row
        css={css`
          background-color: blue;
          padding: 20px;
       `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn>
          Default
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn transparent={true}>
          Default transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'}>
          Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'} transparent={true}>
          Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'}>
          Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'} transparent={true}>
          Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-variant'}>
          Variant
        </Btn>
      </Row>
      <Row
        css={css`
          background-color: blue;
          padding: 20px;
       `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'}>
          Secondary
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'} transparent={true}>
          Secondary transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'}>
          Secondary Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'} transparent={true}>
          Secondary Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'}>
          Secondary Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'} transparent={true}>
          Secondary Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-variant'}>
          Secondary Variant
        </Btn>
      </Row>
      <br />
      <br />
      <br />
      <Row
        css={css`
          background-color: white;
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn>
          Default
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn transparent={true}>
          Default transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'}>
          Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'} transparent={true}>
          Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'}>
          Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'} transparent={true}>
          Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-variant'}>
          Variant
        </Btn>
      </Row>
      <Row
        css={css`
          background-color: white;
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'}>
          Secondary
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'} transparent={true}>
          Secondary transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'}>
          Secondary Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'} transparent={true}>
          Secondary Reverse transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'}>
          Secondary Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'} transparent={true}>
          Secondary Outline transparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-variant'}>
          Secondary Variant
        </Btn>
      </Row>
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default Buttons;
