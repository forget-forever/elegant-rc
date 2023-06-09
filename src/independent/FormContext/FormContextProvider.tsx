import { useMemo } from 'react';
import type { FormContextType } from './context';
import { FormContextModule } from './context';

const FormContextProvider: React.FC<FormContextType> = (props) => {
  const { children, formRef, disabled } = props;
  const valueRef = useMemo(() => ({ formRef, disabled }), [disabled, formRef]);
  return (
    <FormContextModule.Provider value={valueRef}>
      {children}
    </FormContextModule.Provider>
  );
};

export default FormContextProvider;
