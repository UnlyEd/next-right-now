import { Asset } from './Asset';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export type Theme = {
  primaryColor?: string;
  primaryColorVariant1?: string;
  onPrimaryColor?: string;
  secondaryColor?: string;
  secondaryColorVariant1?: string;
  onSecondaryColor?: string;
  backgroundColor?: string;
  onBackgroundColor?: string;
  surfaceColor?: string;
  onSurfaceColor?: string;
  errorColor?: string;
  onErrorColor?: string;
  logo?: Asset;
  fonts?: string;
} & GraphCMSSystemFields;
