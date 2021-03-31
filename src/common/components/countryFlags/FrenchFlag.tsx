import React from 'react';

type Props = {} & React.SVGProps<SVGSVGElement>;

const SvgFrenchFlag = (props: Props): JSX.Element => {
  return (
    // @ts-ignore
    <svg
      data-name="Calque 1"
      xmlns="http://www.w3.org/2000/svg"
      width={24.43}
      height={12.91}
      {...props}
    >
      <path fill="#012169" d="M0 0h7.98v12.91H0z" />
      <path fill="#c8102e" d="M16.45 0h7.98v12.91h-7.98z" />
    </svg>
  );
};

export default SvgFrenchFlag;
