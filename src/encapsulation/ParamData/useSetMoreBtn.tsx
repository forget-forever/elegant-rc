import React, { useState } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export function useSetMoreBtn() {
  const [showSetMore, setShowSetMore] = useState(false);
  const setMoreBtn = (
    <div>
      <Button
        type="text"
        icon={showSetMore ? <UpOutlined /> : <DownOutlined />}
        onClick={() => setShowSetMore(!showSetMore)}
      >
        {showSetMore ? '收起' : '更多设置'}
      </Button>
    </div>
  );
  return {
    showSetMore,
    setMoreBtn,
  };
}
