import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import AirtableAsset, { Props } from '@/modules/core/airtable/components/AirtableAsset';
import { Asset } from '@/modules/core/data/types/Asset';

const defaultLogoUrl = 'https://dl.airtable.com/lA5gmGBQheUvmuX616wU_monochromelogo.png';

export default {
  title: 'Next Right Now/Asset/AirtableAsset',
  component: AirtableAsset,
  argTypes: {},
} as Meta;

export const DynamicAirtableLogo: Story<Props> = (props) => {
  return (
    <AirtableAsset
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
DynamicAirtableLogo.parameters = {
  jest: ['AirtableAsset.test.tsx'],
};
