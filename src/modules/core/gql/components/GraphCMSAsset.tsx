import { cssToReactStyle } from '@/modules/core/css/css';
import { CSSStyles } from '@/modules/core/css/types/CSSStyles';
import { Asset } from '@/modules/core/data/types/Asset';
import { AssetTransformations } from '@/modules/core/data/types/AssetTransformations';
import classnames from 'classnames';
import deepmerge from 'deepmerge';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import React from 'react';
import { Link } from '../../data/types/Link';

type Props = {
  /**
   * Asset, extends GraphCMS asset, e.g: image, document, etc.
   *
   * <span className="tip">XXX</span> The `asset` will be merged with `_defaultAsset`.
   */
  asset: Asset;

  /**
   * HTML id attribute. Must be unique.
   */
  id: string;

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

  /**
   * Whether to force output format to be PNG, allows to display PDF files as images.
   *
   * It bypasses the usage of SVG files.
   *
   * @default false
   */
  forcePNGOutput?: boolean;
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
 * Displays an asset, based on the provided props
 * Handles GraphCMS assets, including svg
 * Should be used to display assets coming from GraphCMS (handles transformations)
 *
 * @param props
 * @return {null|*}
 *
 * @see Transformations https://docs.graphcms.com/developers/assets/transformations/transforming-url-structure
 */
const GraphCMSAsset: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    id,
    asset,
    defaults = {},
    override = {},
    className = '',
    style = null,
    onClick = null,
    linkOverride = {},
    transformationsOverride = null,
    forcePNGOutput = false,
  }: Props = props;
  if (isEmpty(asset)) {
    return null;
  }
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
    // XXX Transformations are handled differently when the file is an SVG
    if (get(asset, 'mimeType') === 'image/svg+xml') {
      // If the asset is a SVG, then we must set width/height manually as styles, because transformations won't work on this kind of asset
      if (transformations.width) {
        resolvedAssetProps.style.width = transformations.width;
      }
      if (transformations.height) {
        resolvedAssetProps.style.height = transformations.height;
      }

    } else {
      const _urlSplitted = resolvedAssetProps.url.split('/'); // TODO will break if url ends with '/'
      const assetFileHandle = _urlSplitted[_urlSplitted.length - 1];
      const assetBaseUrl = resolvedAssetProps.url.replace(assetFileHandle, '');

      // XXX See https://docs.graphcms.com/docs/assets/transformations/
      let transformationsToApply = 'quality=value:100/'; // Forcing max quality (not sure it's useful, but we want max visual quality)
      transformationsToApply += forcePNGOutput ? 'output=format:png/' : ''; // Forcing output format to be PNG, allows to display PDF files as images (this bypasses the usage of SVG files)

      // Handle resize transformations
      const resize: AssetTransformations = {};
      if (transformations.width) {
        resize.width = transformations.width;
      }
      if (transformations.height) {
        resize.height = transformations.height;
      }

      if (!isEmpty(resize)) {
        transformationsToApply += 'resize=' + map(resize, (value: string, transformation: string) => {
          return transformation + ':' + value;
        }).join(',');
      }

      // Once all transformations have been resolved, update the asset url
      // XXX Using "auto_image" will automatically select the image type (WebP, etc.) based on the browser (reduces size by 20-80%, compared to png)
      //  See https://www.filestack.com/docs/api/processing/#auto-image-conversion
      resolvedAssetProps.url = `${assetBaseUrl}${transformationsToApply}/auto_image/${assetFileHandle}`;
    }
  }

  const Image = (): JSX.Element => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={id}
        id={id}
        src={resolvedAssetProps.url}
        title={resolvedAssetProps.title}
        alt={resolvedAssetProps.alt || resolvedAssetProps.title || resolvedAssetProps.url}
        className={classnames(`asset-${id}`, className, resolvedAssetProps.classes)}
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

export default GraphCMSAsset;
