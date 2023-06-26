import { useTheme } from '@emotion/react';
import { Input } from 'components/common/Input';
import { InputHTMLAttributes, forwardRef } from 'react';

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'xl' | 'lg' | 'sm';
  placeholder?: string;
}

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ placeholder, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <Input
        ref={ref}
        inputSize="xl"
        fontColor={theme.colors.mono.black}
        bgColor={theme.colors.mono.input_gray}
        placeholder={placeholder}
        paddingLeft="2.5rem"
        paddingRight="2.5rem"
        {...rest}
      />
    );
  },
);
