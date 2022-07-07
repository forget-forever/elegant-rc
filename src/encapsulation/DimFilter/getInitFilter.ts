import { IFilterChecked } from '../IndicatorSelect';
import { EDimType } from '../IndicatorSelect/enum';

let indicatorFilterId = 1;
export function getInitFilter(): IFilterChecked {
  indicatorFilterId += 1;
  return {
    key: '',
    judge: '=',
    value: [],
    id: indicatorFilterId,
    showSelect: true,
    type: EDimType.INPUT,
  };
}
