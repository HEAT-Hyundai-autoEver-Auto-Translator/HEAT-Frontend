import styled from '@emotion/styled';

export type InputProps = {
  bgColor?: string;
  fontColor?: string;
  inputSize?: 'xl' | 'lg' | 'sm';
  fontWeight?: 'bold' | 'normal';
  placeholder?: string;
  paddingLeft?: string;
  paddingRight?: string;
  placeholderColor?: string;
};

export const Input = styled.input<InputProps>`
  width: ${({ inputSize }) => {
    if (inputSize === 'xl') return '60rem';
    if (inputSize === 'lg') return '40rem';
    return '20rem';
  }};
  height: ${({ inputSize }) => {
    if (inputSize === 'xl') return '7rem';
    if (inputSize === 'lg') return '6rem';
    return '3rem';
  }};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 20px;
  border: none;
  font-size: ${({ inputSize }) => {
    if (inputSize === 'xl') return '2.5rem';
    if (inputSize === 'lg') return '2.5rem';
    if (inputSize === 'sm') return '0.8rem';
    return '1rem';
  }};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  padding-left: ${({ paddingLeft }) => paddingLeft || '0px'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};

  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor || '#909090'};
  }
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: ${({ inputSize }) => {
      if (inputSize === 'xl') return '30rem';
      if (inputSize === 'lg') return '20rem';
      return '10rem';
    }};
    height: ${({ inputSize }) => {
      if (inputSize === 'xl') return '3.5rem';
      if (inputSize === 'lg') return '3rem';
      return '1.5rem';
    }};
    font-size: ${({ inputSize }) => {
      if (inputSize === 'xl') return '1.25rem';
      if (inputSize === 'lg') return '1.5rem';
      if (inputSize === 'sm') return '0.4rem';
      return '0.5rem';
    }};
    border-radius: 10px;
    padding-left: ${({ paddingLeft }) => paddingLeft || '0px'};
    padding-right: ${({ paddingRight }) => paddingRight || '0px'};
  }
}`;
