import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { getPropertyName } from 'css-to-react-native';
import isPlainObject from 'lodash.isplainobject';
import map from 'lodash.map';
import { CSSStyles } from '../types/CSSStyles';

const logger = createLogger({
  label: 'utils/css',
});

/**
 * Takes a standard css string and returns an object of {"key": "value"} that is react-compatible
 * Relies on https://github.com/styled-components/css-to-react-native#api to resolve the property name (getPropertyName)
 *
 * @example cssToReactStyle('border-width: 5px; padding: 8px 10px'}); // => {borderWidth: '5px', padding: '8px 10px'}
 *
 * If the given "css" param is an object, it will be returned untouched
 * Any unexpected type/value will return an empty object
 *
 * Doesn't handle meta attributes, such as "&:hover" and alike
 *
 * @param css
 * @return {object}
 */
export const cssToReactStyle = (css: string | CSSStyles): CSSStyles => {
  // If object is given, return object (could be react style object mistakenly provided)
  if (isPlainObject(css)) {
    return css as CSSStyles;
  }

  // If falsy, then probably empty string or null, nothing to be done there
  if (!css) {
    return {};
  }

  // Only accepts strings
  if (typeof css !== 'string') {
    const errorMessage = `Unexpected type "${typeof css}" when expecting string, with value "${css}"`;
    Sentry.captureException(Error(errorMessage));
    logger.error(errorMessage, 'cssToReactStyle');
    return {};
  }

  const style = {};
  const rules = css.split(';');
  map(rules, (rule) => {
    let [key, value] = rule.split(':');

    if (key && value) {
      key = key.trim();
      value = value.trim();

      style[getPropertyName(key)] = value;
    } // If either the key or value is falsy, ignore the rule TODO could log error but need to handle special case where string ends with a ";"
  });

  return style;
};
