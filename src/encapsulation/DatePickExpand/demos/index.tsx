import { useState } from 'react';
import { DatePickerExpand } from 'elegant-rc';

export default () => {
  const [val, setVal] = useState('');
  return (
    <>
      <DatePickerExpand
        minDate="2022-10-24"
        maxDate="2022-12-10"
        disabledDates={[['2022-11-26', '2022-11-28']]}
        value={val}
        onChange={(v) => setVal(v || '')}
        valueFormat="YYYYMMDD"
      />
      {val}
    </>
  );
};
