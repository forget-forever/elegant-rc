import { TDataSourceParams } from '../../../IndicatorSelect';

const compactParamsJson = (
  json: Required<TDataSourceParams>['json'],
): Required<TDataSourceParams>['json'] => {
  return {
    ...json,
    where: json.where.filter((e) => e.key && e.value.length > 0),
    whereMeasures: json.whereMeasures.filter(
      (e) => e.value !== undefined && e.key,
    ),
    orderMeasures: json.orderMeasures.filter(
      (e) => e.key,
    ) as Required<TDataSourceParams>['json']['orderMeasures'],
  };
};

export default compactParamsJson;
