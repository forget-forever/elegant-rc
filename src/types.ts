/*
 * @Author: zml
 * @Date: 2022-01-10 16:05:07
 * @LastEditTime: 2022-06-23 13:45:31
 */
import type React from 'react';

export type GetIProps<T> = T extends React.FC<infer P> ? P : never;

export type FCProps<T = unknown> = React.FC<T & React.HTMLAttributes<T>>;

export interface IOptions<T = string | number, U = string> {
  value: T;
  label: U;
}

/**
 * 去除一个类型包含的void属性
 */
export type OmitVoid<T> = T | undefined extends infer R1 | undefined
  ? R1
  : T | null extends infer R2 | null
  ? R2
  : T;

/**
 * 自己定义的Omit类型
 */
export type MyOmit<T, K extends keyof T> = Omit<T, K>;

export type FormProps<T, E = Record<string, never>> = {
  /** 数据改变的事件，由Form.Item注入 */
  onChange?: (val?: T) => void;
  /** 数据，由Form.Item注入 */
  value?: T;
} & E;

/**
 * 生成固定长度的数组
 * @return GenerateArr<1, [string]>:  [string]; GenerateArr<2, [string]>:  [string, string]
 */
export type GenerateArr<
  N extends number,
  ARR extends unknown[] = [],
> = ARR['length'] extends N ? ARR : GenerateArr<N, [...ARR, ARR[0]]>;

type T1 = GenerateArr<9, [string]>;
