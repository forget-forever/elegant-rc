import type { FormInstance } from 'antd';
import { createContext, useContext } from 'react';

// 不要盲目扩展属性啦，再多就感觉有点滥用了
export type FormContextType<T = any> = {
  /** form实例 */
  formRef?: FormInstance;
  /** 是否设置成禁用状态 */
  disabled?: boolean;
};

export const FormContextModule = createContext<FormContextType>({});

/**
 * 获取表单实例
 * @returns
 */
export const useContextForm = <T = any>() => {
  const { formRef, disabled } = useContext(FormContextModule);
  return { formRef: formRef, disabled } as FormContextType<T>;
};
