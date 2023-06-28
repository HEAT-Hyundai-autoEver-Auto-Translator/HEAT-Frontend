import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from './Text';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 100%;
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

  /* This will change the scrollbar's width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* This will change the handle (thumb) of the scrollbar */
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey; // Adjust the color to your liking
    border-radius: 10px;
  }

  /* This will change the track of the scrollbar */
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.mono.input_gray};
    margin: 10px;
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
  size?: 'xl' | 'lg' | 'sm';
  fontWeight?: 'bold' | 'normal';
  paddingLeft?: string;
  paddingRight?: string;
};

const DropdownButton = styled.button<DropdownButtonProps>`
  display: flex;
  align-items: center;
  width: ${({ size }) => {
    if (size === 'xl') return '60rem';
    if (size === 'lg') return '40rem';
    return '20rem';
  }};
  border-radius: 20px;
  border: none;
  height: ${({ size }) => {
    if (size === 'xl') return '7rem';
    if (size === 'lg') return '6rem';
    return '3rem';
  }};
  padding: 10px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || 'white'};
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
  onChange: (value: string) => void;
  size?: 'xl' | 'lg' | 'sm';
}

const Dropdown = ({
  options,
  value,
  onChange,
  size,
  placeholder = 'Select your first language',
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
        paddingLeft="2.5rem"
        paddingRight="2.5rem"
        size={size}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Text
          fontSize={isMobile ? '0.8rem' : '2rem'}
          color={displayValue === placeholder ? '#909090' : 'black'}
        >
          {displayValue}
        </Text>
      </DropdownButton>
      <DropdownMenu className={showDropdown ? 'show' : ''}>
        {options
          .filter(option => option.label !== placeholder)
          .map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              <Text fontSize={isMobile ? '0.8rem' : '2rem'}>
                {option.label}
              </Text>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;
