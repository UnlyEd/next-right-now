import { UniversalSSGPageProps } from './UniversalSSGPageProps';
import { UniversalSSRPageProps } from './UniversalSSRPageProps';

/**
 * Page props provided universally to the main app render function by the main app getInitialProps function
 *
 * The exact same properties are provided, whether during a server or client rendering
 *
 * @see _app:getInitialProps - Returns it (consumed by the "render" function)
 * @see _app:render - Use it (as its "pageProps" property)
 */
export declare type MultiversalPageProps = UniversalSSGPageProps | UniversalSSRPageProps;
