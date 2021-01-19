import classnames from 'classnames';
import deepmerge from 'deepmerge';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { CSSStyles } from '@/modules/core/css/types/CSSStyles';
import {
  Asset,
  AssetTransformations,
} from '@/modules/core/data/types/Asset';
import { Link } from '@/modules/core/data/types/Link';
import { cssToReactStyle } from '@/modules/core/css/css';

export type Props = {
  /**
   * Asset, extends Airtable attachment, e.g: image, document, etc.
   *
   * <span className="tip">XXX</span> The `asset` will be merged with `_defaultAsset`.
   */
  asset: Asset;

  /**
   * HTML id attribute. Must be unique.
   */
  id?: string;

  /**
   * Overrides transformations.
   *
   * @default null
   */
  transformationsOverride?: AssetTransformations;

  /**
   * Default `asset` properties.
   *
   * @default {}
   */
  defaults?: Asset;

  /**
   * Overrides `asset` properties.
   *
   * @default {}
   */
  override?: Asset;

  /**
   * CSS classes.
   */
  className?: string;

  /**
   * CSS styles
   *
   * @default null
   */
  style?: CSSStyles;

  /**
   * Click event.
   */
  onClick?: () => void;

  /**
   * Overrides `Link` element properties.
   *
   * @default {}
   */
  linkOverride?: {
    id?: string;
    url?: string;
    target?: string;
    style?: CSSStyles;
    classes?: string;
  };
}

const _defaultAsset = {
  id: null,
  url: '',
  title: '',
  alt: '',
  style: null,
  className: '',
};

const _defaultLink: Link = {
  id: null,
  url: null,
  target: '_blank',
  style: null,
  className: '',
};

/**
 * Displays an asset hosted on Airtable CDN. (`https://dl.airtable.com`)
 *
 * **Handles images only**, doesn't handle documents (PDF, etc.)
 */
const AirtableAsset = (props: Props): JSX.Element => {
  const {
    asset,
    id,
    defaults = {} as Asset,
    override = {} as Asset,
    className = '',
    style = null,
    onClick = null,
    linkOverride = {},
    transformationsOverride = null,
  }: Props = props;
  if (isEmpty(asset)) {
    return null;
  }
  const identifier = id || `asset-${asset?.id}`;
  const dynamicClasses = (id ? `asset-${id}` : identifier) + (asset.ref ? ` ${asset.ref}` : '');
  const resolvedAssetProps: Asset = deepmerge.all([_defaultAsset, defaults, asset || {}, override]) as Asset;
  const resolvedLinkProps: Link = deepmerge.all([
    _defaultLink,
    {
      url: asset.linkUrl || _defaultLink.url,
      target: asset.linkTarget || _defaultLink.target,
    },
    linkOverride,
  ]);
  const transformations: AssetTransformations = transformationsOverride || { width: asset.width, height: asset.height };

  // Convert "style" if it is a string, to a react style object (won't modify if already an object)
  resolvedAssetProps.style = cssToReactStyle(resolvedAssetProps.style);
  resolvedLinkProps.style = cssToReactStyle(resolvedLinkProps.style);

  if (transformations) {
    if (transformations.width) {
      resolvedAssetProps.style.width = transformations.width;
    }
    if (transformations.height) {
      resolvedAssetProps.style.height = transformations.height;
    }
  }

  const Image = (): JSX.Element => {
    return (
      <img
        key={identifier}
        id={identifier}
        src={resolvedAssetProps.url}
        title={resolvedAssetProps.title || resolvedAssetProps.filename}
        alt={resolvedAssetProps.title || resolvedAssetProps.filename || resolvedAssetProps.url}
        className={classnames(dynamicClasses, className, resolvedAssetProps.classes)}
        style={deepmerge(style || {}, resolvedAssetProps.style || {})}
      />
    );
  };

  // Create a link wrapper only if a link url is provided
  if (resolvedLinkProps.url) {
    return (
      <a
        key={resolvedLinkProps.id}
        id={resolvedLinkProps.id}
        href={resolvedLinkProps.url}
        target={resolvedLinkProps.target}
        className={classnames(`asset-link-${id}`, resolvedLinkProps.classes, resolvedLinkProps.className)}
        style={deepmerge(resolvedLinkProps.style || {}, resolvedLinkProps.style || {})}
        onClick={onClick} // Support for usage within <Link> component (from Next.js)
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

export default AirtableAsset;
