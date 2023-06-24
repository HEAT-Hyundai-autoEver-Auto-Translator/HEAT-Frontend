import styled from '@emotion/styled';

type ButtonProps = {
  bgColor?: string;
  fontColor?: string;
  size: 'large' | 'small';
  fontWeight?: 'bold' | 'normal';
  onClick: () => void;
};

export const Button = styled.button<ButtonProps>`
  width: ${({ size }) => (size === 'large' ? '40rem' : '20rem')};
  height: ${({ size }) => (size === 'large' ? '6rem' : '3rem')};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 10px;
  border: none;
  font-size: ${({ size }) => (size === 'large' ? '2rem' : '1rem')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  cursor: pointer;
`;
