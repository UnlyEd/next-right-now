/**
 * Custom styling of the ReactSelect component
 * See https://react-select.com/styles
 *
 * @type {object}
 */
import { CSSStyles } from '../css/types/CSSStyles';

export type ReactSelectTheme = {
  borderRadius: number; // 4
  colors: {
    primary: string; // "#2684FF"
    primary75: string; // "#4C9AFF"
    primary50: string; // "#B2D4FF"
    primary25: string; // "#DEEBFF"
    danger: string; // "#DE350B"
    dangerLight: string; // "#FFBDAD"
    neutral0: string; // "hsl(0, 0%, 100%)"
    neutral5: string; // "hsl(0, 0%, 95%)"
    neutral10: string; // "hsl(0, 0%, 90%)"
    neutral20: string; // "hsl(0, 0%, 80%)"
    neutral30: string; // "hsl(0, 0%, 70%)"
    neutral40: string; // "hsl(0, 0%, 60%)"
    neutral50: string; // "hsl(0, 0%, 50%)"
    neutral60: string; // "hsl(0, 0%, 40%)"
    neutral70: string; // "hsl(0, 0%, 30%)"
    neutral80: string; // "hsl(0, 0%, 20%)"
    neutral90: string; // "hsl(0, 0%, 10%)"
  };
  spacing: {
    baseUnit: number; // 4
    controlHeight: number; // 38
    menuGutter: number; // 8
  };
}

export const selectStyles = {
  container: (provided): CSSStyles => ({
    ...provided,
    marginBottom: '10px',
  }),
  option: (provided): CSSStyles => ({
    ...provided,
    'backgroundColor': 'white',
    '&:hover': {
      backgroundColor: 'white',
      opacity: 0.7,
    },
  }),
};
