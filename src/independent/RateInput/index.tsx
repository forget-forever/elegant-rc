import { useMemoizedFn } from 'ahooks';
import { InputNumber } from 'antd';
import { omit } from 'lodash';
import type { FormProps, GetIProps } from 'elegant-rc';

const RateInput: React.FC<
  FormProps<
    number,
    GetIProps<typeof InputNumber> & {
      /** 小数位数 */
      fixNum?: number;
    }
  >
> = (props) => {
  const { fixNum = 2, min, max, step } = props;

  const parser = useMemoizedFn((val?: string | number) => {
    if (val === 0) {
      return 0;
    }
    if (!val) {
      return '';
    }
    let res = parseFloat(Number(val.toString().trim()).toFixed(fixNum));
    const stepNumber = Number(step || 0);
    if (step && !Number.isNaN(stepNumber)) {
      res = parseInt(`${res / stepNumber}`, 10) * stepNumber;
    }
    if (typeof min === 'number' && res < min) {
      return min;
    }
    if (typeof max === 'number' && res > max) {
      return max;
    }
    return res;
  });

  return (
    <InputNumber
      placeholder="请输入"
      parser={parser}
      {...omit(props, 'fixNum')}
    />
  );
};

export default RateInput;
