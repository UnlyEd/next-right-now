import { stringify as stringifySafe } from 'flatted';
import { Flatted } from '../serialize/Flatted';
import { GenericObject } from '../data/types/GenericObject';

export const serializeSafe = <T>(value: GenericObject | any[]): Flatted<T> => {
  return stringifySafe(value);
};

export default serializeSafe;
