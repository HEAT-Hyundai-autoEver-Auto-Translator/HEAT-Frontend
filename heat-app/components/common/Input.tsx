import styled from '@emotion/styled';

type InputProps = {
  bgColor?: string;
  fontColor?: string;
  inputSize: 'large' | 'small';
  fontWeight?: 'bold' | 'normal';
  placeholder?: string;
  paddingLeft?: string;
  paddingRight?: string;
  placeholderColor?: string;
};

export const Input = styled.input<InputProps>`
  width: ${({ inputSize }) => (inputSize === 'large' ? '40rem' : '20rem')};
  height: ${({ inputSize }) => (inputSize === 'large' ? '6rem' : '3rem')};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 20px;
  border: none;
  font-size: ${({ inputSize }) => (inputSize === 'large' ? '2rem' : '1rem')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  padding-left: ${({ paddingLeft }) => paddingLeft || '0px'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};

  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor || '#909090'};
  }
`;
