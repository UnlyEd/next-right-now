import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

import GraphCMSAssetTransformationsPropTypes from './GraphCMSAssetTransformationsPropTypes';

// Can't use any required field here, as this shape can be used for default values that won't specify props such as "url"
export default {
  url: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  classes: PropTypes.string,
  style: stylePropType,
  linkUrl: PropTypes.string,
  linkTarget: PropTypes.string,
  defaultTransformations: PropTypes.shape(GraphCMSAssetTransformationsPropTypes),
};
