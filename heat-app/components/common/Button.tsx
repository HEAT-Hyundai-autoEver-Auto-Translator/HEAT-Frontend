import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
type ButtonProps = {
  bgColor?: string;
  fontColor?: string;
  hoverColor?: string;
  size: 'lg' | 'sm' | 'xl' | 'xs' | 'xxs';
  fontWeight?: 'bold' | 'normal';
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export const ButtonBase = styled.button<ButtonProps>`
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
        return '10rem';
      case 'xxs':
        return '6.5rem';
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
      case 'xxs':
        return '2rem';
      default:
        return '3rem';
    }
  }};
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '8px';
      case 'xxs':
        return '7px';
      default:
        return '10px';
    }
  }};
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
        return '1.5rem';
      case 'xxs':
        return '1rem';
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

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '20rem';
        case 'sm':
          return '10rem';
        case 'xl':
          return '30rem';
        case 'xs':
          return '7rem';
        case 'xxs':
          return '7.5rem';
        default:
          return '10rem';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '3rem';
        case 'sm':
          return '2rem';
        case 'xl':
          return '4.5rem';
        case 'xs':
          return '2rem';
        case 'xxs':
          return '1.5rem';
        default:
          return '1.5rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'lg':
          return '1rem';
        case 'sm':
          return '0.75rem';
        case 'xl':
          return '1.5rem';
        case 'xs':
          return '0.5rem';
        case 'xxs':
          return '0.5rem';
        default:
          return '0.5rem';
      }
    }};
    border-radius: ${({ size }) => (size === 'xxs' ? '3.5px' : '5px')};
  }
`;

export const Button = (props: ButtonProps) => {
  const theme = useTheme();
  return (
    <ButtonBase
      bgColor={theme.colors.primary.semi_light}
      fontColor={theme.colors.mono.white}
      hoverColor={theme.colors.primary.semi_dark}
      type={props.type || 'button'}
      {...props}
    >
      {props.children}
    </ButtonBase>
  );
};
