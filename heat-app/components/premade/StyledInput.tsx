import { useTheme } from '@emotion/react';
import { Input, InputProps } from 'components/common/Input';

export const StyledInput = ({ placeholder, ...rest }: InputProps) => {
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
