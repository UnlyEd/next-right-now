import { stringify as stringifySafe } from 'flatted';
import { Flatted } from '../../types/Flatted';
import { GenericObject } from '../../types/GenericObject';

export const serializeSafe = <T>(value: GenericObject | any[]): Flatted<T> => {
  return stringifySafe(value);
};

export default serializeSafe;
