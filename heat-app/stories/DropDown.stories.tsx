import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownProps } from 'components/common/DropDown';

const meta: Meta<typeof Dropdown> = {
  title: 'Example/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    options: {
      control: { type: 'object' },
    },
    value: {
      control: 'text',
    },
    paddingLeft: {
      control: 'text',
    },
    paddingRight: {
      control: 'text',
    },
    size: {
      options: ['xl', 'lg', 'sm', 'xs'],
      control: { type: 'select' },
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;

type DropdownStory = StoryObj<DropdownProps>;

const LanguageOptions = [
  { label: 'Korean', value: 'Korean' },
  { label: 'English', value: 'English' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Arabic', value: 'Arabic' },
];

const SortOptions = [
  { label: 'NEW', value: 'NEW' },
  { label: 'OLD', value: 'OLD' },
];

export const LanguageDropdown: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    options: LanguageOptions,
    value: '',
    paddingLeft: '20px',
    paddingRight: '20px',
    size: 'lg',
  },
};

export const SortDropdown: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    options: SortOptions,
    value: '',
    paddingLeft: '20px',
    paddingRight: '20px',
    size: 'xs',
  },
};
