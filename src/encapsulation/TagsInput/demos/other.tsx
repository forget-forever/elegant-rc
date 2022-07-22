/*
 * @Author: zml
 * @Date: 2022-07-22 11:25:54
 * @LastEditTime: 2022-07-22 11:31:47
 */
import { useMemoizedFn } from 'ahooks';
import { Card } from 'antd';
import { useState } from 'react';
import TagsInput from '..';

export default () => {
  const [val, setVal] = useState<string[]>([]);

  const chagngeHandle = useMemoizedFn((res) => {
    console.log(res);
    setVal(res);
  });

  return (
    <Card title="其他用法">
      <TagsInput mode="tags" value={val} onChange={chagngeHandle} />

      {JSON.stringify(val)}
    </Card>
  );
};
