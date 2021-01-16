import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import Btn from './Btn';

export type Props = {
  /**
   * React children, usually text.
   */
  children: ReactNode;
}

/**
 * A button with a Font-Awesome `link` icon as prefix.
 */
const LinkButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;
  return (
    <Btn>
      <FontAwesomeIcon icon="link" />
      {children}
    </Btn>
  );
};

export default LinkButton;
