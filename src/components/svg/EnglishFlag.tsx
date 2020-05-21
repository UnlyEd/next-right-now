import { css } from '@emotion/core';
import React from 'react';

const EnglishFlag = (props) => {
  return (
    <svg
      id="EnglishFlag_svg__Calque_3"
      x={0}
      y={0}
      width="20px"
      css={css`
        padding-right: 20px;
      `}
      viewBox="0 0 35 17"
      xmlSpace="preserve"
      {...props}
    >
      <style>{'.EnglishFlag_svg__st2{fill:#002496}'}</style>
      <path fill="#fff" d="M0 0h30v17H0z" />
      <path
        d="M.035 6.806c.059.002.118.006.177.006h13.034V0h3.568v6.809h13.204v3.395H16.831c-.006.066-.014.111-.014.156v6.591c0 .029.004.059.006.088h-3.577c.002-.029.006-.059.006-.088v-6.604c0-.04-.005-.079-.009-.136H.23c-.065 0-.13.004-.194.006L.035 6.806z"
        fill="#ed2839"
      />
      <path
        className="EnglishFlag_svg__st2"
        d="M18.027 17.04l.005-4.585v-.22c.316.174.61.331.899.495.568.323 1.131.653 1.699.976.864.492 1.729.981 2.594 1.471a680.719 680.719 0 003.304 1.862l-8.501.001zM3.577 17.04l1.931-1.102.705-.402c.781-.447 1.562-.896 2.344-1.342.628-.358 1.258-.715 1.888-1.07.497-.28.997-.555 1.495-.832.024-.014.05-.024.101-.049v4.797H3.577zM.035 2.023l1.627.922c.235.133.471.265.706.399.781.447 1.561.897 2.343 1.341.521.296 1.046.586 1.569.879.056.031.11.067.163.136H.247c-.071 0-.141.003-.212.005V2.023zM.035 11.373l3.505.005h2.898l.014.039c-.146.079-.293.155-.437.236-.486.276-.971.554-1.457.831l-2.851 1.625c-.557.317-1.115.632-1.673.947l.001-3.683zM26.482 0c-.436.249-.847.486-1.26.72-.24.136-.485.264-.724.401-.567.324-1.132.653-1.699.977a1342.772 1342.772 0 01-4.467 2.53c-.09.051-.186.093-.292.145V0h8.442zM3.592 0h8.43v4.787c-.32-.177-.629-.343-.933-.517-.567-.323-1.131-.652-1.698-.975-.858-.488-1.718-.975-2.578-1.462L4.926.765 3.773.116C3.723.088 3.677.054 3.592 0zM30.022 2.038v3.649h-6.441l6.441-3.649zM30.021 11.393v3.647l-6.438-3.647h6.438z"
      />
    </svg>
  );
};

type Props = {} & React.SVGProps<SVGSVGElement>;
export default EnglishFlag;
