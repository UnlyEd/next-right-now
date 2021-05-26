import { SharedDataset } from '@/modules/core/gql/fetchGraphcmsDataset';
import { createLogger } from '@/modules/core/logging/logger';

const fileLabel = 'modules/core/airtable/getGraphcmsDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns the whole dataset, based on the app-wide static/shared/stale data fetched at build time.
 *
 * This dataset is STALE. It will not update, ever.
 * The dataset is created at build time, using the "next-plugin-preval" webpack plugin.
 *
 * @example const dataset: SharedDataset = await getSharedGraphcmsDataset();
 */
export const getSharedGraphcmsDataset = async (): Promise<SharedDataset> => {
  return (await import('@/modules/core/gql/fetchGraphcmsDataset.preval')) as unknown as SharedDataset;
};
