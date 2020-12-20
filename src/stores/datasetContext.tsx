import React from 'react';
import { GraphCMSDataset } from '../utils/graphCMSDataset/GraphCMSDataset';

export type DatasetContext = GraphCMSDataset;

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
