/*
 * @Author: zml
 * @Date: 2022-01-10 16:05:07
 * @LastEditTime: 2022-05-07 14:02:16
 */
import type { IRouteComponentProps, IRouteProps } from 'umi';
import type React from 'react';

export type GetIProps<T> = T extends React.FC<infer P> ? P : never;

export type FCProps<T = unknown> = React.FC<T & React.HTMLAttributes<T>>;

/**
 * 去除一个类型包含的void属性
 */
export type OmitVoid<T> = T | undefined extends infer R1 | undefined
  ? R1
  : T | null extends infer R2 | null
  ? R2
  : T;