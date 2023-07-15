import type { Meta, StoryObj } from '@storybook/react';
import Avatar, { AvatarProps } from 'components/common/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Example/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type AvatarStory = StoryObj<AvatarProps>;

export const SmallAvatar: AvatarStory = {
  args: {
    size: 'sm',
    src: '/default-avatar.png',
    alt: 'Small Avatar',
  },
};

export const MediumAvatar: AvatarStory = {
  args: {
    size: 'md',
    src: '/default-avatar.png',
    alt: 'Medium Avatar',
  },
};

export const LargeAvatar: AvatarStory = {
  args: {
    size: 'lg',
    src: '/default-avatar.png',
    alt: 'Large Avatar',
  },
};
