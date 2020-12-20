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

type Props = {

} & React.SVGProps<SVGSVGElement>;

const ${componentName} = (props: Props): JSX.Element => {
  return (
    ${jsx}
  );
};

export default ${componentName};
`;
}

module.exports = template;
