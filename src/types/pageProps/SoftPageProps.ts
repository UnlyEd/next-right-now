import { MultiversalPageProps } from './MultiversalPageProps';
import { OnlyBrowserPageProps } from './OnlyBrowserPageProps';
import { OnlyServerPageProps } from './OnlyServerPageProps';

/**
 * Generic helper meant to be used in pages, when you don't want to use a strict typing
 * Extends all common properties whether they're multiversal or specific to either browser or server
 *
 * Avoid pointless TS warnings when manipulating server-only or browser-only props
 * Meant to help developers to avoid struggling with TS types
 *
 * Alternatively, you can use "MultiversalPageProps<OnlyBrowserPageProps | OnlyServerPageProps>" which will ensure stricter types checks
 *
 * XXX When using this type, you must make sure you're using the right runtime engine (browser/server)
 *  For instance, it'll allow to use browser-only props like "isInIframe" without complaining, but you should provide a proper default if not set
 */
export type SoftPageProps<E extends {} = {}> =
  MultiversalPageProps &
  Partial<OnlyBrowserPageProps> &
  Partial<OnlyServerPageProps>;
