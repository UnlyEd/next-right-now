import {
  NextComponentType,
  NextPageContext,
} from 'next';

export const getComponentName = (Component: NextComponentType<NextPageContext>): string | null => {
  try {
    const componentAsString = Component.toString();

    return componentAsString.split('(')[0].split(' ')[1];
  } catch (e) {
    return null;
  }
};

export default getComponentName;
