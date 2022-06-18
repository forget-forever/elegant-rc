/*
 * @Author: zml
 * @Date: 2022-01-10 16:05:07
 * @LastEditTime: 2022-06-18 10:51:31
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
