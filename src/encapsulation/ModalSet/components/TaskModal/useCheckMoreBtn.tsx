import React, { useState } from 'react';
import { Button } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

export default function useCheckMoreBtn() {
  const [showSubTaskList, setShowSubTaskList] = useState(false);

  const checkMoreBtn = (
    <div className={'moreBtn'}>
      <Button
        icon={showSubTaskList ? <CaretUpOutlined /> : <CaretDownOutlined />}
        onClick={() => setShowSubTaskList(!showSubTaskList)}
      >
        {showSubTaskList ? '收起' : '查看更多'}
      </Button>
    </div>
  );

  return {
    checkMoreBtn,
    showSubTaskList,
  };
}
