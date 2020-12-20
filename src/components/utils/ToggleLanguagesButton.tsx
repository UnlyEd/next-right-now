import React from 'react';
import ToggleButton from './ToggleButton';

type Props = {
  id: string;
  flag1?: any; // Expects image used as background. E.g: `url("data:image/svg+xml, ...")`
  flag2?: any; // Expects image used as background. E.g: `url("data:image/svg+xml, ...")`
  isChecked?: boolean;
} & React.HTMLProps<HTMLSpanElement>;

/**
 * Button that toggles between two language flags.
 *
 * @param props
 */
const ToggleLanguagesButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const frenchFlagSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 35 17' width='20px' %3E%3Cstyle%3E %7B '.FrenchFlag_svg__st4,.FrenchFlag_svg__st6%7Bdisplay:inline;fill:%23fff%7D.FrenchFlag_svg__st6%7Bfill:%23002496%7D' %7D %3C/style%3E%3Cg id='FrenchFlag_svg__Calque_2'%3E%3Cpath fill='%23002496' d='M0-.089h10v17.178H0z' /%3E%3Cpath fill='%23fff' d='M10-.089h10v17.178H10z' /%3E%3Cpath fill='%23ed2839' d='M20-.089h10v17.178H20z' /%3E%3C/g%3E%3C/svg%3E")`;
  const englishFlagSvg = `url("data:image/svg+xml,%3Csvg id='Calque_1' data-name='Calque 1' xmlns='http://www.w3.org/2000/svg' width='20px' viewBox='0 0 20 10'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23c82531;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%23252e64;%7D%3C/style%3E%3C/defs%3E%3Cg id='Y5ra3v.tif'%3E%3Cpath class='cls-1' d='M0,6V4H8.91C9,4,9,4,9,3.91V0h2V3.9c0,.08,0,.1.1.1H20V6H11.09C11,6,11,6,11,6.09V10H9V6.1C9,6,9,6,8.9,6Z'/%3E%3Cpath class='cls-2' d='M9,0V3.91C9,4,9,4,8.91,4H0V3.33H4.41L0,1.12V.75l.1,0,5,2.5a.33.33,0,0,0,.17,0h1.3s0,0,.07,0l-.07,0L.1.05A.18.18,0,0,1,0,0H2.25l0,0,6,3s0,0,.06,0V0Z'/%3E%3Cpath class='cls-2' d='M11,10V6.09C11,6,11,6,11.09,6H20v.67H15.59L20,8.88v.37l-.1,0-5-2.5a.33.33,0,0,0-.17,0H13.35l.09,0L19.9,10A.18.18,0,0,1,20,10H17.75l-.05,0-6-3s0,0-.06,0v3Z'/%3E%3Cpath class='cls-2' d='M20,4H11.1C11,4,11,4,11,3.9V0h.67V3.05l.07,0L16.88.44,17.75,0h.75l-.08.05L12,3.28l-.08,0h1.37a.33.33,0,0,0,.17,0L19.3.35c.23-.12.46-.22.68-.35,0,0,0,.05,0,.07,0,.35,0,.7,0,1.05l-4.41,2.2H20Z'/%3E%3Cpath class='cls-2' d='M0,6H8.9C9,6,9,6,9,6.1V10H8.33V7L8.26,7,3.13,9.56c-.3.14-.59.29-.88.44H1.5L1.58,10,8.05,6.72l.08,0H6.76a.33.33,0,0,0-.17,0L.7,9.65C.47,9.77.24,9.87,0,10c0,0,0-.05,0-.07,0-.35,0-.7,0-1l4.41-2.2H0Z'/%3E%3Cpath class='cls-3' d='M8.33,0V3s0,0-.06,0l-6-3,0,0Z'/%3E%3Cpath class='cls-3' d='M17.75,0l-.87.44L11.74,3l-.07,0V0Z'/%3E%3Cpath class='cls-3' d='M2.25,10c.29-.15.58-.3.88-.44L8.26,7l.07,0V10Z'/%3E%3Cpath class='cls-3' d='M11.67,10V7s0,0,.06,0l6,3,.05,0Z'/%3E%3Cpath class='cls-1' d='M20,0c-.22.13-.45.23-.68.35L13.41,3.29a.33.33,0,0,1-.17,0H11.87l.08,0L18.42.05l.08,0Z'/%3E%3Cpath class='cls-1' d='M0,10c.22-.13.45-.23.68-.35L6.59,6.71a.33.33,0,0,1,.17,0H8.13l-.08,0L1.58,10,1.5,10Z'/%3E%3Cpath class='cls-3' d='M0,1.12l4.41,2.2H0Z'/%3E%3Cpath class='cls-3' d='M20,3.33H15.59L20,1.12Z'/%3E%3Cpath class='cls-3' d='M0,6.67H4.41L0,8.88Z'/%3E%3Cpath class='cls-3' d='M20,8.88l-4.41-2.2H20Z'/%3E%3Cpath class='cls-1' d='M0,0A.18.18,0,0,0,.1.05L6.57,3.29l.07,0s0,0-.07,0H5.27a.33.33,0,0,1-.17,0L.1.79,0,.75c0-.23,0-.47,0-.7C0,0,0,0,0,0Z'/%3E%3Cpath class='cls-1' d='M20,10A.18.18,0,0,0,19.9,10L13.44,6.72l-.09,0h1.38a.33.33,0,0,1,.17,0l5,2.5.1,0c0,.23,0,.47,0,.7C20,10,20,10,20,10Z'/%3E%3C/g%3E%3C/svg%3E")`;
  const {
    id,
    flag1 = frenchFlagSvg,
    flag2 = englishFlagSvg,
    isChecked,
    ...rest
  } = props;

  return (
    <ToggleButton
      id={id}
      valueOn={flag1}
      valueOff={flag2}
      isChecked={isChecked}
      {...rest}
    />
  );
};

export default ToggleLanguagesButton;
