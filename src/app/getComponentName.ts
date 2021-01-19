import {
  NextComponentType,
  NextPageContext,
} from 'next';

/**
 * Resolves the name of a Next.js "pageProps.Component".
 * A "Component" is a "Page".
 *
 * Extract the name from the component function source code.
 *
 * @param Component
 */
export const getComponentName = (Component: NextComponentType<NextPageContext>): string | null => {
  try {
    const componentAsString = Component.toString();

    return componentAsString.split('(')[0].split(' ')[1];
  } catch (e) {
    return null;
  }
};

export default getComponentName;
