import { StaticDataset } from '@/modules/core/gql/fetchGraphcmsDataset';
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
 * @example const dataset: StaticDataset = await getStaticGraphcmsDataset();
 */
export const getStaticGraphcmsDataset = async (): Promise<StaticDataset> => {
  return (await import('@/modules/core/gql/fetchGraphcmsDataset.preval')) as unknown as StaticDataset;
};
