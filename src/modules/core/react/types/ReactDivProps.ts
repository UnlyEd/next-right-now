import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from 'react';

/**
 * React HTML "Div" element properties.
 * Meant to be a helper when using custom divs that should inherit native "<div>" properties.
 *
 * @example type MyDivProps = {
 *   onClick?: () => void;
 * } & ReactDivProps;
 */
export type ReactDivProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>;
