import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import GraphCMSAsset, { Props } from '../../../components/assets/GraphCMSAsset';
import { Asset } from '../../../types/data/Asset';

const defaultLogoUrl = 'https://dl.airtable.com/lA5gmGBQheUvmuX616wU_monochromelogo.png';

export default {
  title: 'Next Right Now/Asset/GraphCMSAsset',
  component: GraphCMSAsset,
  argTypes: {},
} as Meta;

export const DynamicAirtableLogo: Story<Props> = (props) => {
  return (
    <GraphCMSAsset
      {...props}
    />
  );
};
DynamicAirtableLogo.args = {
  id: 'default-logo',
  className: 'default-class',
  asset: {
    url: defaultLogoUrl,
    linkUrl: 'https://github.com/UnlyEd/next-right-now',
  } as Asset,
  transformationsOverride: {
    width: 300,
    height: 100,
  },
  style: {
    backgroundColor: 'white',
  },
  onClick: () => console.log('click on asset'),
};
