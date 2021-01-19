import React from 'react';
import { SanitizedAirtableDataset } from '../types/SanitizedAirtableDataset';

export type DatasetContext = SanitizedAirtableDataset;

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import datasetContext from './src/stores/datasetContext';
 *  const dataset: DatasetContext = React.useContext(datasetContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const datasetContext = React.createContext<DatasetContext>(null);

export default datasetContext;
