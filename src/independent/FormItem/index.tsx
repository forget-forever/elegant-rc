import type { ColProps } from 'antd';
import type { Rule } from 'antd/lib/form';
import type { PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import type { GetIProps } from 'elegant-rc';

const FormItem = <
  T extends React.FC<{
    colProps?: ColProps | undefined;
    placeholder?: string | string[];
    label?: string | ReactNode;
    rules?: Rule[];
  }>,
>(
  props: PropsWithChildren<
    {
      /** 需要渲染的组件 */
      Component: T;
      /** 占用的col格子数，默认是8格 */
      span?: number;
      /** 是否必须，如果传了这个之后就会自动添加rule，如果required是字符串，会写入message */
      required?: boolean | string;
    } & Omit<GetIProps<T>, 'required'>
  >,
) => {
  const {
    Component,
    span = 8,
    colProps,
    rules,
    required,
    ...resetProps
  } = props;
  const colPropsConfig = useMemo<ColProps>(
    () => ({
      span,
      ...colProps,
    }),
    [colProps, span],
  );

  const placeholder =
    props.placeholder ??
    `${/select/i.test(Component.name) ? '请选择' : '请输入'}${
      props.label || ''
    }`;

  const rulesConf = useMemo(() => {
    const res: Rule[] = rules || [];
    if (required) {
      let message = `${props.label || '该字段'}不能为空`;
      if (typeof required === 'string') {
        message = required;
      }
      res.push({ message, required: true });
    }
    return res;
  }, [props.label, required, rules]);

  return (
    /** @ts-ignore */
    <Component
      colProps={colPropsConfig}
      placeholder={placeholder}
      rules={rulesConf}
      {...resetProps}
    />
  );
};

export default FormItem;
