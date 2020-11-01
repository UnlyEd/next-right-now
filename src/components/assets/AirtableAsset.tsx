import classnames from 'classnames';
import deepmerge from 'deepmerge';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { CSSStyles } from '../../types/CSSStyles';
import { Asset } from '../../types/data/Asset';
import { AssetTransformations } from '../../types/data/AssetTransformations';
import { Link } from '../../types/data/Link';
import { cssToReactStyle } from '../../utils/css';

type Props = {
  asset: Asset;
  id?: string;
  transformationsOverride?: AssetTransformations;
  defaults?: Asset; // TODO Should be renamed to "assetFallback"
  override?: Asset; // TODO Should be renamed to "assetOverride"
  className?: string;
  style?: CSSStyles;
  onClick?: () => void;
  linkOverride?: {
    id?: string;
    url?: string;
    target?: string;
    style?: CSSStyles;
    classes?: string; // TODO Should be renamed to "className"
  };
}

const _defaultAsset = {
  id: null,
  url: '', // TODO use link of default missing image
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
 * Displays an image with enriched capabilities, for a given "Asset".
 *
 * Extra capabilities:
 *  - Auto-generates an "id", based on the asset.id
 *  - Asset default properties
 *    - A default asset can be provided and its properties will be used as fallback properties, if they're undefined in the asset property
 *  - Asset override
 *    - An asset override can be provided and its properties will take priority, even if they're defined within the asset property
 *  - Link wrapper
 *    - The image will be wrapped with a link, if a valid link (contains a "url") is provided either through:
 *      - The asset itself (asset.linkUrl)
 *      - The linkOverride (linkOverride.url)
 *  - Link override
 *    - A link override can be provided and its properties will take priority, even if they're defined within the link property
 *
 * @param props
 */
const AirtableAsset = (props: Props): JSX.Element => {
  const {
    asset,
    id,
    defaults = {},
    override = {},
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
  const defaultClass = id ? `asset-${id}` : identifier;
  const resolvedAssetProps: Asset = deepmerge.all([_defaultAsset, defaults, asset || {}, override]);
  const resolvedLinkProps: Link = deepmerge.all([
    _defaultLink,
    {
      url: asset.linkUrl || _defaultLink.url,
      target: asset.linkTarget || _defaultLink.target,
    },
    linkOverride,
  ]);
  const transformations: AssetTransformations = transformationsOverride || asset.defaultTransformations;

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
        className={classnames(defaultClass, className, resolvedAssetProps.classes)}
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
