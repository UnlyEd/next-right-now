import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from 'react';

/**
 * React HTML "Button" element properties.
 * Meant to be a helper when using custom buttons that should inherit native "<button>" properties.
 *
 * @example type MyButtonProps = {
 *   transparent?: boolean;
 * } & ReactButtonProps;
 */
export type ReactButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
