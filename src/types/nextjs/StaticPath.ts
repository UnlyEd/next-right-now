import { CommonServerSideParams } from './CommonServerSideParams';

export type StaticPath<E extends {} = {}> = {
  params: CommonServerSideParams<E>;
}
