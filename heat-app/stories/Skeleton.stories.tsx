import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonProps } from 'components/common/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Example/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
  },
};

export default meta;

type SkeletonStory = StoryObj<SkeletonProps>;

export const SmallSkeleton: SkeletonStory = {
  args: {
    height: '5rem',
    width: '10rem',
  },
};

export const MediumSkeleton: SkeletonStory = {
  args: {
    height: '5rem',
    width: '15rem',
  },
};

export const LargeSkeleton: SkeletonStory = {
  args: {
    height: '5rem',
    width: '25rem',
  },
};
