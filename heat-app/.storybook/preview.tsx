import { Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';
import { defaultTheme } from '../styles/defaultTheme';
import { global } from '../styles/global';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={defaultTheme}>
        <Global styles={[global]} />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
