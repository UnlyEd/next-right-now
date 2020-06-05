import { CommonServerSideParams } from './CommonServerSideParams';
import { PreviewData } from './PreviewData';

/**
 * Static props given as inputs for getStaticProps
 */
export type StaticPropsInput = {
  params?: CommonServerSideParams;
  preview: boolean;
  previewData: PreviewData;
}
