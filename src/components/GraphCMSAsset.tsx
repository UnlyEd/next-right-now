import classnames from 'classnames';
import deepmerge from 'deepmerge';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import PropTypes from 'prop-types';
import React from 'react';
import stylePropType from 'react-style-proptype';

import GraphCMSAssetPropTypes from '../propTypes/GraphCMSAssetPropTypes';
import GraphCMSAssetTransformationsPropTypes from '../propTypes/GraphCMSAssetTransformationsPropTypes';
import { Asset } from '../types/data/Asset';
import { AssetTransformations } from '../types/data/AssetTransformations';
import { Link } from '../types/data/Link';
import { cssToReactStyle } from '../utils/css';

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
 * @constructor
 *
 * @see Transformations https://docs.graphcms.com/developers/assets/transformations/transforming-url-structure
 */
const GraphCMSAsset = (props: Props): JSX.Element => {
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
    forcePNGOutput = true,
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
      resolvedAssetProps.url = `${assetBaseUrl}${transformationsToApply}/${assetFileHandle}`;
    }
  }

  const Image = (): JSX.Element => {
    return (
      <img
        key={id}
        id={id}
        src={resolvedAssetProps.url}
        title={resolvedAssetProps.title}
        alt={resolvedAssetProps.alt}
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
        // @ts-ignore
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

GraphCMSAsset.propTypes = {
  id: PropTypes.string.isRequired,
  asset: PropTypes.shape(GraphCMSAssetPropTypes).isRequired,
  transformationsOverride: PropTypes.shape(GraphCMSAssetTransformationsPropTypes),
  defaults: PropTypes.shape(GraphCMSAssetPropTypes), // Merged with the asset, takes lowest priority
  override: PropTypes.shape(GraphCMSAssetPropTypes), // Merged with the asset, takes highest priority
  className: PropTypes.string,
  style: stylePropType,
  onClick: PropTypes.func, // Support for usage within <Link> component (from Next.js)
  linkOverride: PropTypes.shape({ // Merged with the default link and the asset link attributes, takes highest priority
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    target: PropTypes.string,
    style: PropTypes.object,
    classes: PropTypes.string,
  }),
  forceOutputPNG: PropTypes.bool,
};

type Props = {
  id: string;
  asset: Asset;
  transformationsOverride?: AssetTransformations;
  defaults?: Asset;
  override?: Asset;
  className?: string;
  style?: object;
  onClick?: Function;
  linkOverride?: {
    id?: string;
    url?: string;
    target?: string;
    style?: object;
    classes?: string;
  };
  forcePNGOutput?: boolean;
}

export default GraphCMSAsset;
