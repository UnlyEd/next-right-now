/**
 * Template for React SVG
 *
 * Converts the given SVG into a TypeScript-compatible React component
 *
 * @see https://www.smooth-code.com/open-source/svgr/docs/typescript/
 * @see https://github.com/smooth-code/svgr
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function template(
  { template },
  opts,
  {
    imports, componentName, props, jsx, exports,
  },
) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  return typeScriptTpl.ast`
import React from 'react';
import { useTheme } from 'emotion-theming';

import { Theme } from '../../types/data/Theme';

const ${componentName} = (props: Props): JSX.Element => {
  const theme: Theme = useTheme();
  const { primaryColor } = theme;

  return (
    ${jsx}
  );
};

type Props = {

} & React.SVGProps<SVGSVGElement>;

export default ${componentName};
`;
}

module.exports = template;
