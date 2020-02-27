import { DocumentInitialProps as NextDocumentInitialProps } from 'next/dist/next-server/lib/utils';

export interface DocumentInitialProps extends NextDocumentInitialProps {
  lang?: string;
}
