import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import Btn from './Btn';
import Tooltip from './Tooltip';
import EllipsisText from './EllipsisText';

type Props = {
  children: ReactNode;
}

const DocumentButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;

  return (
    <Tooltip
      overlay={<span>{children}</span>}
    >
      <Btn>
        <FontAwesomeIcon icon="file-alt" />
        <EllipsisText
          widthLarge={'200px'}
          forceSingleLine={true}
        >
          {children}
        </EllipsisText>
      </Btn>
    </Tooltip>
  );
};

export default DocumentButton;
