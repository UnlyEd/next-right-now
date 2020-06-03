import { Asset } from './Asset';

export declare type Product = {
  id?: string;
  title?: string; // i18n field auto computed
  titleEN?: string;
  titleFR?: string;
  description?: string; // i18n field auto computed
  descriptionEN?: string;
  descriptionFR?: string;
  images?: Asset[];
  price?: number;
};
