import { css } from '@emotion/react';
import styled from '@emotion/styled';

type StackProps = Partial<{
  w: string;
  h: string;
  spacing: string;
  alignItems: string;
  justifyContent: string;
  wrap: string;
}>;

const stack = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HStack = styled.div<StackProps>`
  ${stack}
  flex-direction: row;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ spacing = '0' }) => spacing};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
`;

export const VStack = styled.div<StackProps>`
  ${stack}
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ spacing = '0' }) => spacing};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
`;

/*
https://ipex.tistory.com/entry/CSS3-flex-Box-justifycontent-alignitems
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;

justyfy-content: 수평축 정렬
align-items: 수직축 정렬
단, flex-direction이 column이면 수평축이 수직축이 되고, 수직축이 수평축이 된다.
*/
