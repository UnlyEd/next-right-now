import { CommonServerSideParams } from './CommonServerSideParams';
import { PreviewData } from '@/modules/previewMode/types/PreviewData';

/**
 * Static props given as inputs for getStaticProps
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * @see node_modules/next/types/index.d.ts
 */
export type StaticPropsInput<E extends {} = {}> = {
  params?: CommonServerSideParams<E>;
  preview: boolean;
  previewData: PreviewData;
}
