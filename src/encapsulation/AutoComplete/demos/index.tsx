/*
 * @Author: zml
 * @Date: 2022-07-01 19:21:06
 * @LastEditTime: 2022-07-01 19:28:54
 */
import { useMemoizedFn } from 'ahooks';
import { AutoComplete, Prominent } from 'elegant-rc';

const options = [
  { label: 'city', value: 'city' },
  { label: 'province', value: 'provice' },
  { label: 'area', value: 'area' },
];

export default () => {
  const searchHandle = useMemoizedFn((val: string) => {
    return options
      .filter(({ label }) => label.includes(val))
      .map((item) => ({
        ...item,
        label: <Prominent vals={[val]} str={item.label} />,
      }));
  });

  return (
    <AutoComplete
      backfill
      showSearch
      placeholder="请输入字段关系"
      onSearch={searchHandle}
      placement="bottomRight"
    />
  );
};
