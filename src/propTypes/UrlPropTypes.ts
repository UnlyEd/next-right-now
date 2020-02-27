import PropTypes from 'prop-types';

/**
 * "url" is automatically provided by the framework Next.js to all main Pages
 * It contains meta information, such as the query variables
 */
export default {
  asPath: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.shape({
    schoolPath: PropTypes.string,
  }).isRequired,
};
