import { Asset } from '@/modules/core/data/types/Asset';
import GraphCMSAsset from '@/modules/core/gql/components/GraphCMSAsset';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof GraphCMSAsset>;

const defaultLogoUrl = 'https://media.graphcms.com/EKw3Em7aRkqaYmowHWAN';

export default {
  title: 'Next Right Now/Asset/GraphCMSAsset',
  component: GraphCMSAsset,
  argTypes: {},
} as Meta;

export const DynamicGraphCMSLogo: Story<Props> = (props) => {
  return (
    <GraphCMSAsset
      {...props}
    />
  );
};
DynamicGraphCMSLogo.args = {
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
DynamicGraphCMSLogo.parameters = {
  jest: ['GraphCMSAsset.test.tsx'],
};
