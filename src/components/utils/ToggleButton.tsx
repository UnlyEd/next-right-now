import { css } from '@emotion/core';
import React from 'react';

type Props = {
  id: string;
  mode?: 'light' | 'ios' | 'skewed' | 'flat' | 'flip';
  flipModeOptions?: {
    useBackgroundColor?: boolean;
  };
  valueOn: any;
  valueOff: any;
  isChecked?: boolean;
} & React.HTMLProps<HTMLSpanElement>;

/**
 * Toggle button (as checkbox) between two possible values.
 *
 * @param props
 * @see https://codepen.io/mallendeo/pen/eLIiG
 */
const ToggleButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    id,
    mode = 'flip',
    flipModeOptions = {
      useBackgroundColor: false,
    },
    valueOn,
    valueOff,
    isChecked,
    ...rest
  } = props;

  return (
    <span
      css={css`
        .tgl {
          display: none;

          // add default box-sizing for this scope
          &,
            &:after,
            &:before,
          & *,
            & *:after,
            & *:before,
          & + .tgl-btn {
              box-sizing: border-box;
            &::selection {
              background: none;
            }
          }

          + .tgl-btn {
            outline: 0;
            display: block;
            width: 4em;
            height: 2em;
            position: relative;
            cursor: pointer;
            user-select: none;

            &:after,
                &:before {
              position: relative;
              display: block;
              content: "";
              width: 50%;
              height: 100%;
            }

            &:after {
              left: 0;
            }

            &:before {
              display: none;
            }
          }

          &:checked + .tgl-btn:after {
            left: 50%;
          }
        }

        // themes
        .tgl-light {
          + .tgl-btn {
            background: #f0f0f0;
            border-radius: 2em;
            padding: 2px;
            transition: all .4s ease;

            &:after {
              border-radius: 50%;
              background: #fff;
              transition: all .2s ease;
            }
          }

          &:checked + .tgl-btn {
            background: #9FD6AE;
          }
        }

        .tgl-ios {
          + .tgl-btn {
            background: #fbfbfb;
            border-radius: 2em;
            padding: 2px;
            transition: all .4s ease;
            border: 1px solid #e8eae9;

            &:after {
              border-radius: 2em;
              background: #fbfbfb;
              transition:
                left .3s cubic-bezier(
                  0.175, 0.885, 0.320, 1.275
                ),
                padding .3s ease, margin .3s ease;
              box-shadow:
                0 0 0 1px rgba(0,0,0,.1),
                0 4px 0 rgba(0,0,0,.08);
            }

            &:hover:after {
              will-change: padding;
            }

            &:active {
              box-shadow: inset 0 0 0 2em #e8eae9;

              &:after {
                padding-right: .8em;
              }
            }
          }

          &:checked + .tgl-btn {
              background: #86d993;

              &:active {
                box-shadow: none;
                &:after {
                  margin-left: -.8em;
                }
              }
          }
        }

        .tgl-skewed {
          + .tgl-btn {
            overflow: hidden;
            transform: skew(-10deg);
            backface-visibility: hidden;
            transition: all .2s ease;
            font-family: sans-serif;
            background: #888;

            &:after,
            &:before {
              transform: skew(10deg);
              display: inline-block;
              transition: all .2s ease;
              width: 100%;
              text-align: center;
              position: absolute;
              line-height: 2em;
              font-weight: bold;
              color: #fff;
              text-shadow: 0 1px 0 rgba(0,0,0,.4);
            }

            &:after {
              left: 100%;
              content: ${valueOn};
            }

            &:before {
              left: 0;
              content: ${valueOff};
            }

            &:active {
              background: #888;

              &:before {
                left: -10%;
              }
            }
          }

          &:checked + .tgl-btn {
            background: #86d993;
            &:before {
              left: -100%;
            }

            &:after {
              left: 0;
            }

            &:active:after {
              left: 10%;
            }
          }
        }

        .tgl-flat {
          + .tgl-btn {
            padding: 2px;
            transition: all .2s ease;
            background: #fff;
            border: 4px solid #f2f2f2;
            border-radius: 2em;

            &:after {
              transition: all .2s ease;
              background: #f2f2f2;
              content: "";
              border-radius: 1em;
            }
          }

          &:checked + .tgl-btn {
            border: 4px solid #7FC6A6;

            &:after {
              left: 50%;
              background: #7FC6A6;
            }
          }
        }

        .tgl-flip {
          + .tgl-btn {
            padding: 2px;
            transition: all .2s ease;
            font-family: sans-serif;
            perspective: 100px;

            &:after,
            &:before {
              display: inline-block;
              transition: all .4s ease;
              width: 100%;
              text-align: center;
              position: absolute;
              line-height: 2em;
              font-weight: bold;
              color: #fff;
              top: 0;
              left: 0;
              backface-visibility: hidden;
              border-radius: 4px;
            }

            &:after {
              content: ${valueOn};
              background: ${flipModeOptions?.useBackgroundColor ? '#02C66F' : 'initial'};
              transform: rotateY(-180deg);
            }

            &:before {
              background: ${flipModeOptions?.useBackgroundColor ? '#FF3A19' : 'initial'};
              content: ${valueOff};
            }

            &:active:before {
              transform: rotateY(-20deg);
            }
          }

          &:checked + .tgl-btn {
            &:before {
              transform: rotateY(180deg);
            }

            &:after {
              transform: rotateY(0);
              left: 0;
              background: ${flipModeOptions?.useBackgroundColor ? '#7FC6A6' : 'initial'};
            }

            &:active:after {
              transform: rotateY(20deg);
            }
          }
        }
      `}
      {...rest}
    >
      <input
        id={id}
        className={`tgl tgl-${mode}`}
        type={`checkbox`}
        defaultChecked={isChecked}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={id}
        className={`tgl-btn`}
      />
    </span>
  );
};

export default ToggleButton;
