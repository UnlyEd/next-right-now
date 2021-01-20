import React from 'react';
import ToggleButton from '@/components/dataDisplay/ToggleButton';

export type Props = {
  /**
   * HTML id attribute. Must be unique.
   *
   * <span className="tip">XXX</span> The component will not be interactive without a unique id!
   */
  id: string;

  /**
   * Flag used when the toggle button is checked.
   */
  flagOn?: string;

  /**
   * Flag used when the toggle button is not checked.
   */
  flagOff?: string;

  /**
   * Whether the toggle is checked.
   *
   * Should be a controlled property.
   */
  isChecked?: boolean;
} & React.HTMLProps<HTMLSpanElement>;

/**
 * Button that toggles between two language flags.
 *
 * Use a SVG encoder for SVGs:
 *
 * - https://yoksel.github.io/url-encoder/ Copy the SVG code and take the "Ready for CSS" value (without the "background-color" part)
 */
const ToggleLanguagesButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const frenchFlagSvg = `url("data:image/svg+xml,%3Csvg id='Calque_1' data-name='Calque 1' xmlns='http://www.w3.org/2000/svg' width='24.43' height='12.91' viewBox='0 0 24.43 12.91'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23012169;%7D.cls-2%7Bfill:%23c8102e;%7D%3C/style%3E%3C/defs%3E%3Crect class='cls-1' width='7.98' height='12.91'/%3E%3Crect class='cls-2' x='16.45' width='7.98' height='12.91'/%3E%3C/svg%3E")`;
  // Use English UK or English Hybrid at your convenience
  const englishFlagSvg = `url("data:image/svg+xml,%3Csvg id='Calque_1' data-name='Calque 1' xmlns='http://www.w3.org/2000/svg' width='24.43' height='12.91' viewBox='0 0 24.43 12.91'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23c7102e;%7D.cls-2%7Bfill:%23faf9fa;%7D.cls-3%7Bfill:%23012068;%7D%3C/style%3E%3C/defs%3E%3Cg id='_3VsY8T' data-name='3VsY8T'%3E%3Cpath class='cls-1' d='M0,7.71V5.2l.42,0c3.39,0,6.79,0,10.18,0,.31,0,.38-.1.38-.41C11,3.19,11,1.59,11,0h2.45c0,1.59,0,3.19,0,4.78,0,.31.07.41.38.41,3,0,6,0,9.07,0l1.53,0V7.71l-.42,0c-3.39,0-6.79,0-10.18,0-.31,0-.38.1-.38.41,0,1.59,0,3.19,0,4.78H11c0-1.59,0-3.19,0-4.78,0-.31-.07-.41-.38-.41-3,0-6,0-9.07,0Z'/%3E%3Cpath class='cls-2' d='M11,0c0,1.59,0,3.19,0,4.78,0,.31-.07.41-.38.41-3.39,0-6.79,0-10.18,0L0,5.2V4.3H5.28V4.23L0,1.46V1c1.85,1,3.73,1.92,5.56,3A4.36,4.36,0,0,0,8,4.27a1,1,0,0,0-.22-.15c-1.7-.9-3.4-1.79-5.09-2.7C1.83,1,.93.54.09,0H2.86c.05.14.19.16.29.21l3.71,2,3.28,1.73V0Z'/%3E%3Cpath class='cls-2' d='M13.44,12.91c0-1.59,0-3.19,0-4.78,0-.31.07-.41.38-.41,3.39,0,6.79,0,10.18,0l.42,0v.9H19.15v.07l5.27,2.77v.49c-1.85-1-3.73-1.92-5.56-3a4.36,4.36,0,0,0-2.43-.34,1,1,0,0,0,.22.15c1.7.9,3.4,1.79,5.09,2.7.87.47,1.77.88,2.61,1.42H21.57c-.06-.15-.21-.17-.33-.23l-3.81-2L14.29,9v3.91Z'/%3E%3Cpath class='cls-2' d='M0,7.71l1.53,0c3,0,6.05,0,9.07,0,.31,0,.38.1.38.41,0,1.59,0,3.19,0,4.78h-.85V9L10,9.09,3,12.77c-.06,0-.16,0-.16.14H1.93c.06-.14.2-.16.3-.22L8.55,9.35l1.29-.69A9.51,9.51,0,0,0,8.79,8.6a2,2,0,0,0-1.2.3C6.06,9.73,4.51,10.53,3,11.35c-1,.52-1.95,1-2.89,1.56-.16-.15-.06-.35-.07-.53s0-.62,0-.93L5.3,8.68l0-.07H0Z'/%3E%3Cpath class='cls-2' d='M24.41,5.2l-1.53,0c-3,0-6.05,0-9.07,0-.31,0-.38-.1-.38-.41,0-1.59,0-3.19,0-4.78h.85V3.9l.18-.08L21.41.14c.06,0,.16,0,.16-.14h.93c0,.09-.08.1-.13.12l-7.49,4c-.09.06-.26,0-.28.23.31,0,.62,0,.93,0A2.32,2.32,0,0,0,16.91,4c1.52-.83,3.05-1.62,4.58-2.44,1-.51,1.92-1,2.85-1.54.16.15.06.35.07.53s0,.62,0,.93L19.13,4.23l0,.07h5.25Z'/%3E%3Cpath class='cls-3' d='M10.14,0V3.91L6.86,2.18,3.15.21c-.1,0-.24-.07-.29-.21Z'/%3E%3Cpath class='cls-3' d='M21.57,0c0,.11-.1.11-.16.14L14.47,3.82l-.18.08V0Z'/%3E%3Cpath class='cls-3' d='M2.86,12.91c0-.11.1-.11.16-.14L10,9.09,10.14,9v3.9Z'/%3E%3Cpath class='cls-3' d='M14.29,12.91V9l3.14,1.66,3.81,2c.12.06.27.08.33.23Z'/%3E%3Cpath class='cls-1' d='M24.34,0c-.93.57-1.9,1-2.85,1.54C20,2.36,18.43,3.15,16.91,4a2.32,2.32,0,0,1-1.38.33c-.31,0-.62,0-.93,0,0-.2.19-.17.28-.23l7.49-4c.05,0,.12,0,.13-.12Z'/%3E%3Cpath class='cls-1' d='M.09,12.91C1,12.33,2,11.87,3,11.35c1.53-.82,3.08-1.62,4.61-2.45a2,2,0,0,1,1.2-.3,9.51,9.51,0,0,1,1.05.06l-1.29.69L2.23,12.69c-.1.06-.24.08-.3.22Z'/%3E%3Cpath class='cls-3' d='M0,1.46,5.29,4.23V4.3H0Z'/%3E%3Cpath class='cls-3' d='M24.41,4.3H19.16l0-.07,5.28-2.77Z'/%3E%3Cpath class='cls-3' d='M0,8.61H5.27l0,.07L0,11.45Z'/%3E%3Cpath class='cls-3' d='M24.41,11.45,19.14,8.68V8.61h5.26Z'/%3E%3Cpath class='cls-1' d='M.09,0C.93.54,1.83,1,2.7,1.42c1.69.91,3.39,1.8,5.09,2.7A1,1,0,0,1,8,4.27a4.36,4.36,0,0,1-2.43-.34C3.75,2.89,1.87,2,0,1,.06.65-.07.31.09,0Z'/%3E%3Cpath class='cls-1' d='M24.34,12.91c-.84-.54-1.74-.95-2.61-1.42-1.69-.91-3.39-1.8-5.09-2.7a1,1,0,0,1-.22-.15A4.36,4.36,0,0,1,18.85,9c1.83,1,3.71,2,5.56,3C24.37,12.26,24.5,12.6,24.34,12.91Z'/%3E%3C/g%3E%3C/svg%3E")`;
  const englishHybridFlagSvg = `url("data:image/svg+xml,%3Csvg id='Calque_1' data-name='Calque 1' xmlns='http://www.w3.org/2000/svg' width='24.43' height='12.91' viewBox='0 0 24.39 12.88'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23bf2333;%7D.cls-2,.cls-4%7Bfill:%23fff;%7D.cls-3%7Bfill:%23223164;%7D.cls-4%7Bfill-rule:evenodd;%7D.cls-5%7Bfill:%23283575;%7D.cls-6%7Bfill:%23d0232e;%7D%3C/style%3E%3C/defs%3E%3Crect id='rect8767' class='cls-1' x='0.03' y='11.75' width='24.26' height='1.03'/%3E%3Crect id='rect8769' class='cls-2' x='0.03' y='10.72' width='24.26' height='1.03'/%3E%3Crect id='rect8771' class='cls-1' x='0.03' y='9.7' width='24.26' height='1.03'/%3E%3Crect id='rect8773' class='cls-2' x='0.03' y='8.68' width='24.26' height='1.03'/%3E%3Crect id='rect8775' class='cls-1' x='0.03' y='7.72' width='24.26' height='0.96'/%3E%3Crect id='rect8777' class='cls-2' x='0.03' y='6.76' width='24.26' height='0.96'/%3E%3Crect id='rect8779' class='cls-1' x='0.03' y='5.79' width='24.26' height='0.96'/%3E%3Crect id='rect8781' class='cls-2' x='0.03' y='4.83' width='24.26' height='0.96'/%3E%3Crect id='rect8783' class='cls-1' x='0.03' y='3.87' width='24.26' height='0.96'/%3E%3Crect id='rect8785' class='cls-2' x='0.03' y='2.92' width='24.26' height='0.96'/%3E%3Crect id='rect8787' class='cls-1' x='0.03' y='1.96' width='24.26' height='0.96'/%3E%3Crect id='rect8791' class='cls-2' x='0.03' y='0.99' width='24.26' height='0.96'/%3E%3Crect id='rect8793' class='cls-1' x='0.03' y='0.03' width='24.26' height='0.96'/%3E%3Crect id='rect8796' class='cls-3' x='0.03' y='0.03' width='9.73' height='6.72'/%3E%3Cpath id='path8825' class='cls-4' d='M.44,6H.72l.11-.28L.94,6h.28L1,6.14l.07.29L.83,6.28l-.24.16.06-.29Z'/%3E%3Cpath id='path8827' class='cls-4' d='M2,6h.28l.11-.28L2.54,6h.29l-.21.19.06.29-.24-.15-.23.16.06-.29Z'/%3E%3Cpath id='path8829' class='cls-4' d='M3.7,6H4l.11-.28L4.2,6h.29l-.22.19.07.29-.24-.2-.25.16.06-.29Z'/%3E%3Cpath id='path8831' class='cls-4' d='M5.3,6h.28l.11-.28L5.81,6h.28l-.21.19.06.29-.24-.2-.24.16.06-.29Z'/%3E%3Cpath id='path8833' class='cls-4' d='M6.9,6h.29l.1-.28L7.41,6h.28l-.21.19.07.29-.25-.2-.24.16.06-.29Z'/%3E%3Cpath id='path8835' class='cls-4' d='M8.57,6h.28L9,5.68,9.08,6h.27l-.16.19v.3L9,6.29l-.24.16.06-.29Z'/%3E%3Cpath id='path8837' class='cls-4' d='M1.27,5.32h.28L1.66,5l.12.27h.28l-.21.2.06.29-.24-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8839' class='cls-4' d='M.44,4.61H.72l.11-.28.11.28h.28L1,4.81l.07.29L.83,5l-.24.1.06-.29Z'/%3E%3Cpath id='path8841' class='cls-4' d='M1.27,4h.28l.11-.28L1.78,4h.28l-.21.2.06.29-.24-.15-.24.15.06-.29Z'/%3E%3Cpath id='path8843' class='cls-4' d='M.44,3.26H.72L.83,3l.11.26h.28L1,3.46l.07.29L.83,3.6l-.24.16.06-.29Z'/%3E%3Cpath id='path8845' class='cls-4' d='M1.27,2.63h.28l.11-.27.12.27h.28l-.21.2.06.28L1.67,3l-.24.15.06-.29Z'/%3E%3Cpath id='path8847' class='cls-4' d='M.44,1.93H.72l.11-.28.11.27h.28L1,2.11l.07.29L.83,2.25l-.24.16.06-.29Z'/%3E%3Cpath id='path8849' class='cls-4' d='M1.27,1.29h.28L1.66,1l.12.27h.28l-.21.2.06.29-.24-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8851' class='cls-4' d='M.44.58H.72L.83.3.94.58h.28L1,.78l.07.29L.83.92l-.24.15L.65.78Z'/%3E%3Cpath id='path8853' class='cls-4' d='M2.87,5.32h.28L3.25,5l.12.27h.28l-.21.2.07.29-.25-.15L3,5.81l0-.29Z'/%3E%3Cpath id='path8855' class='cls-4' d='M2,4.61h.28l.11-.28.11.28h.29l-.21.2.06.29L2.44,5l-.24.1.06-.29Z'/%3E%3Cpath id='path8857' class='cls-4' d='M2.87,4h.28l.1-.28L3.37,4h.28l-.21.2.07.29-.25-.15L3,4.46l0-.29Z'/%3E%3Cpath id='path8859' class='cls-4' d='M2,3.26h.28L2.43,3l.11.26h.29l-.21.2.06.29L2.44,3.6l-.24.16.06-.29Z'/%3E%3Cpath id='path8861' class='cls-4' d='M2.87,2.63h.28l.1-.27.12.27h.28l-.21.2.07.28L3.26,3,3,3.12l0-.29Z'/%3E%3Cpath id='path8863' class='cls-4' d='M2,1.93h.28l.11-.28.11.27h.29l-.21.19.06.29L2.4,2.25l-.23.2.06-.29Z'/%3E%3Cpath id='path8865' class='cls-4' d='M2.87,1.29h.28L3.25,1l.12.27h.28l-.21.2.07.29-.25-.15L3,1.78l0-.29Z'/%3E%3Cpath id='path8867' class='cls-4' d='M2,.58h.28L2.43.3l.11.28h.29l-.21.2.06.29L2.44.92l-.24.15L2.26.78Z'/%3E%3Cpath id='path8869' class='cls-4' d='M4.47,5.32h.28L4.86,5,5,5.31h.28L5,5.51l.07.29-.25-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8871' class='cls-4' d='M3.7,4.61H4l.11-.28.11.28h.29l-.22.2.07.29L4.1,5l-.25.15.06-.29Z'/%3E%3Cpath id='path8873' class='cls-4' d='M6.9,4.61h.29l.1-.28.12.28h.28l-.21.2.07.29L7.3,5l-.24.15.06-.29Z'/%3E%3Cpath id='path8875' class='cls-4' d='M5.3,4.61h.28l.11-.28.12.28h.28l-.21.2.06.29L5.7,5l-.24.15.06-.29Z'/%3E%3Cpath id='path8877' class='cls-4' d='M7.74,5.32H8L8.13,5l.11.27h.29l-.22.2.07.29-.24-.15-.25.16L8,5.52Z'/%3E%3Cpath id='path8879' class='cls-4' d='M6.13,5.32h.29L6.52,5l.12.27h.28l-.21.2.07.29-.25-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8881' class='cls-4' d='M3.7.58H4L4.09.3,4.2.58h.29l-.22.2.07.29L4.1.92l-.25.15L3.91.78Z'/%3E%3Cpath id='path8883' class='cls-4' d='M4.47,1.29h.28L4.86,1,5,1.28h.28L5,1.48l.07.29-.25-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8885' class='cls-4' d='M3.7,1.93H4l.11-.28.11.27h.29l-.22.19.07.29L4.1,2.25l-.25.16.06-.29Z'/%3E%3Cpath id='path8887' class='cls-4' d='M4.47,2.63h.28l.11-.27L5,2.63h.28L5,2.83l.07.28L4.86,3l-.24.15.06-.29Z'/%3E%3Cpath id='path8889' class='cls-4' d='M3.7,3.26H4L4.09,3l.11.26h.29l-.22.2.07.29L4.1,3.6l-.25.16.06-.29Z'/%3E%3Cpath id='path8891' class='cls-4' d='M4.47,4h.28l.11-.28L5,4h.28L5,4.17l.07.29-.25-.15-.24.15.06-.29Z'/%3E%3Cpath id='path8893' class='cls-4' d='M8.57,4.61h.28L9,4.33l.12.28h.27l-.2.2V5.1L9,5l-.24.15.06-.29Z'/%3E%3Cpath id='path8895' class='cls-4' d='M5.3,3.26h.28L5.69,3l.12.26h.28l-.21.2.06.29L5.7,3.6l-.24.16.06-.29Z'/%3E%3Cpath id='path8897' class='cls-4' d='M5.3.58h.28L5.69.3l.12.28h.28l-.21.2.06.29L5.7.92l-.24.15L5.52.78Z'/%3E%3Cpath id='path8899' class='cls-4' d='M5.3,1.93h.28l.11-.28.12.27h.28l-.21.19.06.29L5.7,2.25l-.24.16.06-.29Z'/%3E%3Cpath id='path8901' class='cls-4' d='M7.74,4H8l.11-.28L8.24,4h.29l-.22.2.07.29-.24-.15-.25.15L8,4.17Z'/%3E%3Cpath id='path8903' class='cls-4' d='M6.13,4h.29l.1-.28L6.64,4h.28l-.21.2.07.29-.25-.15-.24.15.06-.29Z'/%3E%3Cpath id='path8905' class='cls-4' d='M6.13,1.29h.29L6.52,1l.12.27h.28l-.21.2.07.29-.25-.15-.24.16.06-.29Z'/%3E%3Cpath id='path8907' class='cls-4' d='M6.13,2.63h.29l.1-.27.12.27h.28l-.21.2.07.28L6.53,3l-.24.15.06-.29Z'/%3E%3Cpath id='path8909' class='cls-4' d='M8.57,3.26h.28L9,3l.12.26h.27l-.16.18.06.29L9,3.58l-.24.16.06-.29Z'/%3E%3Cpath id='path8911' class='cls-4' d='M6.9,3.26h.29L7.29,3l.12.26h.28l-.21.2.07.29L7.3,3.6l-.24.16.06-.29Z'/%3E%3Cpath id='path8913' class='cls-4' d='M6.9.58h.29L7.29.3l.12.28h.28l-.21.2.07.29L7.3.92l-.24.15L7.12.78Z'/%3E%3Cpath id='path8915' class='cls-4' d='M6.9,1.93h.29l.1-.28.12.27h.28l-.21.19.07.29L7.3,2.25l-.24.16.06-.29Z'/%3E%3Cpath id='path8917' class='cls-4' d='M8.57.58h.28L9,.3l.12.28h.27l-.2.2v.29L9,.92l-.24.15,0-.29Z'/%3E%3Cpath id='path8919' class='cls-4' d='M7.74,1.29H8L8.13,1l.11.27h.29l-.22.2.07.29-.24-.15-.25.16L8,1.49Z'/%3E%3Cpath id='path8921' class='cls-4' d='M8.57,1.93h.28L9,1.65l.12.27h.27l-.2.19v.34L9,2.3l-.24.16.06-.29Z'/%3E%3Cpath id='path8923' class='cls-4' d='M7.74,2.63H8l.11-.27.11.27h.29l-.22.2.07.28L8.14,3l-.25.15L8,2.83Z'/%3E%3Cpath id='path3835' class='cls-2' d='M0,12.8,24.39.08V12.83Z'/%3E%3Cpath id='path3839' class='cls-5' d='M14.19,12.78V8.13h10.1v4.63Z'/%3E%3Cpath id='path3843' class='cls-5' d='M24.29.05,16,4.44h8.25Z'/%3E%3Cpath id='path3845' class='cls-5' d='M0,12.77l9.1-4.7h1.25v4.72Z'/%3E%3Cpath id='path3847' class='cls-2' d='M24.35,11.5v1.38H22.17L13.85,8.52l.09-.61,3.69.1Z'/%3E%3Cpath id='path3855' class='cls-2' d='M24.37,0,15.82,4.54l2.65.06,5.85-3.15Z'/%3E%3Cpath id='path3859' class='cls-2' d='M0,12.77,9.51,7.85h1v.93l-7.46,4Z'/%3E%3Cpath id='path4355' class='cls-6' d='M0,12.77,9.36,7.92h1v.5L2.08,12.76Z'/%3E%3Cpath id='path4357' class='cls-6' d='M15.27,8l1.84.05,7.2,3.85v.84Z'/%3E%3Cpath id='path3058' class='cls-6' d='M24.29,7.44h-14L15,5.06h9.36Z'/%3E%3Cpath id='path3060' class='cls-6' d='M13.42,12.74V5.85L11,7.08v5.69Z'/%3E%3C/svg%3E")`;
  const {
    id,
    flagOn = frenchFlagSvg,
    flagOff = englishHybridFlagSvg,
    isChecked,
    ...rest
  } = props;

  return (
    // @ts-ignore
    <ToggleButton
      id={id}
      contentOn={flagOn}
      contentOff={flagOff}
      isChecked={isChecked}
      mode={'flip'}
      flipModeOptions={{
        useBackgroundColor: false,
      }}
      {...rest}
    />
  );
};

export default ToggleLanguagesButton;
