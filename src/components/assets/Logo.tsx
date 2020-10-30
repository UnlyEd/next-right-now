import styled from '@emotion/styled';
import classnames from 'classnames';
import deepmerge from 'deepmerge';
import get from 'lodash.get';
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React from 'react';

import { CSSStyles } from '../../types/CSSStyles';
import { Link } from '../../types/data/Link';
import { Logo as LogoType } from '../../types/data/Logo';
import {
  DEFAULT_SIZES_MULTIPLIERS,
  generateSizes,
  resolveSize,
  SizeMultiplier,
  toPixels,
} from '../../utils/assets/logo';

type Props = {
  id: string;
  logo: LogoType;
  width?: number | string;
  height?: number | string;
  defaults?: LogoType;
  override?: LogoType;
  sizesMultipliers?: SizeMultiplier[];
  className?: string;
  style?: CSSStyles;
  link?: Link;
  onClick?: () => void;
}

/**
 * Display a logo
 */
const Logo = (props: Props): JSX.Element => {
  const {
    logo,
    width = null,
    height = null,
    defaults = {},
    override = {},
    sizesMultipliers = DEFAULT_SIZES_MULTIPLIERS,
    id,
    className = '',
    link = {
      id: null,
      style: {},
      className: '',
    },
    style = {},
    onClick = null,
  }: Props = props;
  let resolvedLogoProps: LogoType = deepmerge.all([defaults, logo || {}, override]);
  resolvedLogoProps = deepmerge.all([resolvedLogoProps, resolveSize({ logo: resolvedLogoProps, width: toPixels(width), height: toPixels(height) })]);

  if (resolvedLogoProps.linkUrl) {
    resolvedLogoProps.link = {
      url: resolvedLogoProps.linkUrl,
      target: resolvedLogoProps.linkTarget,
    };
  }

  const sizes = generateSizes({
    // @ts-ignore
    baseWidth: typeof resolvedLogoProps?.width === 'string' ? parseInt(resolvedLogoProps?.width, 10) : resolvedLogoProps?.width,
    // @ts-ignore
    baseHeight: typeof resolvedLogoProps?.height === 'string' ? parseInt(resolvedLogoProps?.height, 10) : resolvedLogoProps?.height,
    sizesMultipliers,
  });

  // @ts-ignore
  const StyledImage = styled.img`
    width: ${get(sizes, 'xs.width')};
    height: ${get(sizes, 'xs.height')};

    @media screen and (min-width: 576px) {
      width: ${get(sizes, 'sm.width')};
      height: ${get(sizes, 'sm.height')};
    }

    @media screen and (min-width: 768px) {
      width: ${get(sizes, 'md.width')};
      height: ${get(sizes, 'md.height')};
    }
  `;

  const Image = (): JSX.Element => {
    return (
      <StyledImage
        key={id}
        id={id}
        src={resolvedLogoProps.url}
        title={resolvedLogoProps.filename}
        alt={resolvedLogoProps.filename || resolvedLogoProps.url}
        className={classnames(`logo-${id}`, className)}
        style={deepmerge(style || {}, resolvedLogoProps.style || {})}
        onClick={onClick}
      />
    );
  };

  // Create a link wrapper only if a link is provided
  if (resolvedLogoProps.link) {
    return (
      <a
        id={link.id}
        href={resolvedLogoProps.link.url}
        target={resolvedLogoProps.link.target}
        rel={resolvedLogoProps.link.target === '_blank' ? 'noopener' : null}
        className={classnames(resolvedLogoProps.link.classes, link.className)}
        // @ts-ignore
        style={deepmerge(resolvedLogoProps.link.style || {}, link.style || {})}
        onClick={onClick}
      >
        <Image />
      </a>
    );
  } else {
    return (
      <Image />
    );
  }
};

export default Logo;
