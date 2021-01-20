import { RawAirtableRecord } from '@/modules/core/airtable/types/RawAirtableRecord';
import { RawAirtableDataset } from '@/modules/core/data/types/RawAirtableDataset';
import { RawCustomer } from '@/modules/core/data/types/RawCustomer';
import { RawTheme } from '@/modules/core/data/types/RawTheme';

export const CUSTOMER1: RawAirtableRecord<RawCustomer> = {
  id: 'reci9HYsoqd1xScsi',
  fields: {
    labelFR: 'Client 1',
    theme: [
      'recrcZANU6L73OA9v',
    ],
    ref: 'customer1',
  },
  createdTime: '2020-06-02T14:01:51.000Z',
};

export const CUSTOMER2: RawAirtableRecord<RawCustomer> = {
  id: 'recZEMyznL19CPD5b',
  fields: {
    labelEN: 'RawCustomer 2',
    theme: [
      'recgo2T34zNZjAlkN',
    ],
    ref: 'customer2',
  },
  createdTime: '2020-06-02T14:01:51.000Z',
};

export const THEME1: RawAirtableRecord<RawTheme> = {
  id: 'recgo2T34zNZjAlkN',
  fields: {
    id: '2',
    customer: [
      'recZEMyznL19CPD5b',
    ],
    primaryColor: 'blue',
  },
  createdTime: '2020-06-02T14:06:19.000Z',
};

export const THEME2: RawAirtableRecord<RawTheme> = {
  id: 'recrcZANU6L73OA9v',
  fields: {
    id: '1',
    customer: [
      'reci9HYsoqd1xScsi',
    ],
    primaryColor: 'red',
  },
  createdTime: '2020-06-02T14:06:19.000Z',
};

const mockedRawAirtableDataset: RawAirtableDataset = {
  [CUSTOMER1.id]: { ...CUSTOMER1, __typename: 'Customer' },
  [CUSTOMER2.id]: { ...CUSTOMER2, __typename: 'Customer' },
  [THEME1.id]: { ...THEME1, __typename: 'Theme' },
  [THEME2.id]: { ...THEME2, __typename: 'Theme' },
};

export default mockedRawAirtableDataset;
