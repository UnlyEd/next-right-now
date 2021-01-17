import { CSSStyles } from '../../css/types/CSSStyles';

export type Link = {
  id?: string;
  url?: string;
  target?: string;
  style?: string | CSSStyles;
  className?: string;
  classes?: string;
}
