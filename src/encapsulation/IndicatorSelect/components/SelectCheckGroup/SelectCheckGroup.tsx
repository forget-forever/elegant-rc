import React from 'react';
import { Checkbox } from 'antd';
import SelectTooltip from '../SelectTooltip';
import { IIndicatorDetail, TDataSourceParams } from '../..';
import './index.css';

const CheckboxGroup = Checkbox.Group;

type IProps = {
  // eslint-disable-next-line no-undef
  generateText: (ele: { explain: string; groupby: string }) => JSX.Element;
  unionOfGroupFilter: string[];
  deliveryType: TDataSourceParams['deliveryType'];
  checkedValues: string[];
  onChange: (checkedValues: string[]) => void;
  selectsItem: IIndicatorDetail[];
};

const SelectCheckGroup: React.FC<IProps> = (props) => {
  const {
    generateText,
    unionOfGroupFilter,
    deliveryType,
    selectsItem,
    checkedValues,
    onChange,
  } = props;
  return (
    <CheckboxGroup
      className="checkGroup"
      onChange={(vals) => onChange(vals as string[])}
      value={checkedValues}
    >
      {selectsItem.map((item) => {
        const checked = checkedValues.includes(item.name);
        return (
          <Checkbox
            className="index"
            key={item.name}
            value={item.name}
            disabled={item?.getDisabled(unionOfGroupFilter)}
          >
            {item.show_name.length > 13
              ? `${item.show_name.slice(0, 12)}...`
              : item.show_name}
            <SelectTooltip
              checked={checked}
              deliveryType={deliveryType}
              generateText={generateText}
              item={item}
            />
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

export default SelectCheckGroup;
