/*
 * @Author: zml
 * @Date: 2022-06-06 13:01:30
 * @LastEditTime: 2022-06-06 14:06:09
 */
import { GetIProps } from '../public';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button } from 'antd';

type IProps = Omit<GetIProps<typeof Button>, 'onClick'> & {
  /** 点击事件加上promise的处理 */
  onClick?: () => void | Promise<void>;
};
const ButtonAsync: React.FC<IProps> = (props) => {
  const { children, onClick, ...resetProps } = props;
  const [loading, setLoading] = useSafeState(false);
  const clickHandle = useMemoizedFn(async () => {
    const res = onClick?.();
    if (res instanceof Promise) {
      setLoading(true);
      try {
        await res;
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  });

  return (
    <Button loading={loading} onClick={clickHandle} {...resetProps}>
      {children}
    </Button>
  );
};

export default ButtonAsync;
