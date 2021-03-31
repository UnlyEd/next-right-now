import { GenericObject } from '@/modules/core/data/types/GenericObject';

export type RichText = {
  html?: string;
  markdown?: string;
  raw?: GenericObject;
  text?: string;
}
