import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import AirtableAsset, { Props } from '../../../components/assets/AirtableAsset';
import { Asset } from '../../../types/data/Asset';

const defaultLogoUrl = 'https://dl.airtable.com/lA5gmGBQheUvmuX616wU_monochromelogo.png';

export default {
  title: 'Utilities/AirtableAsset',
  component: AirtableAsset,
  argTypes: {},
} as Meta;

export const DefaultAirtableLogo: React.VFC<Props> = () => {
  return (
    <AirtableAsset
      id={'default-logo'}
      asset={{
        url: defaultLogoUrl,
        linkUrl: defaultLogoUrl,
      } as Asset}
    />
  );
};
