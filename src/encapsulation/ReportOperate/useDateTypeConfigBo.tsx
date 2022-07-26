import { useEffect, useState } from 'react';
import { IDateTypeConfigBo, initDateTypeConfigBo } from './constant';

export default function useDateTypeConfigBo(
  value: IDateTypeConfigBo | undefined,
) {
  const [dateTypeConfigBo, setDateTypeConfigBo] =
    useState<IDateTypeConfigBo>(initDateTypeConfigBo);

  useEffect(() => {
    if (value) {
      setDateTypeConfigBo(value);
    }
  }, [JSON.stringify(value || null)]);

  return {
    dateTypeConfigBo,
    setDateTypeConfigBo,
  };
}
