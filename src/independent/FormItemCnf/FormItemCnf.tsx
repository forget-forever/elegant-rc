import type { NamePath } from 'antd/lib/form/interface';
import { useMemo } from 'react';
import type { GetIProps } from 'elegant-rc';
import { FormContent } from '../../encapsulation';
import { useFormItemCnf, namePathHandle } from './context';

/**
 * 配置了一些方法的FormItem
 * @param props
 * @returns
 */
const FormItemCnf: React.FC<
  GetIProps<typeof FormContent> & {
    /** dependencies不会继承preName， 这个属性会，两个会拼接起来 */
    dependencyWithPreName?: NamePath[];
  }
> & {
  /** 路径处理函数 */
  namePathHandle: typeof namePathHandle;
} = (props) => {
  const {
    children,
    name,
    dependencies,
    dependencyWithPreName = [],
    ...resetProps
  } = props;
  const {
    preNamePath,
    dependencies: itemDepend,
    ...sourceProps
  } = useFormItemCnf();

  const nameCnfSource = useMemo(() => {
    const nameFix = namePathHandle(name);
    const namePre = namePathHandle(preNamePath);
    return [...namePre, ...nameFix];
  }, [name, preNamePath]);

  /** 优化一下防止重复渲染 */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nameCnf = useMemo(() => nameCnfSource, [nameCnfSource.join(',')]);

  const depend = useMemo(() => {
    return [
      ...(itemDepend || dependencies || []),
      ...dependencyWithPreName.map((ele) => {
        return [...namePathHandle(preNamePath), ...namePathHandle(ele)];
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify({
      dependencies,
      dependencyWithPreName,
      itemDepend,
      preNamePath,
    }),
  ]);

  return (
    <FormContent
      {...sourceProps}
      {...resetProps}
      name={nameCnf}
      dependencies={depend}
    >
      {children}
    </FormContent>
  );
};

FormItemCnf.namePathHandle = namePathHandle;

export default FormItemCnf;
