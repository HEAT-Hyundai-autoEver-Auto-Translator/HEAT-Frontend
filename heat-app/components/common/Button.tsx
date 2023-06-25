import styled from '@emotion/styled';
type ButtonProps = {
  bgColor?: string;
  fontColor?: string;
  hoverColor?: string;
  size: 'lg' | 'sm' | 'xl' | 'xs';
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
  width: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '40rem';
      case 'sm':
        return '20rem';
      case 'xl':
        return '60rem';
      case 'xs':
        return '7rem';
      default:
        return '20rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '6rem';
      case 'sm':
        return '4rem';
      case 'xl':
        return '9rem';
      case 'xs':
        return '3rem';
      default:
        return '3rem';
    }
  }};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 10px;
  border: none;
  font-size: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '2rem';
      case 'sm':
        return '1.5rem';
      case 'xl':
        return '3rem';
      case 'xs':
        return '1.3rem';
      default:
        return '1rem';
    }
  }};
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
