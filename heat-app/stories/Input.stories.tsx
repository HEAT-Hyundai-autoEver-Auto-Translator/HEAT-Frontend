import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from 'components/common/Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
    },
    fontColor: {
      control: 'color',
    },
    inputSize: {
      options: ['xl', 'lg', 'sm'],
      control: { type: 'select' },
    },
    fontWeight: {
      options: ['bold', 'normal'],
      control: { type: 'select' },
    },
    placeholder: {
      control: 'text',
    },
    paddingLeft: {
      control: 'text',
    },
    paddingRight: {
      control: 'text',
    },
    placeholderColor: {
      control: 'color',
    },
  },
};

export default meta;

type InputStory = StoryObj<InputProps>;

export const LoginInput: InputStory = {
  args: {
    placeholder: 'ID / PW',
    bgColor: '#EDF2F7',
    fontColor: 'black',
    inputSize: 'lg',
    fontWeight: 'normal',
    paddingLeft: '20px',
    paddingRight: '20px',
    placeholderColor: '#909090',
  },
};

export const SearchInput: InputStory = {
  args: {
    placeholder: 'Username',
    bgColor: 'white',
    fontColor: 'black',
    inputSize: 'lg',
    fontWeight: 'normal',
    paddingLeft: '20px',
    paddingRight: '20px',
    placeholderColor: '#909090',
  },
};
