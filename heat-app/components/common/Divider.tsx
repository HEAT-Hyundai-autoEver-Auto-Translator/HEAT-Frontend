import styled from '@emotion/styled';

type DividerProps = Partial<{
  orientation: 'horizontal' | 'vertical';
  color: string;
  thickness: string;
  width: string;
  height: string;
}>;

/**
 * @description
 * div의 border를 이용하여 구현한 Divider
 * 수직 방향일 경우 left border를 사용하고 수평 방향일 경우 top border를 사용합니다.
 * 기본값은 수평 방향이며, 색상은 theme.colors.mono.gray100, 두께는 0.1rem입니다.
 * @param {DividerProps} props
 * orientation: horizontal | vertical
 * color: 색상
 * thickness: 두께
 */
export const Divider = styled.div<DividerProps>`
  width: ${({ orientation = 'horizontal', width }) =>
    orientation === 'horizontal' ? width : 'auto'};
  height: ${({ orientation = 'horizontal', height }) =>
    orientation === 'vertical' ? height : 'auto'};
  border-top: ${({
    orientation = 'horizontal',
    theme,
    color = theme.colors.mono.gray100,
    thickness = '0.1rem',
  }) => (orientation === 'horizontal' ? `${thickness} solid ${color}` : 0)};
  border-left: ${({
    orientation = 'horizontal',
    theme,
    color = theme.colors.mono.gray100,
    thickness = '0.1rem',
  }) => (orientation === 'vertical' ? `${thickness} solid ${color}` : 0)};
`;
