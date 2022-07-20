import { useEffect } from 'react';
import { isEqual } from 'lodash';
import { TDataSourceParams } from '../../index';

type IArg = {
  setReportOrPreinstallValue: (v: number | undefined) => void;
  params: TDataSourceParams;
  paramsShadow: TDataSourceParams | undefined;
  initConfigId?: string | number;
  resetQueryOnParamChange: () => void;
};

export default function useQuerySetParam(arg: IArg) {
  const {
    setReportOrPreinstallValue,
    params,
    paramsShadow,
    initConfigId,
    resetQueryOnParamChange,
  } = arg;

  useEffect(() => {
    setReportOrPreinstallValue(Number(initConfigId) || undefined);
  }, [initConfigId]);

  useEffect(() => {
    if (!initConfigId) {
      return;
    }
    if (!paramsShadow) {
      return;
    }
    const flag = isEqual(
      {
        ...params.json,
        daterange: undefined,
        where: params.json.where.map(({ key, judge, value }) => ({
          key,
          judge,
          value,
        })),
        whereMeasures: params.json.whereMeasures.map(({ key, judge }) => ({
          key,
          judge,
        })),
      },
      {
        ...paramsShadow.json,
        daterange: undefined,
        where: paramsShadow.json.where.map(({ key, judge, value }) => ({
          key,
          judge,
          value,
        })),
        whereMeasures: paramsShadow.json.whereMeasures.map(
          ({ key, judge }) => ({ key, judge }),
        ),
      },
    );
    if (!flag) {
      setReportOrPreinstallValue(undefined);
      resetQueryOnParamChange();
    }
  }, [params, paramsShadow, initConfigId]);
}
