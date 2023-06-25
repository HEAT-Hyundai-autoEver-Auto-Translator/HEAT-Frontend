import styled from '@emotion/styled';

type ButtonProps = {
  bgColor?: string;
  fontColor?: string;
  hoverColor?: string;
  size: 'large' | 'small';
  fontWeight?: 'bold' | 'normal';
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = styled.button<ButtonProps>`
  all: unset;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size === 'large' ? '40rem' : '20rem')};
  height: ${({ size }) => (size === 'large' ? '6rem' : '3rem')};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 10px;
  border: none;
  font-size: ${({ size }) => (size === 'large' ? '2rem' : '1rem')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ fontColor }) => fontColor || 'black'};
  transition: all 0.1s ease-in-out;

  --fillColor: ${({ bgColor }) => bgColor || 'gray'};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#003F7F'};
    --fillColor: ${({ hoverColor }) => hoverColor || '#003F7F'};
  }

  &:active {
    transform: scale(0.95);
  }

  &:active:after {
    transform: scale(1);
  }
`;
