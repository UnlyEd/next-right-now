import { StaticParams } from './StaticParams';

/**
 * Static props given as inputs for getStaticProps
 */
export type StaticPropsInput = {
  params?: StaticParams;
  preview?: boolean;
  previewData?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
