import { useMemo } from 'react';
import type { GetIProps } from 'elegant-rc';
import { FormContent } from '../../encapsulation';
import { useFormItemCnf, namePathHandle } from './context';

/**
 * 配置了一些方法的FormItem
 * @param props
 * @returns
 */
const FormItemCnf: React.FC<GetIProps<typeof FormContent>> & {
  /** 路径处理函数 */
  namePathHandle: typeof namePathHandle;
} = (props) => {
  const { children, name, ...resetProps } = props;
  const { preNamePath, ...sourceProps } = useFormItemCnf();

  const nameCnfSource = useMemo(() => {
    const nameFix = namePathHandle(name);
    const namePre = namePathHandle(preNamePath);
    return [...namePre, ...nameFix];
  }, [name, preNamePath]);

  /** 优化一下防止重复渲染 */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nameCnf = useMemo(() => nameCnfSource, [nameCnfSource.join(',')]);

  return (
    <FormContent {...sourceProps} {...resetProps} name={nameCnf}>
      {children}
    </FormContent>
  );
};

FormItemCnf.namePathHandle = namePathHandle;

export default FormItemCnf;
