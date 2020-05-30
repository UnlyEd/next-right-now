import { StaticParams } from './StaticParams';
import { PreviewData } from './PreviewData';

/**
 * Static props given as inputs for getStaticProps
 */
export type StaticPropsInput = {
  params?: StaticParams;
  preview: boolean;
  previewData: PreviewData;
}
