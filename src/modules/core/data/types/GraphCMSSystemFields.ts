/**
 * Contains GraphCMS record common fields, known as "System fields".
 *
 * Those fields are available on any GraphCMS entity.
 * Fields are all marked as optional, because we don't necessarily fetch them when running GraphQL queries.
 */
export type GraphCMSSystemFields = {
  // id: string; // XXX Should specified in sub-types if required - See https://github.com/microsoft/TypeScript/issues/36286
  createdAt?: string;
  stage?: 'DRAFT' | 'PUBLISHED';
  __typename?: string;
}
