import { useTheme } from '@emotion/react';
import { Input, InputProps } from 'components/common/Input';
import { InputHTMLAttributes } from 'react';

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'xl' | 'lg' | 'sm';
  placeholder?: string;
}

export const StyledInput = ({ placeholder, ...rest }: StyledInputProps) => {
  const theme = useTheme();

  return (
    <Input
      inputSize="xl"
      fontColor={theme.colors.mono.black}
      bgColor={theme.colors.mono.input_gray}
      placeholder={placeholder}
      paddingLeft="2.5rem"
      paddingRight="2.5rem"
      {...rest}
    />
  );
};
