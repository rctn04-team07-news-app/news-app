import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const InputContext = React.createContext<
  | {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | undefined
>(undefined);

export function InputTextProvider(props: Props) {
  const { children } = props;

  const [value, setValue] = React.useState('');

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const _value = React.useMemo(() => ({ value, onChange }), [value]);

  return (
    <InputContext.Provider value={_value}>{children}</InputContext.Provider>
  );
}

export default function useTextInput() {
  const context = React.useContext(InputContext);

  if (context === undefined) {
    throw new Error('useTextInput must be used within InputTextProvider');
  }

  return context;
}
