type ErrorItem = { name: string[] | string; errors: string[] };

/**
 * 校验某个路径的输入是否合法
 * @param params 数据的值，form.validFields的reject返回的err
 * @param namePath 需要校验的值，如果是undefined、空数组那就回校验全部，有一项非法那就是false
 * @param nameSplit 路径的分割，默认是英文逗号,
 * @param inValidHandle 监测到不合法值的时候执行的函数, 如果返回的是false，那么就会忽略这项，继续检查
 * @returns 是否合法，合法true，非法false
 */
export const validFormData = (
  params: Promise<{ errorFields: ErrorItem[] }> | unknown | null | undefined,
  namePath?: (string[] | string)[],
  inValidHandle?: (err: string, item: ErrorItem) => void | boolean,
  nameSplit = ',',
  // eslint-disable-next-line max-params
) => {
  if (!params) {
    return true;
  }
  const { errorFields } = params as { errorFields: ErrorItem[] };
  if (!namePath?.length) {
    inValidHandle?.(errorFields[0].errors[0], errorFields[0]);
    return !errorFields?.length;
  }
  /** 先把检验的路径数组转成字符串形式 */
  const namePathUrl = namePath.map((item) => {
    return typeof item === 'string' ? item : item.join(nameSplit);
  });
  const inValid = errorFields.some((ele) => {
    const { name, errors = [] } = ele;
    if (!errors.length) {
      return false;
    }
    /** 校验是不是有某个namePath在其中 */
    return namePathUrl.some((item) => {
      const eleStr = typeof name === 'string' ? name : name.join(nameSplit);
      if (eleStr.indexOf(item) === 0) {
        return inValidHandle?.(errors[0], ele) ?? true;
      }
      return false;
    });
  });

  return !inValid;
};
