import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import Btn from './Btn';

type Props = {
  children: ReactNode;
}

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
