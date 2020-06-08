/**
 * Headers that are shared to the client by the server (and therefore made public)
 */
export type PublicHeaders = {
  'accept-language'?: string;
  'user-agent'?: string;
  host?: string;
}
