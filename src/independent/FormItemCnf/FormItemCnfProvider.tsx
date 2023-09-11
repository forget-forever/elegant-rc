import { useMemo } from 'react';
import type { FormItemCnfType } from './context';
import { namePathHandle } from './context';
import { useFormItemCnf } from './context';
import { FormItemContext } from './context';

/**
 * 改变FormItem的一些配置方法, 可以注入一个preNamePath配合FormItemCnf去改变后面的Form.Item的name，加基础路径
 * @param props
 * @returns
 */
const FormItemCnfProvider: React.FC<
  FormItemCnfType & {
    /** 如果是FormItemCnfProvider嵌套，在FormItemCnfProvider设置extendsPreName允许嵌套 */
    extendsPreName?: boolean;
  }
> = (props) => {
  const {
    children,
    extendsPreName,
    preNamePath: preNameProps,
    ...resetProps
  } = props;
  const { preNamePath } = useFormItemCnf();

  const value = useMemo(() => {
    return {
      ...resetProps,
      preNamePath: extendsPreName
        ? [...namePathHandle(preNamePath), ...namePathHandle(preNameProps)]
        : preNameProps,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    extendsPreName,
    preNamePath,
    preNameProps,
    JSON.stringify(resetProps || {}),
  ]);

  return (
    <FormItemContext.Provider value={value}>
      {children}
    </FormItemContext.Provider>
  );
};

export default FormItemCnfProvider;
