import styled from '@emotion/styled';
import { InputProps } from './Input';

export type SelectProps = InputProps & {
  options?: string[];
};

export const Select = styled.select<SelectProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
    if (inputSize === 'lg') return '2rem';
    if (inputSize === 'sm') return '0.8rem';
    return '1rem';
  }};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  padding-left: ${({ paddingLeft }) => paddingLeft || '0px'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};
  &:focus {
    outline: none;
  }
`;
