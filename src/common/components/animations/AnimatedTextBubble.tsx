import {
  css,
  useTheme,
} from '@emotion/react';
import React from 'react';

export type Props = {
  /**
   * Color of the dots.
   *
   * @default
   */
  fill?: string;
};

const AnimatedTextBubble = (props: Props) => {
  const theme = useTheme();
  const { surfaceColor } = theme;

  return (
    <div
      style={{
        width: '100%',
        marginLeft: '20px',
      }}
    >
      <svg
        viewBox="0 0 33 21" width="50px" {...props}
        css={css`
          @keyframes levitate {
            0% {
              transform: translateY(0px);
            }
            15% {
              transform: translateY(-4px);
            }
            30% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .levitate {
            animation: levitate 1s ease-in-out infinite;
          }

          .delay-100ms {
            animation-delay: 100ms;
          }

          .delay-200ms {
            animation-delay: 200ms;
          }
        `}
      >
        <path
          d="M.009 20.194h20.743c5.257 0 9.52-4.262 9.52-9.52 0-5.257-4.262-9.52-9.52-9.52H9.529c-5.257 0-9.52 4.262-9.52 9.52v9.52z"
          fill={surfaceColor}
        />
        <circle cx={21.498} cy={11.796} r={2.153} className="levitate delay-200ms" />
        <circle cx={14.705} cy={11.796} r={2.153} className="levitate delay-100ms" />
        <circle cx={7.911} cy={11.796} r={2.153} className="levitate" />
      </svg>
    </div>
  );
};

export default AnimatedTextBubble;
