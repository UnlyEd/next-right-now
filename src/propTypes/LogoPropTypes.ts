import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

export default {
  url: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    classes: PropTypes.string,
    style: stylePropType,
  }),
  title: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  classes: PropTypes.string,
  style: stylePropType,
  sizes: PropTypes.shape({
    xs: PropTypes.object, // ~20px
    sm: PropTypes.object, // ~50px
    md: PropTypes.object, // ~100px
    lg: PropTypes.object, // ~200px
    xl: PropTypes.object, // ~400px
  }),
};
