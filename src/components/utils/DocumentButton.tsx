import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import Btn from './Btn';
import EllipsisText from './EllipsisText';
import Tooltip from './Tooltip';

export type Props = {
  /**
   * React children, usually text.
   */
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
