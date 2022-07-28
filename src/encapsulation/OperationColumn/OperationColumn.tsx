import React, { Fragment } from 'react';
import type { ButtonProps, PopconfirmProps } from 'antd';
import { Button, Divider, Popconfirm } from 'antd';

const btnStyle = { padding: 0 };

type IProps = {
  buttonPropList: {
    buttonProps: ButtonProps;
    popConfirmProps?: PopconfirmProps;
  }[];
};

const OperationColumn: React.FC<IProps> = (props) => {
  const { buttonPropList } = props;

  if (!Array.isArray(buttonPropList)) {
    return null;
  }

  return (
    <>
      {buttonPropList.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider type="vertical" />}
          {item.popConfirmProps ? (
            <Popconfirm {...item.popConfirmProps}>
              <Button style={btnStyle} {...item.buttonProps} />
            </Popconfirm>
          ) : (
            <Button style={btnStyle} {...item.buttonProps} />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default OperationColumn;
