import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from 'components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
    },
    fontColor: {
      control: 'color',
    },
    hoverColor: {
      control: 'color',
    },
    size: {
      options: ['lg', 'sm', 'xl', 'xs', 'xxs'],
      control: { type: 'select' },
    },
    fontWeight: {
      options: ['bold', 'normal'],
      control: { type: 'select' },
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type ButtonStory = StoryObj<ButtonProps>;

export const StartButton: ButtonStory = {
  args: {
    children: 'START',
    bgColor: '#3182CE',
    fontColor: 'white',
    hoverColor: '#2D679B',
    size: 'lg',
    fontWeight: 'normal',
    type: 'button',
  },
};

export const LoginButton: ButtonStory = {
  args: {
    children: 'Login',
    bgColor: '#3182CE',
    fontColor: 'white',
    hoverColor: '#2D679B',
    size: 'lg',
    fontWeight: 'normal',
    type: 'button',
  },
};

export const GoogleLoginButton: ButtonStory = {
  args: {
    children: 'Google Login',
    bgColor: '#FF8944',
    fontColor: 'black',
    hoverColor: '#BC5C24',
    size: 'lg',
    fontWeight: 'normal',
    type: 'button',
  },
};

export const SubmitButton: ButtonStory = {
  args: {
    children: 'Submit',
    bgColor: '#3182CE',
    fontColor: 'white',
    hoverColor: '#2D679B',
    size: 'xs',
    fontWeight: 'normal',
    type: 'button',
  },
};

export const ClearButton: ButtonStory = {
  args: {
    children: 'Clear',
    bgColor: 'lightgray',
    fontColor: 'black',
    hoverColor: 'darkgray',
    size: 'xs',
    fontWeight: 'normal',
    type: 'button',
  },
};
