/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import classnames from 'classnames';
import deepmerge from 'deepmerge';
import get from 'lodash.get';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React from 'react';
import stylePropType from 'react-style-proptype';
import compose from 'recompose/compose';

import LogoPropTypes from '../propTypes/LogoPropTypes';
import { Link } from '../types/data/Link';
import { Logo as LogoType } from '../types/data/Logo';
import {
  DEFAULT_SIZES_MULTIPLIERS, generateSizes, resolveSize, SizeMultiplier, toPixels 
} from '../utils/logo';

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

  // Handle v2 structure (graphcms)
  if (resolvedLogoProps.linkUrl) {
    resolvedLogoProps.link = {
      url: resolvedLogoProps.linkUrl,
      target: resolvedLogoProps.linkTarget,
    };
  }

  const sizes = generateSizes({
    baseWidth: parseFloat(resolvedLogoProps.width as string),
    baseHeight: parseFloat(resolvedLogoProps.height as string),
    sizesMultipliers,
  });

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
        title={resolvedLogoProps.title}
        alt={resolvedLogoProps.alt}
        className={classnames(`logo-${id}`, className, resolvedLogoProps.classes)}
        style={deepmerge(style || {}, resolvedLogoProps.style || {})}
        // @ts-ignore
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
        className={classnames(resolvedLogoProps.link.classes, link.className)}
        // @ts-ignore
        style={deepmerge(resolvedLogoProps.link.style || {}, link.style || {})}
        // @ts-ignore
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

Logo.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.shape(LogoPropTypes),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  defaults: PropTypes.shape(LogoPropTypes), // Merged with the logo, takes lowest priority
  override: PropTypes.shape(LogoPropTypes), // Merged with the logo, takes highest priority
  sizesMultipliers: PropTypes.array,
  className: PropTypes.string,
  style: stylePropType,
  link: PropTypes.object,
  onClick: PropTypes.func, // Support for usage within <Link> component (from Next.js)
};

type Props = {
  id: string;
  logo: LogoType;
  width: number | string;
  height: number | string;
  defaults: LogoType;
  override: LogoType;
  sizesMultipliers: SizeMultiplier[];
  className: string;
  style: object;
  link: Link;
  onClick: Function;
}

export default compose(
)(Logo);
