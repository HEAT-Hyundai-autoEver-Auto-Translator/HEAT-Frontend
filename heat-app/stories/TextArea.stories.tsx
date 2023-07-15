import type { Meta, StoryObj } from '@storybook/react';
import {
  StyledTextarea,
  TextareaProps,
} from 'components/premade/StyledTextArea';

const meta: Meta<typeof StyledTextarea> = {
  title: 'Example/Textarea',
  component: StyledTextarea,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
    },
    borderColor: {
      control: 'color',
    },
    color: {
      control: 'color',
    },
    placeholder: {
      control: 'text',
    },
    placeholderColor: {
      control: 'color',
    },
    fontSize: {
      control: 'text',
    },
    mobileFontSize: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;

type TextareaStory = StoryObj<TextareaProps>;

export const InputTextarea: TextareaStory = {
  args: {
    bgColor: 'transparent',
    borderColor: '#003F7F',
    color: 'black',
    placeholder: 'Write something...',
    placeholderColor: 'gray',
    fontSize: '3rem',
    mobileFontSize: '1.5rem',
    value: 'Default Text',
  },
};

export const OutputTextarea: TextareaStory = {
  args: {
    bgColor: '#2D679B',
    borderColor: '#CBD5E0',
    color: 'white',
    placeholder: 'Write something...',
    placeholderColor: 'gray',
    fontSize: '3rem',
    mobileFontSize: '1.5rem',
    value: 'Default Text',
  },
};
