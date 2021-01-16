import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from 'react';

/**
 * React HTML "Link" element properties.
 * Meant to be a helper when using custom buttons that should inherit native "<a>" properties.
 *
 * @example type MyLinkProps = {
 *   href?: string;
 * } & ReactLinkProps;
 */
export type ReactLinkProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
