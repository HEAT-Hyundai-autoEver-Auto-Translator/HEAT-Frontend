import styled from '@emotion/styled';
import { StackProps, VStack } from './Stack';

type BoxProps = StackProps &
  Partial<{
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    borderStyle:
      | 'solid'
      | 'dashed'
      | 'dotted'
      | 'double'
      | 'groove'
      | 'ridge'
      | 'inset'
      | 'outset'
      | 'none'
      | 'hidden';
  }>;

/**
 * @description
 * VStack을 상속받아 border 관련 props를 추가한 컴포넌트
 */
export const Box = styled(VStack)<BoxProps>`
  border-color: ${({ borderColor }) => borderColor};
  border-width: ${({ borderWidth }) => borderWidth};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-style: ${({ borderStyle }) => borderStyle};
`;
