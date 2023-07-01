import styled from '@emotion/styled';

type TextProps = Partial<{
  fontSize: string;
  mobileFontSize: string;
  fontWeight: number;
  color: string;
  selectable?: boolean;
}>;

export const Text = styled.p<TextProps>`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${({ theme, fontSize = theme.fonts.size.body }) => fontSize};
  font-weight: ${({ theme, fontWeight = theme.fonts.weight.regular }) =>
    fontWeight};
  color: ${({ theme, color }) => color || theme.colors.primary.default};
  line-height: 1.5;
  user-select: ${({ selectable = false }) =>
    selectable ? 'auto' : 'none'}; // 텍스트 드래그 제한
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: ${({ mobileFontSize, fontSize }) =>
      mobileFontSize || fontSize || '1rem'};
  }
`;
