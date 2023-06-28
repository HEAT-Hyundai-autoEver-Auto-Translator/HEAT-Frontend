import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from './Text';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import ArrowDownIcon from '@/../public/ArrowDownIcon.svg';
const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownMenu = styled.ul<DropdownButtonProps>`
  position: absolute;
  width: ${({ size }) => {
    if (size === 'xl') return '60rem';
    if (size === 'lg') return '40rem';
    if (size === 'sm') return '20rem';
    if (size === 'xs') return '14rem';
  }};
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 5px;

  background-color: ${({ theme }) => theme.colors.mono.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.mono.gray200};
  display: none;
  &.show {
    display: block;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey; // Adjust the color to your liking
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
    margin: 10px;
    border-radius: 10px;
  }
`;

const DropdownItem = styled.li`
  padding: 10px;
  padding-left: 20px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
  }
`;

export type DropdownButtonProps = {
  bgColor?: string;
  fontColor?: string;
  size?: 'xl' | 'lg' | 'sm' | 'xs';
  fontWeight?: 'bold' | 'normal';
  paddingLeft?: string;
  paddingRight?: string;
};

const DropdownButton = styled.button<DropdownButtonProps>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: ${({ size }) => {
    if (size === 'xs') return '5px';
    return '20px';
  }};

  padding: 10px;
  cursor: pointer;
  width: ${({ size }) => {
    if (size === 'xl') return '60rem';
    if (size === 'lg') return '40rem';
    if (size === 'sm') return '20rem';
    if (size === 'xs') return '14rem'; // sm의 70%
  }};

  height: ${({ size }) => {
    if (size === 'xl') return '7rem';
    if (size === 'lg') return '6rem';
    if (size === 'sm') return '3rem';
    if (size === 'xs') return '2.5rem';
  }};

  background-color: ${({ bgColor, size }) =>
    size === 'xs' ? 'white' : bgColor || 'white'};
  border: ${({ size }) => (size === 'xs' ? '1px solid gray' : 'none')};

  font-size: ${({ size }) => {
    if (size === 'xl') return '2.5rem';
    if (size === 'lg') return '2rem';
    if (size === 'sm') return '0.8rem';
    if (size === 'xs') return '1.3rem';
  }};
  color: ${({ fontColor }) => fontColor || 'black'};
  font-size: ${({ size }) => {
    if (size === 'xl') return '2.5rem';
    if (size === 'lg') return '2rem';
    if (size === 'sm') return '0.8rem';
    return '1rem';
  }};
  text-align: left;
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  padding-left: ${({ paddingLeft }) => paddingLeft || '0px'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};
`;

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  placeholder?: string;
  options: Option[];
  value: string;
  paddingLeft?: string;
  paddingRight?: string;
  onChange: (value: string) => void;
  size?: 'xl' | 'lg' | 'sm' | 'xs';
}

const Dropdown = ({
  options,
  value,
  onChange,
  size,
  placeholder = 'Select your first language',
  paddingLeft = '2.5rem',
  paddingRight = '2.5rem',
}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setShowDropdown(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <DropdownWrapper>
      <DropdownButton
        bgColor={theme.colors.mono.input_gray}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        size={size}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Text
          fontSize={size === 'xs' ? '1.3rem' : isMobile ? '0.8rem' : '2rem'}
          color={displayValue === placeholder ? '#909090' : 'black'}
        >
          {displayValue}
        </Text>
        <StyledArrowDownIcon
          open={showDropdown}
          isMobile={isMobile}
          size={size}
        />
      </DropdownButton>
      <DropdownMenu className={showDropdown ? 'show' : ''} size={size}>
        {options
          .filter(option => option.label !== placeholder)
          .map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              <Text
                fontSize={
                  size === 'xs' ? '1.3rem' : isMobile ? '0.8rem' : '2rem'
                }
              >
                {option.label}
              </Text>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;

interface StyledArrowDownIconProps {
  open: boolean;
  isMobile?: boolean;
  size?: 'xl' | 'lg' | 'sm' | 'xs';
}

const StyledArrowDownIcon = styled(ArrowDownIcon, {
  shouldForwardProp: prop => prop !== 'isMobile',
})<StyledArrowDownIconProps>`
  position: absolute;
  left: auto;
  right: ${({ size, isMobile }) =>
    isMobile || size === 'xs' ? '10px' : '15px'};
  top: ${({ isMobile, size }) => (isMobile || size === 'xs' ? '38%' : '45%')};
  width: ${({ isMobile }) => (isMobile ? '8.4px' : '12px')};
  height: ${({ isMobile }) => (isMobile ? '5.6px' : '8px')};
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s ease-in-out;
`;
