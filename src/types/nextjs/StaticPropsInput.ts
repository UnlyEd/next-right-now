import { CommonServerSideParams } from './CommonServerSideParams';
import { PreviewData } from './PreviewData';

/**
 * Static props given as inputs for getStaticProps
 */
export type StaticPropsInput<E extends {} = {}> = {
  params?: CommonServerSideParams<E>;
  preview: boolean;
  previewData: PreviewData;
}
