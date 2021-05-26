import fetchRawAirtableDataset from '@/modules/core/airtable/fetchRawAirtableDataset';
import preval from 'next-plugin-preval';

export const dataset = preval(fetchRawAirtableDataset());

export default dataset;
