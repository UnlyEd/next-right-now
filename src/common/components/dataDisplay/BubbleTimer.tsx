import { CSSStyles } from '@/modules/core/css/types/CSSStyles';
import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import AnimatedTextBubble from '../animations/AnimatedTextBubble';

export type Props = {
  children: React.ReactElement;
  /**
   * @default 200
   */
  duration?: number;
  className?: string;
  style?: CSSStyles;
  fill?: string;
}

const BubbleTimer: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    duration = 200,
    ...rest
  } = props;
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timerFunction = setTimeout(() => setIsWaiting(false), duration);
    return (): void => clearTimeout(timerFunction); // See https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
  }, [duration]);

  return (
    <Fragment>
      {
        isWaiting ? (
          <AnimatedTextBubble {...rest} />
        ) : (
          <Fragment>
            {children}
          </Fragment>
        )
      }
    </Fragment>
  );
};

export default BubbleTimer;
