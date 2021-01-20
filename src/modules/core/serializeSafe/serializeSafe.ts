import { stringify as stringifySafe } from 'flatted';
import { GenericObject } from '../data/types/GenericObject';
import { Flatted } from './types/Flatted';

export const serializeSafe = <T>(value: GenericObject | any[]): Flatted<T> => {
  return stringifySafe(value);
};

export default serializeSafe;
