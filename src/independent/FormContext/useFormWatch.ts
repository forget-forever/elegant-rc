import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import { useContextForm } from './context';
import { namePathHandle, useFormItemCnf } from '../FormItemCnf';

/**
 * 监听数据变化的hook
 * @param name 监听路径
 * @param hidePre 是否要隐藏FormItemCnfProvider透传的name前缀
 * @returns 监听的值
 */
const useFormWatch = (name: NamePath, hidePre?: boolean) => {
  const { formRef } = useContextForm();
  const { preNamePath } = useFormItemCnf();
  let namePath = [...namePathHandle(preNamePath), ...namePathHandle(name)];
  if (hidePre) {
    namePath = [...namePathHandle(name)];
  }
  return Form.useWatch(namePath, formRef);
};

export default useFormWatch;
