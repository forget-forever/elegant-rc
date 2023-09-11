import { createContext, useContext } from 'react';
import type { FormContent, GetIProps } from 'elegant-rc';

export const namePathHandle = (name?: FormItemCnfType['preNamePath']) => {
  if (!name && name !== 0) {
    return [];
  }
  if (Array.isArray(name)) {
    return name;
  }
  return [name];
};

export type FormItemCnfType = {
  /**
   * 根路径, 后面的FormItem都会在前面拼接上这个路径
   * @attention 如果是FormItemCnfProvider嵌套，在FormItemCnfProvider设置extendsPreName允许嵌套
   */
  preNamePath?: (string | number)[] | string | number;
} & GetIProps<typeof FormContent>;

export const FormItemContext = createContext<FormItemCnfType>({
  preNamePath: [],
});

export const useFormItemCnf = () => {
  const { preNamePath, ...resetProps } = useContext(FormItemContext);
  return { preNamePath: namePathHandle(preNamePath), ...resetProps };
};
